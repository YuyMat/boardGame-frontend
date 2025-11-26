import { CardStateBoard, CardBoard, OpenedCard } from "@/types/memory";
import { CardState } from "@/constants/memory"

/**
 * 現在ボード上でOPENED（表向き）状態になっているカードを検索して返します。
 *
 * @param cardStateBoard - 現在のカード状態ボード
 * @param cardBoard - カードの画像URLボード
 * @returns 表向きになっているカードの情報（位置とURL）の配列
 */
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
