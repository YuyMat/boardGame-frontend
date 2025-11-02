import { BoardState, RoleState } from "@/types/reversi";
import { createEmptyHighlightedBoard } from "./createEmptyBoard";
import { canTurnOver } from "./canTurnOver";

export const computeHighlights = (board: BoardState, role: RoleState) => {
	const highlights = createEmptyHighlightedBoard();
	let any = false;
	for (let row = 0; row < 8; row++) {
		for (let col = 0; col < 8; col++) {
			if (canTurnOver({ board, row, col, currentRole: role })) {
				highlights[row][col] = true;
				any = true;
			}
		}
	}
	return { highlights, any };
};
