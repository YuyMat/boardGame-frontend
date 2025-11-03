import { CanTurnOverProps } from "@/types/reversi";
import { directions, Role } from "@/constants/reversi";

/**
 * オセロで指定された位置に石を置いたときに、相手の石をひっくり返せるかをチェックします。
 * 8方向すべてをチェックし、1つでもひっくり返せる方向があれば合法手と判定します。
 * 
 * @param params - ひっくり返し可能性をチェックするためのパラメータ
 * @param params.board - 現在のゲーム盤面の状態
 * @param params.row - チェックする行のインデックス（0〜7）
 * @param params.col - チェックする列のインデックス（0〜7）
 * @param params.currentRole - 現在のプレイヤーの色（Role.BLACKまたはRole.WHITE）
 * 
 * @returns ひっくり返せる石がある場合は`true`、ない場合は`false`
 * 
 * @remarks
 * - 指定位置がすでに石で埋まっている場合は`false`を返します
 * - 相手の石を挟んで自分の石がある方向が1つでもあれば`true`を返します
 */
export function canTurnOver({ board, row, col, currentRole }: CanTurnOverProps) {
	if (board[row][col] !== null)
		return false;
	
	const oppositeRole = currentRole === Role.BLACK ? Role.WHITE : Role.BLACK;
	
	for (const { row: dRow, col: dCol } of directions) {
		let nextRow = row + dRow;
		let nextCol = col + dCol;
		let hasOppositeStone = false; // 各方向でリセット
		
		// この方向に相手の石があるかチェック
		while (nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8) {
			const currentCell = board[nextRow][nextCol];
			if (currentCell === null) {
				// 空のセルに到達したら、この方向では石をひっくり返せない
				break;
			}
			if (currentCell === oppositeRole)
				hasOppositeStone = true;
			else if (currentCell === currentRole) {
				if (hasOppositeStone)
					return true;
				break;
			}
			nextRow += dRow;
			nextCol += dCol;
		}
	}
	return false;
}
