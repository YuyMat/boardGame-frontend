import { BoardState, HighlightedBoardState } from "@/types/reversi";
import { Role } from "@/constants/reversi";

export function createEmptyBoard(): BoardState {
	// 8x8の空のボードを作成
	const board: BoardState = Array(8).fill(null).map(() => Array(8).fill(null));
	
	// 初期配置：中央の4つのマスに石を配置
	board[3][3] = Role.WHITE; // 白
	board[3][4] = Role.BLACK; // 黒
	board[4][3] = Role.BLACK; // 黒
	board[4][4] = Role.WHITE; // 白
	
	return board;
}

export function createEmptyHighlightedBoard(): HighlightedBoardState {
	return Array(8).fill(false).map(() => Array(8).fill(false));
}
