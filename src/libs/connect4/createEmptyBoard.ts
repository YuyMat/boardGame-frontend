import { Connect4 } from "@/constants/connect4";
import { BoardState } from "@/types/connect4";

/**
 * Connect4ゲーム用の空のゲームボードを作成します。
 * 
 * @returns 6行7列のすべてのセルが`null`で初期化されたボード配列
 * 
 * @remarks
 * ボードのサイズは`Connect4.ROWS`（6行）× `Connect4.COLS`（7列）で定義されています。
 */
export const createEmptyBoard = (): BoardState => {
	return Array(Connect4.ROWS).fill(null).map(() => Array(Connect4.COLS).fill(null));
};
