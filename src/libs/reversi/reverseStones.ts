import { ReverseStonesProps } from "@/types/reversi";
import { directions, Role } from "@/constants/reversi";

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
