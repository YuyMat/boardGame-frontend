import { BoardState } from "@/types/connect4";
import { Connect4 } from "@/constants/connect4";

/**
 * Connect4ゲームで引き分け状態（盤面が完全に埋まった状態）かどうかをチェックします。
 * 最上段のすべてのセルが埋まっているかを判定します。
 * 
 * @param board - 現在のゲーム盤面の状態
 * 
 * @returns すべての列が埋まっている場合は`true`、空きがある場合は`false`
 * 
 * @remarks
 * - Connect4では最上段（0行目）が埋まれば、その列は完全に埋まっています
 * - 1列でも空きがあれば、まだゲームを続けられます
 * - この判定は勝敗判定の後に実行されます
 */
export const checkDraw = (board: BoardState) => {
	for (let i = 0; i < Connect4.COLS; i++) {
		if (board[0][i] === null) return false;
	}
	return true;
}
