import { ReverseStonesProps } from "@/types/reversi";
import { directions, Role } from "@/constants/reversi";

/**
 * オセロで石を置いた後、挟まれた相手の石をひっくり返す処理を実行します。
 * 8方向すべてをチェックし、挟んだ石を自分の色に変更します。
 * 
 * @param params - 石をひっくり返すために必要なパラメータ
 * @param params.board - 現在のゲーム盤面の状態
 * @param params.lastPosition - 最後に石が置かれた位置（row, col）
 * @param params.currentRole - 現在のプレイヤーの色（Role.BLACKまたはRole.WHITE）
 * 
 * @remarks
 * - この関数は盤面を直接変更します（mutable）
 * - 8方向（上下左右＋斜め4方向）すべてをチェックします
 * - 各方向で相手の石を挟んでいる場合のみ、その方向の石をひっくり返します
 */
export function reverseStones({ board, lastPosition, currentRole }: ReverseStonesProps) {
	const { row, col } = lastPosition;
	const oppositeRole = currentRole === Role.BLACK ? Role.WHITE : Role.BLACK;

	for (const { row: dRow, col: dCol } of directions) {
		let nextRow = row! + dRow;
		let nextCol = col! + dCol;
		let hasOppositeStone = false;
		const stonesToReverse: { row: number; col: number }[] = [];

		// この方向でひっくり返せる石があるかチェック
		while (nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8) {
			const currentCell = board[nextRow][nextCol];
			if (currentCell === null) {
				// 空のセルに到達したら、この方向では石をひっくり返せない
				break;
			}
			if (currentCell === oppositeRole) {
				hasOppositeStone = true;
				stonesToReverse.push({ row: nextRow, col: nextCol });
			} else if (currentCell === currentRole) {
				if (hasOppositeStone) {
					// 相手の石がある場合、記録した石をすべてひっくり返す
					for (const stone of stonesToReverse) {
						board[stone.row][stone.col] = currentRole;
					}
				}
				break;
			}
			nextRow += dRow;
			nextCol += dCol;
		}
	}
}
