import { CardState, CHIPS, DICE, MAX_FILL_TRIES, cols, TRUMP_CARDS } from "@/constants/memory";
import { CardBoard, CardURL, NumericBoard } from "@/types/memory";
import { getRandomInt } from "@/utils/getRandom";

const simpleFillNumericBoard = (numericBoard: NumericBoard, num: number) => {
	numericBoard.some((row) => {
		const colIndex = row.indexOf(null);
		if (colIndex !== -1) {
			row[colIndex] = num;
			return true;
		}
		return false;
	});
}

const fillNumericBoard = (numericBoard: NumericBoard, cards: number) => {
	const maxNumber = cards / 2;
	const rows = cards / cols;

	let count = 1;
	for (let i = 1; i <= maxNumber; count++) {
		let tries = 0;
		while (tries < MAX_FILL_TRIES) {
			const row = getRandomInt(0, rows);
			const col = getRandomInt(0, cols);
			if (numericBoard[row][col] === null) {
				numericBoard[row][col] = i;
				break;
			}
			tries++;
		}
		if (tries >= MAX_FILL_TRIES) {
			simpleFillNumericBoard(numericBoard, i);
		}

		if (count >= 2) {
			count = 0;
			i++;
		}
	}
}

const createNumericBoard = (cards: number) => {
	const rows = cards / cols;
	const numericBoard: NumericBoard = Array(rows).fill(null).map(() => Array(cols).fill(null));
	fillNumericBoard(numericBoard, cards);
	return numericBoard;
}

const generateCardURLs = (cards: number) => {
	const cardURLs = new Map<number, CardURL>();
	const maxNumber = cards / 2;

	let randomNumber;
	// トランプ
	const trumpNumberHistory = new Set<number>();
	for (let i = 1; i < Math.floor(maxNumber/3); i++) {
		while (true) {
			randomNumber = getRandomInt(1, TRUMP_CARDS+1);
			if (!trumpNumberHistory.has(randomNumber)) {
				trumpNumberHistory.add(randomNumber);
				break;
			}
		}
		cardURLs.set(i, `/Card_Game_GFX/Cards/${randomNumber}_card.png`);
	}

	// チップ
	const chipNumberHistory = new Set<number>();
	for (let i = Math.floor(maxNumber/3); i < Math.floor(maxNumber*2/3); i++) {
		while (true) {
			randomNumber = getRandomInt(1, CHIPS+1);
			if (!chipNumberHistory.has(randomNumber)) {
				chipNumberHistory.add(randomNumber);
				break;
			}
		}
		cardURLs.set(i, `/Card_Game_GFX/Chips/${randomNumber}_chips.png`);
	}

	// サイコロ
	const diceNumberHistory = new Set<number>();
	for (let i = Math.floor(maxNumber*2/3); i <= maxNumber; i++) {
		while (true) {
			randomNumber = getRandomInt(1, DICE+1);
			if (!diceNumberHistory.has(randomNumber)) {
				diceNumberHistory.add(randomNumber);
				break;
			}
		}
		cardURLs.set(i, `/Card_Game_GFX/Dice/${randomNumber}_dice.png`);
	}

	return cardURLs;
}

export const createInitialCardBoard = (cards: number) => {
	const numericBoard = createNumericBoard(cards);
	const cardURLs = generateCardURLs(cards);

	const rows = cards / cols;
	const cardBoard: CardBoard = Array(rows).fill(null).map(() => Array(cols).fill(null));

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			cardBoard[i][j] = cardURLs.get(numericBoard[i][j]!)!;
		}
	}

	return cardBoard;
}

export const createInitialCardStateBoard = (cards: number) => {
	const rows = cards / cols;
	return Array(rows).fill(null).map(() => Array(cols).fill(CardState.CLOSED));
}
