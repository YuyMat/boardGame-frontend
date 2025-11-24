import type { Socket } from "socket.io-client";
import { Role } from "@/constants/reversi";

export type RoleState = typeof Role.BLACK | typeof Role.WHITE;
export type CellState = RoleState | null;
export type HighlightedCellState = boolean;
export type RoleColorClass = string;


// 盤面の状態を表す型（8x8）
export type BoardState = CellState[][];
export type HighlightedBoardState = HighlightedCellState[][];

export type LastPositionState = {
	row: number | null;
	col: number | null;
};

export type FirstState = 'random' | RoleState;

export type MatchState = "waiting" | "matched" | "playing";

// propsの型定義
export interface BoardProps {
	board: BoardState;
	highlightedCells: HighlightedBoardState;
	onCellClick: (rowIndex: number, colIndex: number) => void;
	currentRole: RoleState;
	lastPosition: LastPositionState;
}

export interface CheckWinProps {
	currentRole: RoleState;
	board: BoardState;
	setHighlightedCells: React.Dispatch<React.SetStateAction<HighlightedBoardState>>;
	setIsSkipTurn: React.Dispatch<React.SetStateAction<boolean>>;
	setCurrentRole: React.Dispatch<React.SetStateAction<RoleState>>;
	setCanPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface OnCellClickProps {
	rowIndex: number;
	colIndex: number;
	canPlay: boolean;
	currentRole: RoleState;
	setCurrentRole: React.Dispatch<React.SetStateAction<RoleState>>;
	setLastPosition: React.Dispatch<React.SetStateAction<LastPositionState>>;
	setBoard: React.Dispatch<React.SetStateAction<BoardState>>;
	highlightedCells: HighlightedBoardState;
}

export interface UseReversiGameProps {
	socketRef: React.RefObject<Socket | null>;
	matchState: MatchState;
	playerRole: RoleState | null;
	roomId: string;
	membersRef: React.RefObject<number>;
	setMatchState: React.Dispatch<React.SetStateAction<MatchState>>;
	currentRole: RoleState;
	setCurrentRole: React.Dispatch<React.SetStateAction<RoleState>>;
}

export interface HandleGameStateUpdatedProps {
	board: BoardState;
	currentRole: RoleState;
	lastPosition: LastPositionState;
}

export interface HandleJoinedRoomProps {
	members: number;
	role: RoleState | null;
}

export interface CanTurnOverProps {
	board: BoardState;
	row: number;
	col: number;
	currentRole: RoleState;
}

export interface ReverseStonesProps extends HandleGameStateUpdatedProps {}

export interface SkipTurnProps {
	isSkipTurn: boolean;
	currentRole: RoleState;
}

export interface TurnInfoProps {
	currentRole: RoleState;
	canPlay: boolean;
	mainRole: string;
	subRole: string;
	mainRoleColorClass: RoleColorClass;
	subRoleColorClass: RoleColorClass;
}

export interface UseReversiSocketSyncProps {
	socketRef: React.RefObject<Socket | null>;
	roomId: string;
	matchState: MatchState;
	board: BoardState;
	lastPosition: LastPositionState;
	currentRole: RoleState;
	setBoard: React.Dispatch<React.SetStateAction<BoardState>>;
	setCurrentRole: React.Dispatch<React.SetStateAction<RoleState>>;
	setLastPosition: React.Dispatch<React.SetStateAction<LastPositionState>>;
}

export interface UseReversiWinCheckProps {
	board: BoardState;
	currentRole: RoleState;
	matchState: MatchState;
	playerRole: RoleState | null;
	isSkipTurn: boolean;
	skipTurnRef: React.RefObject<boolean>;
	blackCount: React.RefObject<number>;
	whiteCount: React.RefObject<number>;
	setCanPlay: React.Dispatch<React.SetStateAction<boolean>>;
	setIsWin: React.Dispatch<React.SetStateAction<boolean>>;
	setHighlightedCells: React.Dispatch<React.SetStateAction<HighlightedBoardState>>;
	setIsSkipTurn: React.Dispatch<React.SetStateAction<boolean>>;
	setCurrentRole: React.Dispatch<React.SetStateAction<RoleState>>;
}

export interface UseReversiRestartProps {
	socketRef: React.RefObject<Socket | null>;
	roomId: string;
	membersRef: React.RefObject<number>;
	setMatchState: React.Dispatch<React.SetStateAction<MatchState>>;
	setIsWin: React.Dispatch<React.SetStateAction<boolean>>;
	resetGameState: () => void;
	setCurrentRole: React.Dispatch<React.SetStateAction<RoleState>>;
}

export interface ReversiRuleSettingsProps {
	setFirstRole: React.Dispatch<React.SetStateAction<FirstState>>;
	keyToShowLabel: Record<FirstState, string>;
	firstTurnItems: { label: string; key: string | number }[];
}
