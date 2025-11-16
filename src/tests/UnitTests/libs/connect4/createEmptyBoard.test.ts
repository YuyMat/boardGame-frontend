import { describe, it, expect } from 'vitest';
import { createEmptyBoard } from '@/libs/connect4/createEmptyBoard';
import { Connect4 } from '@/constants/connect4';
import type { BoardState } from '@/types/connect4';

describe('createEmptyBoard', () => {
	it('ボードサイズが Connect4.ROWS x Connect4.COLS になっている', () => {
		const board = createEmptyBoard();

		expect(board.length).toBe(Connect4.ROWS);
		board.forEach((row) => {
			expect(row.length).toBe(Connect4.COLS);
		});
	});

	it('すべてのセルが null で初期化されている', () => {
		const board = createEmptyBoard();

		const allNull = board.every((row) => row.every((cell) => cell === null));
		expect(allNull).toBe(true);
	});

	it('各行は独立した配列インスタンスになっている', () => {
		const board: BoardState = createEmptyBoard();

		if (board.length >= 2) {
			expect(board[0]).not.toBe(board[1]);
		}
	});
});
