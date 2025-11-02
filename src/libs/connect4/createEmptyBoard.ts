import { Connect4 } from "@/constants/connect4";
import { BoardState } from "@/types/connect4";

export const createEmptyBoard = (): BoardState => {
	return Array(Connect4.ROWS).fill(null).map(() => Array(Connect4.COLS).fill(null));
};
