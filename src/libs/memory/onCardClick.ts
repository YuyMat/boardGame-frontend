import { OnCardClickProps } from "@/types/memory";
import { CardState } from "@/constants/memory";

export const onCardClick = ({
	rowIndex,
	colIndex,
	cardStateBoard,
	setCardStateBoard,
	canPlay,
	isChecking
}: OnCardClickProps) => {
	if (cardStateBoard[rowIndex][colIndex] === CardState.OPENED) return;
	if (cardStateBoard[rowIndex][colIndex] === CardState.REMOVED) return;
	if (!canPlay) return;
	if (isChecking) return;

	setCardStateBoard((prev) => {
		const next = prev.map((row) => [...row]);
		next[rowIndex][colIndex] = CardState.OPENED;
		return next;
	});
}
