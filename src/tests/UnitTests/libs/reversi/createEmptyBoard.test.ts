import { describe, it, expect } from 'vitest';
import { createEmptyBoard, createEmptyHighlightedBoard } from '@/libs/reversi/createEmptyBoard';
import { Role } from '@/constants/reversi';
import type { BoardState, HighlightedBoardState } from '@/types/reversi';

describe('createEmptyBoard', () => {
	it('ボードサイズが 8 x 8 になっている', () => {
		const board = createEmptyBoard();

		expect(board.length).toBe(8);
		board.forEach((row) => {
			expect(row.length).toBe(8);
		});
	});

	it('中央4マスのみ初期配置され、その他は null である', () => {
		const board = createEmptyBoard();

		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				if (row === 3 && col === 3)
					expect(board[row][col]).toBe(Role.WHITE);
				else if (row === 3 && col === 4)
					expect(board[row][col]).toBe(Role.BLACK);
				else if (row === 4 && col === 3)
					expect(board[row][col]).toBe(Role.BLACK);
				else if (row === 4 && col === 4)
					expect(board[row][col]).toBe(Role.WHITE);
				else
					expect(board[row][col]).toBeNull();
			}
		}
	});

	it('各行は独立した配列インスタンスになっている', () => {
		const board: BoardState = createEmptyBoard();

		if (board.length >= 2) {
			expect(board[0]).not.toBe(board[1]);
		}
	});
});

describe('createEmptyHighlightedBoard', () => {
	it('ボードサイズが 8 x 8 になっている', () => {
		const board = createEmptyHighlightedBoard();

		expect(board.length).toBe(8);
		board.forEach((row) => {
			expect(row.length).toBe(8);
		});
	});

	it('すべてのセルが false で初期化されている', () => {
		const board = createEmptyHighlightedBoard();

		const allFalse = board.every((row) => row.every((cell) => cell === false));
		expect(allFalse).toBe(true);
	});

	it('各行は独立した配列インスタンスになっている', () => {
		const board: HighlightedBoardState = createEmptyHighlightedBoard();

		if (board.length >= 2) {
			expect(board[0]).not.toBe(board[1]);
		}
	});
});
