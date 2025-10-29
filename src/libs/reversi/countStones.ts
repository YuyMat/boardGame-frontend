import { BoardState } from "@/types/reversi";
import { Role } from "@/constants/reversi";

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
