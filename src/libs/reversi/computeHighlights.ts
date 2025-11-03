import { BoardState, RoleState } from "@/types/reversi";
import { createEmptyHighlightedBoard } from "./createEmptyBoard";
import { canTurnOver } from "./canTurnOver";

/**
 * オセロの盤面上で現在のプレイヤーが石を置ける位置（合法手）を計算します。
 * すべてのセルをチェックし、石を置ける位置をハイライト配列として返します。
 * 
 * @param board - 現在のゲーム盤面の状態
 * @param role - チェック対象のプレイヤーの色（黒または白）
 * 
 * @returns ハイライト情報を含むオブジェクト
 * - `highlights`: 8x8のブール値配列。合法手の位置が`true`になっている
 * - `any`: 少なくとも1つでも合法手が存在する場合は`true`、ない場合は`false`
 * 
 * @remarks
 * この関数は盤面の状態を変更しません（純粋関数）。
 */
export const computeHighlights = (board: BoardState, role: RoleState) => {
	const highlights = createEmptyHighlightedBoard();
	let any = false;
	for (let row = 0; row < 8; row++) {
		for (let col = 0; col < 8; col++) {
			if (canTurnOver({ board, row, col, currentRole: role })) {
				highlights[row][col] = true;
				any = true;
			}
		}
	}
	return { highlights, any };
};
