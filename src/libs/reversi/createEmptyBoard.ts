import { BoardState, HighlightedBoardState } from "@/types/reversi";
import { Role } from "@/constants/reversi";

/**
 * オセロゲーム用の初期状態のボードを作成します。
 * 8x8の盤面の中央4マスに、標準的なオセロの初期配置で石を配置します。
 * 
 * @returns 初期配置された8x8のボード配列
 * - [3][3]: 白
 * - [3][4]: 黒
 * - [4][3]: 黒
 * - [4][4]: 白
 * 
 * @remarks
 * オセロの標準的な初期配置に従って石を配置します。
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
 * オセロゲーム用の空のハイライト用ボードを作成します。
 * 8x8のすべてのセルが`false`で初期化されたブール値配列を返します。
 * 
 * @returns 8x8のすべてのセルが`false`のブール値配列
 * 
 * @remarks
 * 合法手の位置をハイライト表示するために使用されます。
 * `computeHighlights`関数で合法手の位置を計算する際に利用されます。
 */
export function createEmptyHighlightedBoard(): HighlightedBoardState {
	return Array(8).fill(false).map(() => Array(8).fill(false));
}
