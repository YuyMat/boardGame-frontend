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
	haveRuleSettings: boolean;
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
	setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export interface MemoryRuleSettingsProps {
	cards: Cards;
	setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export interface OnCardClickProps {
	rowIndex: number;
	colIndex: number;
	cardStateBoard: CardStateBoard;
	setCardStateBoard: React.Dispatch<React.SetStateAction<CardStateBoard>>;
	canPlay: boolean;
	isChecking: boolean;
}

export interface OnRestartProps {
	setCardBoard: React.Dispatch<React.SetStateAction<CardBoard>>;
	setCardStateBoard: React.Dispatch<React.SetStateAction<CardStateBoard>>;
	setCurrentRole: React.Dispatch<React.SetStateAction<RoleState>>;
	setScores: React.Dispatch<React.SetStateAction<ScoresState>>;
	setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
	setCanPlay: React.Dispatch<React.SetStateAction<boolean>>;
	settings: Settings;
}

export interface HandleMatchProps {
	first: OpenedCard;
	second: OpenedCard;
	currentRole: RoleState;
	timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
	setScores: React.Dispatch<React.SetStateAction<ScoresState>>;
	setCardStateBoard: React.Dispatch<React.SetStateAction<CardStateBoard>>;
	setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HandleMismatchProps {
	first: OpenedCard;
	second: OpenedCard;
	timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
	setCardStateBoard: React.Dispatch<React.SetStateAction<CardStateBoard>>;
	setCurrentRole: React.Dispatch<React.SetStateAction<RoleState>>;
	setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CheckPairProps {
	cardStateBoard: CardStateBoard;
	cardBoard: CardBoard;
	currentRole: RoleState;
	timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
	setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
	setScores: React.Dispatch<React.SetStateAction<ScoresState>>;
	setCardStateBoard: React.Dispatch<React.SetStateAction<CardStateBoard>>;
	setCurrentRole: React.Dispatch<React.SetStateAction<RoleState>>;
}
