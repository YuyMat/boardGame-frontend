import { BoardState } from "@/types/reversi";
import { Role } from "@/constants/reversi";

/**
 * オセロの盤面上にある黒石と白石の数をカウントします。
 * 
 * @param board - 現在のゲーム盤面の状態
 * 
 * @returns 石の数を含むオブジェクト
 * - `blackCount`: 盤面上の黒石の数
 * - `whiteCount`: 盤面上の白石の数
 * 
 * @remarks
 * この関数は盤面の状態を変更しません（純粋関数）。
 * ゲーム終了時の勝敗判定や、ゲーム中の状況表示に使用されます。
 */
export function countStones(board: BoardState) {
	let blackCount = 0;
	let whiteCount = 0;

	for (let row = 0; row < 8; row++) {
		for (let col = 0; col < 8; col++) {
			if (board[row][col] === Role.BLACK)
				blackCount++;
			if (board[row][col] === Role.WHITE)
				whiteCount++;
		}
	}

	return { blackCount, whiteCount };
}
