import { BoardState } from "@/types/reversi";

export function countStones(board: BoardState) {
	let blackCount = 0;
	let whiteCount = 0;

	for (let row = 0; row < 8; row++) {
		for (let col = 0; col < 8; col++) {
			if (board[row][col] === 'b')
				blackCount++;
			if (board[row][col] === 'w')
				whiteCount++;
		}
	}

	return { blackCount, whiteCount };
}
