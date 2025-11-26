import { CardStateBoard, CardBoard, OpenedCard } from "@/types/memory";
import { CardState } from "@/constants/memory"

export const findOpenedCards = (cardStateBoard: CardStateBoard, cardBoard: CardBoard) => {
	const opened: OpenedCard[] = [];
	cardStateBoard.forEach((row, rowIndex) => {
		row.forEach((state, colIndex) => {
			if (state === CardState.OPENED) {
				const position = { row: rowIndex, col: colIndex };
				const url = cardBoard[rowIndex][colIndex];
				opened.push({ position, url });
			}
		});
	});
	return opened;
};
