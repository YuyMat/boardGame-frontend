import { OnCellClickProps } from "@/types/connect4";
import { Role } from "@/constants/connect4";

export const onCellClick = ({ colIndex, canPlay, currentRole, setCurrentRole, setLastPosition, setBoard }: OnCellClickProps) => {
	setBoard((prev) => {
		let targetRow = prev.length - 1;
		while (targetRow >= 0 && prev[targetRow][colIndex] !== null) {
			targetRow--;
		}
		if (targetRow < 0) return prev;
		if (!canPlay) return prev;

		const next = prev.map((row) => [...row]);
		next[targetRow][colIndex] = currentRole;
		setCurrentRole(currentRole === Role.RED ? Role.YELLOW : Role.RED);
		setLastPosition({ row: targetRow, col: colIndex });
		return next;
	});
};
