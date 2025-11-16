import { describe, it, expect } from 'vitest';
import { countStones } from '@/libs/reversi/countStones';
import { Role } from '@/constants/reversi';
import { createEmptyBoard } from './testUtils';

describe('countStones', () => {
	it('初期配置の盤面では黒石と白石がそれぞれ2個になる', () => {
		const board = createEmptyBoard();

		board[3][3] = Role.WHITE;
		board[3][4] = Role.BLACK;
		board[4][3] = Role.BLACK;
		board[4][4] = Role.WHITE;

		const { blackCount, whiteCount } = countStones(board);

		expect(blackCount).toBe(2);
		expect(whiteCount).toBe(2);
	});

	it('空の盤面では両方0になる', () => {
		const board = createEmptyBoard();

		const { blackCount, whiteCount } = countStones(board);

		expect(blackCount).toBe(0);
		expect(whiteCount).toBe(0);
	});

	it('片側だけ石がある盤面を正しくカウントできる', () => {
		const board = createEmptyBoard();

		board[0][0] = Role.BLACK;
		board[1][1] = Role.BLACK;
		board[2][2] = Role.BLACK;

		const { blackCount, whiteCount } = countStones(board);

		expect(blackCount).toBe(3);
		expect(whiteCount).toBe(0);
	});

	it('黒と白が混在している任意の盤面を正しくカウントできる', () => {
		const board = createEmptyBoard();

		board[0][0] = Role.BLACK;
		board[0][1] = Role.WHITE;
		board[1][0] = Role.BLACK;
		board[1][1] = Role.WHITE;
		board[2][2] = Role.BLACK;

		const { blackCount, whiteCount } = countStones(board);

		expect(blackCount).toBe(3);
		expect(whiteCount).toBe(2);
	});

	it('board を変更しない', () => {
		const board = createEmptyBoard();

		board[3][3] = Role.WHITE;
		board[3][4] = Role.BLACK;
		board[4][3] = Role.BLACK;
		board[4][4] = Role.WHITE;

		const snapshot = board.map((row) => [...row]);

		countStones(board);

		expect(board).toEqual(snapshot);
	});
});
