import { BoardState } from "@/types/connect4";
import { Connect4 } from "@/constants/connect4";

export const checkDraw = (board: BoardState) => {
	for (let i = 0; i < Connect4.COLS; i++) {
		if (board[0][i] === null) return false;
	}
	return true;
}
