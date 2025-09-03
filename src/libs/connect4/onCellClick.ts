import { OnCellClickProps } from "@/types/connect4";

export const onCellClick = ({ colIndex, canPlay, currentTurn, setCurrentTurn, setLastPosition, setBoard }: OnCellClickProps) => {
	setBoard((prev) => {
		let targetRow = prev.length - 1;
		while (targetRow >= 0 && prev[targetRow][colIndex] !== null) {
			targetRow--;
		}
		if (targetRow < 0) return prev;
		if (!canPlay) return prev;

		const next = prev.map((row) => [...row]);
		next[targetRow][colIndex] = currentTurn;
		setCurrentTurn(currentTurn === 'r' ? 'y' : 'r');
		setLastPosition({ row: targetRow, col: colIndex });
		return next;
	});
};