// セルの状態を表す型（'r' = 赤、'y' = 黄、null = 空）
export type CellState = 'r' | 'y' | null;

export type TurnState = 'r' | 'y';

// 盤面の状態を表す型
export type BoardState = CellState[][];

export type lastPositionState = {
	row: number;
	col: number;
};

export type MatchState = "waiting" | "matched" | "playing";

// propsの型定義
export interface BoardProps {
	board: BoardState;
	onCellClick: (colIndex: number) => void;
	isWin: boolean;
	setIsWin: React.Dispatch<React.SetStateAction<boolean>>;
	onRestart: () => void;
	currentTurn: TurnState;
}

export interface ResultProps {
	isWin: boolean;
	onRestart: () => void;
	handleCancel: () => void;
	onShowGames: () => void;
	currentTurn: TurnState;
}

export interface CheckWinProps {
	lastPosition: lastPositionState;
	currentTurn: TurnState;
	board: BoardState;
}

export interface OnCellClickProps {
	colIndex: number;
	canPlay: boolean;
	currentTurn: TurnState;
	setCurrentTurn: React.Dispatch<React.SetStateAction<TurnState>>;
	setLastPosition: React.Dispatch<React.SetStateAction<lastPositionState>>;
	setBoard: React.Dispatch<React.SetStateAction<BoardState>>;
}

export interface OnRestartProps {
	setIsWin: React.Dispatch<React.SetStateAction<boolean>>;
	setBoard: React.Dispatch<React.SetStateAction<BoardState>>;
	setCurrentTurn: React.Dispatch<React.SetStateAction<TurnState>>;
	setCanPlay: React.Dispatch<React.SetStateAction<boolean>>;
}
