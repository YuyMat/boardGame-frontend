#!/usr/bin/env python3
"""
Gemini API を用いたPR自動コードレビュー（GitHub Actions向け）。

- pull_requestイベントのpayloadからPR情報を取得
- GitHub APIでPR差分（diff）や変更ファイル一覧を取得
- Geminiへレビューを依頼（プロンプトは仮）
- 既存のレビューコメントがあれば更新、なければ新規作成
"""

from __future__ import annotations

import json
import logging
import os
import re
import sys
import textwrap
import time
from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Tuple

import requests


AI_REVIEW_MARKER = "<!-- ai-review:gemini -->"
GITHUB_API_BASE = os.getenv("GITHUB_API_URL", "https://api.github.com")

DEFAULT_ROTATION_MODELS = [
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-3-flash-preview",
]
DEFAULT_FALLBACK_MODEL = "gemini-1.5-flash"


@dataclass(frozen=True)
class RepoInfo:
    owner: str
    repo: str
    pr_number: int


def _required_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def _read_github_event_payload() -> Dict[str, Any]:
    event_path = os.getenv("GITHUB_EVENT_PATH")
    if not event_path:
        raise RuntimeError("Missing GITHUB_EVENT_PATH (must run in GitHub Actions).")

    with open(event_path, "r", encoding="utf-8") as f:
        return json.load(f)


def _extract_repo_info(payload: Dict[str, Any]) -> RepoInfo:
    # pull_request event
    pr = payload.get("pull_request") or {}
    pr_number = pr.get("number") or payload.get("number")
    if not pr_number:
        raise RuntimeError("Could not determine PR number from GitHub event payload.")

    full_name = os.getenv("GITHUB_REPOSITORY")
    if not full_name or "/" not in full_name:
        raise RuntimeError("Missing or invalid GITHUB_REPOSITORY (expected 'owner/repo').")

    owner, repo = full_name.split("/", 1)
    return RepoInfo(owner=owner, repo=repo, pr_number=int(pr_number))


def _github_headers(token: str) -> Dict[str, str]:
    return {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "User-Agent": "gemini-ai-code-review",
        "X-GitHub-Api-Version": "2022-11-28",
    }


def _github_request(
    method: str,
    url: str,
    token: str,
    *,
    headers: Optional[Dict[str, str]] = None,
    params: Optional[Dict[str, Any]] = None,
    json_body: Optional[Dict[str, Any]] = None,
    timeout: int = 30,
) -> requests.Response:
    h = _github_headers(token)
    if headers:
        h.update(headers)
    res = requests.request(method, url, headers=h, params=params, json=json_body, timeout=timeout)
    return res


def _get_pr_diff(repo: RepoInfo, token: str) -> str:
    url = f"{GITHUB_API_BASE}/repos/{repo.owner}/{repo.repo}/pulls/{repo.pr_number}"
    res = _github_request(
        "GET",
        url,
        token,
        headers={"Accept": "application/vnd.github.v3.diff"},
        timeout=60,
    )
    if res.status_code >= 400:
        raise RuntimeError(f"Failed to fetch PR diff: {res.status_code} {res.text[:500]}")
    return res.text


def _get_pr_files(repo: RepoInfo, token: str, *, per_page: int = 100) -> List[Dict[str, Any]]:
    files: List[Dict[str, Any]] = []
    page = 1
    while True:
        url = f"{GITHUB_API_BASE}/repos/{repo.owner}/{repo.repo}/pulls/{repo.pr_number}/files"
        res = _github_request(
            "GET",
            url,
            token,
            params={"per_page": per_page, "page": page},
            timeout=60,
        )
        if res.status_code >= 400:
            raise RuntimeError(f"Failed to fetch PR files: {res.status_code} {res.text[:500]}")
        chunk = res.json()
        if not isinstance(chunk, list):
            raise RuntimeError("Unexpected response for PR files endpoint.")
        files.extend(chunk)
        if len(chunk) < per_page:
            break
        page += 1
    return files


def _truncate(text: str, max_chars: int) -> Tuple[str, bool]:
    if len(text) <= max_chars:
        return text, False
    return text[:max_chars] + "\n... (truncated)\n", True


def _parse_csv_env(value: Optional[str]) -> List[str]:
    if not value:
        return []
    return [v.strip() for v in value.split(",") if v.strip()]


def _get_rotation_models() -> List[str]:
    """
    優先的に使用するモデル一覧（カンマ区切り）。
    """
    models = _parse_csv_env(os.getenv("GEMINI_ROTATION_MODELS"))
    return models or DEFAULT_ROTATION_MODELS


def _get_fallback_model() -> str:
    """
    優先モデルが全てレート制限の場合に使用するフォールバックモデル。
    """
    return os.getenv("GEMINI_FALLBACK_MODEL") or DEFAULT_FALLBACK_MODEL


def _build_file_code_block(file_info: Dict[str, Any]) -> Tuple[str, List[str]]:
    filename = str(file_info.get("filename") or "(unknown)")
    status = str(file_info.get("status") or "")
    additions = int(file_info.get("additions") or 0)
    deletions = int(file_info.get("deletions") or 0)
    changes = int(file_info.get("changes") or 0)

    notes: List[str] = []
    meta = f"status: {status}, +{additions} -{deletions} (changes:{changes})"

    patch = file_info.get("patch")
    if isinstance(patch, str) and patch.strip():
        max_patch_chars = int(os.getenv("MAX_FILE_PATCH_CHARS", "15000"))
        patch_trimmed, truncated = _truncate(patch, max_patch_chars)
        if truncated:
            notes.append(f"`{filename}`: patchが大きいため先頭{max_patch_chars}文字に切り詰めました。")
        return (
            textwrap.dedent(
                f"""
                ### {filename}
                {meta}

                ```diff
                {patch_trimmed}
                ```
                """
            ).strip(),
            notes,
        )

    notes.append(f"`{filename}`: patchが取得できないため（バイナリ/大きすぎる等）、差分ベースのレビューが困難です。")
    return (
        textwrap.dedent(
            f"""
            ### {filename}
            {meta}

            _No patch available (binary or too large)._
            """
        ).strip(),
        notes,
    )


class GeminiRateLimitError(RuntimeError):
    pass


def _is_gemini_rate_limited(status_code: int, body_text: str) -> bool:
    if status_code == 429:
        return True
    # 念のため、JSONエラーのstatusも見る（RESOURCE_EXHAUSTED など）
    try:
        data = json.loads(body_text)
        err = (data or {}).get("error") or {}
        status = str(err.get("status") or "")
        if status == "RESOURCE_EXHAUSTED":
            return True
    except Exception:
        pass
    return False


def _gemini_generate(api_key: str, model: str, prompt: str) -> str:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    res = requests.post(
        url,
        params={"key": api_key},
        json={
            "contents": [{"role": "user", "parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": float(os.getenv("GEMINI_TEMPERATURE", "0.2")),
                "maxOutputTokens": int(os.getenv("GEMINI_MAX_OUTPUT_TOKENS", "1024")),
            },
        },
        timeout=60,
    )
    if res.status_code >= 400:
        body_text = res.text or ""
        if _is_gemini_rate_limited(res.status_code, body_text):
            raise GeminiRateLimitError(f"Gemini rate limited ({res.status_code}): {body_text[:500]}")
        raise RuntimeError(f"Gemini API error: {res.status_code} {body_text[:500]}")

    data = res.json()
    candidates = data.get("candidates") or []
    if not candidates:
        return "(No candidates returned)"
    content = (candidates[0] or {}).get("content") or {}
    parts = content.get("parts") or []
    texts = []
    for p in parts:
        t = p.get("text")
        if isinstance(t, str):
            texts.append(t)
    return "\n".join(texts).strip() or "(Empty response)"


def _gemini_generate_with_retry(
    api_key: str, model: str, prompt: str, *, max_attempts: int = 3, base_delay: float = 1.0
) -> Optional[str]:
    """
    Gemini API呼び出しをリトライ付きで実行する。
    
    Args:
        api_key: Gemini APIキー
        model: 使用するモデル名
        prompt: プロンプト
        max_attempts: 最大試行回数（デフォルト: 3）
        base_delay: 指数バックオフのベース遅延時間（秒、デフォルト: 1.0）
    
    Returns:
        成功した場合は生成されたテキスト、失敗した場合はNone
    """
    for attempt in range(max_attempts):
        try:
            return _gemini_generate(api_key, model, prompt)
        except GeminiRateLimitError as e:
            if attempt < max_attempts - 1:
                delay = base_delay * (2 ** attempt)
                logging.warning(
                    f"Gemini rate limit error for model {model} (attempt {attempt + 1}/{max_attempts}): {e}. "
                    f"Retrying in {delay:.1f}s..."
                )
                time.sleep(delay)
            else:
                logging.error(
                    f"Gemini rate limit error for model {model} after {max_attempts} attempts: {e}. "
                    f"Skipping this request."
                )
                return None
        except (requests.RequestException, requests.Timeout, requests.ConnectionError) as e:
            if attempt < max_attempts - 1:
                delay = base_delay * (2 ** attempt)
                logging.warning(
                    f"Transient network error for model {model} (attempt {attempt + 1}/{max_attempts}): {e}. "
                    f"Retrying in {delay:.1f}s..."
                )
                time.sleep(delay)
            else:
                logging.error(
                    f"Network error for model {model} after {max_attempts} attempts: {e}. "
                    f"Skipping this request."
                )
                return None
    return None


def _find_existing_comment(repo: RepoInfo, token: str) -> Optional[Tuple[int, str]]:
    url = f"{GITHUB_API_BASE}/repos/{repo.owner}/{repo.repo}/issues/{repo.pr_number}/comments"
    page = 1
    per_page = 100
    while True:
        res = _github_request(
            "GET",
            url,
            token,
            params={"per_page": per_page, "page": page},
            timeout=60,
        )
        if res.status_code >= 400:
            raise RuntimeError(f"Failed to list PR comments: {res.status_code} {res.text[:500]}")
        comments = res.json()
        if not isinstance(comments, list):
            raise RuntimeError("Unexpected response for comments endpoint.")
        for c in comments:
            body = c.get("body") or ""
            if AI_REVIEW_MARKER in body:
                cid = c.get("id")
                if isinstance(cid, int):
                    return cid, body
        if len(comments) < per_page:
            return None
        page += 1


def _upsert_comment(repo: RepoInfo, token: str, body: str, *, existing_comment_id: Optional[int] = None) -> None:
    comment_id = existing_comment_id
    if comment_id is None:
        found = _find_existing_comment(repo, token)
        comment_id = found[0] if found else None

    if comment_id is None:
        url = f"{GITHUB_API_BASE}/repos/{repo.owner}/{repo.repo}/issues/{repo.pr_number}/comments"
        res = _github_request("POST", url, token, json_body={"body": body}, timeout=60)
        if res.status_code >= 400:
            raise RuntimeError(f"Failed to create PR comment: {res.status_code} {res.text[:500]}")
        return

    url = f"{GITHUB_API_BASE}/repos/{repo.owner}/{repo.repo}/issues/comments/{comment_id}"
    res = _github_request("PATCH", url, token, json_body={"body": body}, timeout=60)
    if res.status_code >= 400:
        raise RuntimeError(f"Failed to update PR comment: {res.status_code} {res.text[:500]}")


def _build_prompt(diff_or_summary: str) -> str:
    return textwrap.dedent(
        f"""
        あなたはシニアソフトウェアエンジニア兼セキュリティ監査官です。
        以下のコードを「実運用で障害・事故を起こす可能性があるか」という観点で、
        一切の忖度なく徹底的にコードレビューしてください。

        ## レビューの目的
        - 潜在的バグ（特定条件でのみ発生するもの）
        - 致命的バグ（クラッシュ・データ破壊・セキュリティ事故）
        - 実装ミス・実装漏れ
        - 境界条件・異常系・並行処理・非同期処理の欠陥
        - 将来的な拡張や仕様変更時に必ず問題になる設計欠陥

        ## 必ず確認する観点（省略禁止）
        1. 実行時エラー・例外が発生するパス
        2. null / undefined / 空配列 / 空Map / 0 / false の扱い
        3. 境界値（0, 1, -1, 最大値, 最小値）
        4. 並行実行・再入・非同期処理での競合
        5. リソースリーク（メモリ・FD・イベントリスナ・socket 等）
        6. セキュリティ問題（入力検証、権限、情報漏洩、DoS）
        7. 型・データ構造の誤用
        8. 想定外の呼び出し順・状態遷移
        9. 実装と仕様がズレている箇所
        10. コメント・命名と実装の不整合

        ## レビュー形式（厳守）
        - 問題点ごとに以下を必ず書くこと
          - 問題の内容
          - 発生条件
          - なぜ危険か（最悪どうなるか）
          - 修正案（具体的なコード or 方針）
        - 「問題なし」で済ませないこと。疑わしい点は全て指摘すること。
        - 自信がない場合も「不確実だが危険な可能性」として明示すること。

        ## コード
        {diff_or_summary}
        """
    ).strip()


def _extract_last_model_from_comment(body: str) -> Optional[str]:
    m = re.search(r"<!--\s*ai-review:last-model:([^\s>]+)\s*-->", body)
    if not m:
        return None
    return m.group(1).strip()


def _next_rotation_index(rotation_models: List[str], last_model: Optional[str]) -> int:
    if not rotation_models:
        return 0
    if last_model in rotation_models:
        return (rotation_models.index(last_model) + 1) % len(rotation_models)
    return 0


def _pick_next_available_rotation_model(
    rotation_models: List[str], start_index: int, unavailable: set[str]
) -> Optional[Tuple[str, int]]:
    if not rotation_models:
        return None
    for i in range(len(rotation_models)):
        idx = (start_index + i) % len(rotation_models)
        model = rotation_models[idx]
        if model not in unavailable:
            return model, idx
    return None


def _build_comment_body(
    *,
    file_reviews: List[Tuple[str, str, str]],
    notes: List[str],
    rotation_models: List[str],
    fallback_model: str,
    last_model: str,
) -> str:
    max_comment_chars = int(os.getenv("MAX_COMMENT_CHARS", "60000"))
    max_review_chars = int(os.getenv("MAX_REVIEW_CHARS_PER_FILE", "12000"))

    notes_md = ""
    if notes:
        notes_md = "\n".join([f"- {n}" for n in notes])
        notes_md = f"\n\n### Notes\n{notes_md}\n"

    preferred_md = ", ".join([f"`{m}`" for m in rotation_models]) if rotation_models else "(none)"
    usage_md = "\n".join([f"- `{fn}`: `{m}`" for fn, m, _ in file_reviews]) if file_reviews else "- (no files)"

    reviews_md_parts: List[str] = []
    for filename, model, review_md in file_reviews:
        review_trimmed, _ = _truncate(review_md, max_review_chars)
        reviews_md_parts.append(
            textwrap.dedent(
                f"""
                <details>
                <summary>`{filename}` (model: `{model}`)</summary>

                {review_trimmed}

                </details>
                """
            ).strip()
        )

    reviews_md = "\n\n".join(reviews_md_parts) if reviews_md_parts else "(no reviews)"

    body = textwrap.dedent(
        f"""
        {AI_REVIEW_MARKER}
        <!-- ai-review:last-model:{last_model} -->
        ## Gemini AI Code Review

        ### モデル設定
        - 優先（循環）: {preferred_md}
        - フォールバック: `{fallback_model}`（優先モデルが全てレート制限の場合）

        ### ファイル別使用モデル
        {usage_md}
        {notes_md}
        ### レビュー
        {reviews_md}
        """
    ).strip()

    trimmed, _ = _truncate(body, max_comment_chars)
    return trimmed


def main() -> int:
    logging.basicConfig(
        level=logging.INFO,
        format="%(levelname)s: %(message)s",
    )
    try:
        github_token = _required_env("GITHUB_TOKEN")
        gemini_api_key = _required_env("GEMINI_API_KEY")
        payload = _read_github_event_payload()
        repo = _extract_repo_info(payload)

        rotation_models = _get_rotation_models()
        fallback_model = _get_fallback_model()

        existing = _find_existing_comment(repo, github_token)
        existing_comment_id = existing[0] if existing else None
        existing_body = existing[1] if existing else ""
        last_model = _extract_last_model_from_comment(existing_body) if existing_body else None
        current_index = _next_rotation_index(rotation_models, last_model)

        pr_files = _get_pr_files(repo, github_token)
        if not pr_files:
            raise RuntimeError("No changed files found in PR.")

        notes: List[str] = []
        file_reviews: List[Tuple[str, str, str]] = []
        unavailable_models: set[str] = set()
        fallback_only = False
        last_model_used = rotation_models[0] if rotation_models else fallback_model

        for f in pr_files:
            filename = str(f.get("filename") or "(unknown)")
            code_block, file_notes = _build_file_code_block(f)
            notes.extend(file_notes)
            prompt = _build_prompt(code_block)

            if fallback_only:
                review_md = _gemini_generate_with_retry(gemini_api_key, fallback_model, prompt)
                if review_md is not None:
                    file_reviews.append((filename, fallback_model, review_md))
                    last_model_used = fallback_model
                else:
                    notes.append(f"`{filename}`: フォールバックモデル `{fallback_model}` でのレビュー生成に失敗しました（レート制限またはネットワークエラー）。")
                continue

            while True:
                picked = _pick_next_available_rotation_model(rotation_models, current_index, unavailable_models)
                if picked is None:
                    # 優先モデルが全てレート制限（または使用不可）になったためフォールバックへ
                    fallback_only = True
                    review_md = _gemini_generate_with_retry(gemini_api_key, fallback_model, prompt)
                    if review_md is not None:
                        file_reviews.append((filename, fallback_model, review_md))
                        last_model_used = fallback_model
                    else:
                        notes.append(f"`{filename}`: フォールバックモデル `{fallback_model}` でのレビュー生成に失敗しました（レート制限またはネットワークエラー）。")
                    break

                model, idx = picked
                try:
                    review_md = _gemini_generate(gemini_api_key, model, prompt)
                    file_reviews.append((filename, model, review_md))
                    last_model_used = model
                    # 成功したら次のファイルは次のモデルから（循環）
                    current_index = (idx + 1) % len(rotation_models)
                    break
                except GeminiRateLimitError:
                    notes.append(f"`{filename}`: `{model}` がレート制限のため次のモデルへ切替します。")
                    unavailable_models.add(model)
                    current_index = (idx + 1) % len(rotation_models)
                    if len(unavailable_models) >= len(rotation_models):
                        # 次のループでフォールバックに落ちる
                        continue

        comment_body = _build_comment_body(
            file_reviews=file_reviews,
            notes=notes,
            rotation_models=rotation_models,
            fallback_model=fallback_model,
            last_model=last_model_used,
        )

        _upsert_comment(repo, github_token, comment_body, existing_comment_id=existing_comment_id)
        print("AI review comment posted/updated successfully.")
        return 0
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
