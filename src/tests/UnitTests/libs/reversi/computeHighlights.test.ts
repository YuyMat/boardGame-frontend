import { describe, it, expect, vi } from 'vitest';
import { computeHighlights } from '@/libs/reversi/computeHighlights';
import { Role } from '@/constants/reversi';
import type { BoardState } from '@/types/reversi';

const createEmptyBoard = (): BoardState => Array(8).fill(null).map(() => Array(8).fill(null));

describe('computeHighlights', () => {
	it('合法手が存在する場合、対応するセルが true になり any が true になる', () => {
		const board = createEmptyBoard();

		// 初期盤面と同等の配置を作成
		board[3][3] = Role.WHITE;
		board[3][4] = Role.BLACK;
		board[4][3] = Role.BLACK;
		board[4][4] = Role.WHITE;

		const { highlights, any } = computeHighlights(board, Role.BLACK);

		expect(any).toBe(true);

		// 初期オセロ盤面で黒が置ける代表的な位置のいずれかが true になっていること（例: (2,3), (3,2), (4,5), (5,4)）
		const candidatePositions: [number, number][] = [
			[2, 3],
			[3, 2],
			[4, 5],
			[5, 4],
		];

		const hasTrue = candidatePositions.some(([row, col]) => highlights[row][col]);
		expect(hasTrue).toBe(true);
	});

	it('合法手が存在しない場合、すべて false で any も false になる', () => {
		const board = createEmptyBoard();

		// すべて黒石で埋めてしまい、どちらも打てない状態にする
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				board[row][col] = Role.BLACK;
			}
		}

		const { highlights, any } = computeHighlights(board, Role.BLACK);

		expect(any).toBe(false);
		const allFalse = highlights.every((row) => row.every((cell) => cell === false));
		expect(allFalse).toBe(true);
	});

	it('board を破壊的に変更しない（純粋関数）', () => {
		const board = createEmptyBoard();

		board[3][3] = Role.WHITE;
		board[3][4] = Role.BLACK;
		board[4][3] = Role.BLACK;
		board[4][4] = Role.WHITE;

		const snapshot = board.map((row) => [...row]);

		computeHighlights(board, Role.BLACK);

		expect(board).toEqual(snapshot);
	});

	it('role を変えると highlights のパターンが変わる', () => {
		const board = createEmptyBoard();

		board[3][3] = Role.WHITE;
		board[3][4] = Role.BLACK;
		board[4][3] = Role.BLACK;
		board[4][4] = Role.WHITE;

		const { highlights: blackHighlights } = computeHighlights(board, Role.BLACK);
		const { highlights: whiteHighlights } = computeHighlights(board, Role.WHITE);

		// 少なくともどこか1マスは異なるはず
		const differs = blackHighlights.some((row, r) =>
			row.some((cell, c) => cell !== whiteHighlights[r][c]),
		);
		expect(differs).toBe(true);
	});
});
