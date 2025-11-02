import type { Socket } from "socket.io-client";
import { Role } from "@/constants/reversi";

export type RoleState = typeof Role.BLACK | typeof Role.WHITE;
export type CellState = RoleState | null;
export type HighlightedCellState = boolean;


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
	currentRole: RoleState;
}

export interface ResultProps {
	isOpen: boolean;
	onRestart: () => void;
	handleCancel: () => void;
	onShowGames: () => void;
	blackCount: number;
	whiteCount: number;
}

export interface CheckWinProps {
	lastPosition: lastPositionState;
	currentRole: RoleState;
	board: BoardState;
}

export interface OnCellClickProps {
	rowIndex: number;
	colIndex: number;
	canPlay: boolean;
	currentRole: RoleState;
	setCurrentRole: React.Dispatch<React.SetStateAction<RoleState>>;
	setLastPosition: React.Dispatch<React.SetStateAction<lastPositionState>>;
	setBoard: React.Dispatch<React.SetStateAction<BoardState>>;
}

export interface OnRestartProps {
	setIsWin: React.Dispatch<React.SetStateAction<boolean>>;
	setBoard: React.Dispatch<React.SetStateAction<BoardState>>;
	setCurrentRole: React.Dispatch<React.SetStateAction<RoleState>>;
	setCanPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ShowRoleProps {
	currentRole: RoleState;
	playerRole: RoleState | null;
}

export interface UseReversiGameProps {
	socketRef: React.MutableRefObject<Socket | null>;
	matchState: MatchState;
	playerRole: RoleState | null;
	firstRole: FirstState;
	roomId: string;
	membersRef: React.MutableRefObject<number>;
	setMatchState: React.Dispatch<React.SetStateAction<MatchState>>;
}

export interface handleBoardUpdatedProps {
	board: BoardState;
	currentRole: RoleState;
	lastPosition: lastPositionState;
}

export interface handleJoinedRoomProps {
	members: number;
	role: RoleState | null;
}

export interface CanTurnOverProps {
	board: BoardState;
	row: number;
	col: number;
	currentRole: RoleState;
}

export interface ReverseStonesProps {
	board: BoardState;
	lastPosition: lastPositionState;
	currentRole: RoleState;
}

export interface SkipTurnProps {
	isSkipTurn: boolean;
	currentRole: RoleState;
}
