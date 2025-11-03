import { Role } from "@/constants/reversi";
import { CheckWinProps } from "@/types/reversi";
import { computeHighlights } from "./computeHighlights";

/**
 * オセロゲームの終局判定とスキップターン処理を行います。
 * 現在のプレイヤーが置ける場所があるか、相手にパスできるか、または終局かを判定します。
 * 
 * @param params - 終局判定に必要なパラメータ
 * @param params.currentRole - 現在のプレイヤーの色（Role.BLACKまたはRole.WHITE）
 * @param params.board - 現在のゲーム盤面の状態
 * @param params.setHighlightedCells - ハイライトセルを更新するセッター関数
 * @param params.setIsSkipTurn - スキップターンフラグを更新するセッター関数
 * @param params.setCurrentRole - 現在のロールを更新するセッター関数
 * @param params.setCanPlay - プレイ可能フラグを更新するセッター関数
 * 
 * @returns ゲームが終了した場合は`true`、続行可能な場合は`false`
 * 
 * @remarks
 * - 現在のプレイヤーが置ける場合：ハイライトを更新して続行
 * - 現在のプレイヤーが置けないが相手が置ける場合：スキップターンして続行
 * - 両者とも置けない場合：ゲーム終了
 */
export const checkWin = ({ currentRole, board, setHighlightedCells, setIsSkipTurn, setCurrentRole, setCanPlay }: CheckWinProps) => {
	setIsSkipTurn(false);
	// 現在のターンでの合法手
	const { highlights: currentHighlights, any: hasCurrentMove } = computeHighlights(board, currentRole);
	if (hasCurrentMove) {
		setHighlightedCells(currentHighlights);
		setIsSkipTurn(false);
		console.log("aaaaaa");
		return false;
	}

	// 現在置けない → 相手にパスできるか検査
	const nextTurn = currentRole === Role.BLACK ? Role.WHITE : Role.BLACK;
	const { highlights: nextHighlights, any: hasNextMove } = computeHighlights(board, nextTurn);
	if (hasNextMove) {
		setIsSkipTurn(true);
		setCurrentRole(nextTurn);
		setHighlightedCells(nextHighlights);
		console.log("bbbbbb");
		return false;
	}

	// 両者とも置けない → 終局
	setIsSkipTurn(false);
	setCanPlay(false);
	return true;
};
