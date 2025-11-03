import { BoardState } from "@/types/reversi";
import { Role } from "@/constants/reversi";

/**
 * Counts black and white stones on an 8×8 Othello board.
 *
 * Does not modify the provided board.
 *
 * @param board - Current 8×8 game board state
 * @returns An object with `blackCount` and `whiteCount` representing the number of black and white stones on the board
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