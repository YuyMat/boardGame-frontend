import type { Socket } from "socket.io-client";
import { Role } from "@/constants/connect4";

export type RoleState = typeof Role.RED | typeof Role.YELLOW;
export type CellState = RoleState | null;

// 盤面の状態を表す型
export type BoardState = CellState[][];

export type lastPositionState = {
	row: number | null;
	col: number | null;
};

export type FirstState = 'random' | RoleState;
export type ShowFirstState = 'ランダム' | '赤' | '黄';

export type MatchState = "waiting" | "matched" | "playing";

// propsの型定義
export interface BoardProps {
	board: BoardState;
	onCellClick: (colIndex: number) => void;
	isWin: boolean;
	isDraw: boolean;
	setIsWin: React.Dispatch<React.SetStateAction<boolean>>;
	onRestart: () => void;
	currentRole: RoleState;
	lastPosition: lastPositionState;
}

export interface ResultProps {
	isWin: boolean;
	isDraw: boolean;
	onRestart: () => void;
	handleCancel: () => void;
	onShowGames: () => void;
	currentRole: RoleState;
}

export interface CheckWinProps {
	lastPosition: lastPositionState;
	currentRole: RoleState;
	board: BoardState;
}

export interface OnCellClickProps {
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
	setCanPlay: React.Dispatch<React.SetStateAction<boolean>>;
	setLastPosition: React.Dispatch<React.SetStateAction<lastPositionState>>;
}

export interface ShowRoleProps {
	currentRole: RoleState;
	playerRole: RoleState | null;
	canPlay: boolean;
}

export interface UseConnect4GameProps {
	socketRef: React.MutableRefObject<Socket | null>;
	matchState: MatchState;
	playerRole: RoleState | null;
	roomId: string;
	membersRef: React.MutableRefObject<number>;
	setMatchState: React.Dispatch<React.SetStateAction<MatchState>>;
	currentRole: RoleState;
	setCurrentRole: React.Dispatch<React.SetStateAction<RoleState>>;
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

export interface ReShowResultProps {
	isWin: boolean;
	setIsWin: React.Dispatch<React.SetStateAction<boolean>>;
	canPlay: boolean;
}
