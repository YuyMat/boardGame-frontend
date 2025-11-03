import { BoardState, HighlightedBoardState } from "@/types/reversi";
import { Role } from "@/constants/reversi";

/**
 * Creates an 8x8 Reversi board set to the standard starting position.
 *
 * @returns An 8x8 BoardState where the center four cells are initialized as:
 * - [3][3] = WHITE
 * - [3][4] = BLACK
 * - [4][3] = BLACK
 * - [4][4] = WHITE
 * All other cells are `null`.
 */
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

/**
 * Create an 8x8 board used to mark highlighted squares.
 *
 * @returns An 8x8 boolean matrix where each cell is `false`
 */
export function createEmptyHighlightedBoard(): HighlightedBoardState {
	return Array(8).fill(false).map(() => Array(8).fill(false));
}