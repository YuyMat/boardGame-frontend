import { ReverseStonesProps } from "@/types/reversi";
import { directions } from "@/constants/reversi";

export function reverseStones({ board, lastPosition, currentTurn }: ReverseStonesProps) {
	const { row, col } = lastPosition;
	const oppositeTurn = currentTurn === 'b' ? 'w' : 'b';

	for (const { row: dRow, col: dCol } of directions) {
		let nextRow = row + dRow;
		let nextCol = col + dCol;
		let hasOppositeStone = false;
		const stonesToReverse: { row: number; col: number }[] = [];

		// この方向でひっくり返せる石があるかチェック
		while (nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8) {
			const currentCell = board[nextRow][nextCol];
			if (currentCell === null) {
				// 空のセルに到達したら、この方向では石をひっくり返せない
				break;
			}
			if (currentCell === oppositeTurn) {
				hasOppositeStone = true;
				stonesToReverse.push({ row: nextRow, col: nextCol });
			} else if (currentCell === currentTurn) {
				if (hasOppositeStone) {
					// 相手の石がある場合、記録した石をすべてひっくり返す
					for (const stone of stonesToReverse) {
						board[stone.row][stone.col] = currentTurn;
					}
				}
				break;
			}
			nextRow += dRow;
			nextCol += dCol;
		}
	}
}
