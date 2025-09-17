import type { Socket } from "socket.io-client";

// セルの状態を表す型（'b' = 黒、'w' = 白、null = 空）
export type CellState = 'b' | 'w' | null;
export type HighlightedCellState = 1 | null;

export type TurnState = 'b' | 'w';

// 盤面の状態を表す型（8x8）
export type BoardState = CellState[][];

export type HighlightedBoardState = HighlightedCellState[][];

export type lastPositionState = {
	row: number;
	col: number;
};

export type FirstState = 'random' | 'b' | 'w';
export type ShowFirstState = 'ランダム' | '黒' | '白';

export type MatchState = "waiting" | "matched" | "playing";

// propsの型定義
export interface BoardProps {
	board: BoardState;
	highlightedCells: HighlightedBoardState;
	onCellClick: (rowIndex: number, colIndex: number) => void;
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
	rowIndex: number;
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

export interface ShowTurnProps {
	currentTurn: TurnState;
	playerRole: TurnState | null;
}

export interface UseReversiGameProps {
	socketRef: React.MutableRefObject<Socket | null>;
	matchState: MatchState;
	playerRole: TurnState | null;
	firstTurn: FirstState;
	roomId: string;
	membersRef: React.MutableRefObject<number>;
	setMatchState: React.Dispatch<React.SetStateAction<MatchState>>;
}

export interface handleBoardUpdatedProps {
	board: BoardState;
	currentTurn: TurnState;
	lastPosition: lastPositionState;
}

export interface handleJoinedRoomProps {
	members: number;
	role: TurnState | null;
}

export interface CanTurnOverProps {
	board: BoardState;
	row: number;
	col: number;
	currentTurn: TurnState;
}
