"use client"

import { useState } from "react";
import { FirstState } from "@/types/reversi";

/**
 * オセロゲームの先手プレイヤーの選択状態を管理するカスタムフックです。
 * 
 * @returns 先手設定の状態と更新関数を含むオブジェクト
 * - `firstRole`: 現在の先手設定（'random' | Role.BLACK | Role.WHITE）
 * - `setFirstRole`: 先手設定を更新するセッター関数
 * 
 * @remarks
 * - 初期値は'random'（ランダムに先手を決定）です
 * - ゲーム開始前に先手プレイヤーを選択する機能を提供します
 */
export default function useFirstRole() {
	const [firstRole, setFirstRole] = useState<FirstState>("random");

	return {
		firstRole,
		setFirstRole,
	};
}
