import { OnCellClickProps } from "@/types/reversi";
import { Role } from "@/constants/reversi";
import { reverseStones } from "./reverseStones";

export const onCellClick = ({ rowIndex, colIndex, canPlay, currentRole, setCurrentRole, setLastPosition, setBoard, highlightedCells, setIsSkipTurn }: OnCellClickProps) => {	
	setBoard((prev) => {
		if (!canPlay || highlightedCells[rowIndex][colIndex] !== true)
			return prev;

		const next = prev.map((row) => [...row]);
		next[rowIndex][colIndex] = currentRole;
		reverseStones({
			board: next,
			lastPosition: { row: rowIndex, col: colIndex },
			currentRole
		});
		setCurrentRole(currentRole === Role.BLACK ? Role.WHITE : Role.BLACK);
		setLastPosition({ row: rowIndex, col: colIndex });
		return next;
	});
};
