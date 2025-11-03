import { ReverseStonesProps } from "@/types/reversi";
import { directions, Role } from "@/constants/reversi";

/**
 * Flip opponent stones on the board that are bounded by the stone placed at `lastPosition`.
 *
 * Checks all eight directions from `lastPosition` and, for each direction where one or more
 * contiguous opponent stones are directly bounded by a stone of `currentRole`, replaces those
 * opponent stones with `currentRole`.
 *
 * @param board - The 8x8 game board matrix; cells are `Role` or `null`. This matrix is mutated in place.
 * @param lastPosition - The position ({ row, col }) where the last stone was placed.
 * @param currentRole - The role/color of the player who placed the stone (e.g., `Role.BLACK` or `Role.WHITE`).
 *
 * @remarks
 * - The function mutates `board` directly.
 * - All eight directions (vertical, horizontal, diagonal) are examined.
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