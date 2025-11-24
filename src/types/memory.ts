import { CardState } from "@/constants/memory";
import { Role } from "@/constants/memory";

export interface Position {
	row: number;
	col: number;
}

export type RoleState = typeof Role.BLUE | typeof Role.GREEN;
export type CardURL = string;
export type NumericBoardContent = number | null;

export type ScoresState = { [key in RoleState]: number };
export type Cards = 8 | 12 | 16 | 20 | 24;
export type NumericBoard = NumericBoardContent[][];
export type CardBoard = CardURL[][];
export type CardStateBoard = CardState[][];

export interface BoardProps {
	cardBoard: CardBoard;
	cardStateBoard: CardStateBoard;
	onCardClick: (rowIndex: number, colIndex: number) => void;
	cards: Cards;
}

export interface Settings {
	cards: Cards;
	firstRole: RoleState;
}

export interface OpenedCard {
	position: Position;
	url: string;
}

export interface ScoresProps {
	scores: ScoresState;
	canPlay: boolean;
}

export interface MemoryCardsSelectorProps {
	cards: Cards;
	setCards: (cards: Cards) => void;
}
