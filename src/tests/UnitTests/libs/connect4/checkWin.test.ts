import { describe, it, expect } from 'vitest';
import { checkWin } from '@/libs/connect4/checkWin';
import { createEmptyBoard } from '@/libs/connect4/createEmptyBoard';
import { Connect4, Role } from '@/constants/connect4';
import type { BoardState, CheckWinProps } from '@/types/connect4';

const runCheckWin = (params: CheckWinProps) => checkWin(params);

describe('checkWin', () => {
	it('lastPosition の row または col が null の場合は false を返す', () => {
		const board = createEmptyBoard();

		expect(
			runCheckWin({
				lastPosition: { row: null, col: 0 },
				currentRole: Role.RED,
				board,
			}),
		).toBe(false);

		expect(
			runCheckWin({
				lastPosition: { row: 0, col: null },
				currentRole: Role.RED,
				board,
			}),
		).toBe(false);
	});

	it('currentRole の反対色が縦方向に4つ揃っている場合に true を返す', () => {
		const board: BoardState = createEmptyBoard();
		const col = 0;

		// targetColor = YELLOW になるように currentRole を RED にする
		for (let offset = 0; offset < 4; offset++) {
			const row = Connect4.ROWS - 1 - offset;
			board[row][col] = Role.YELLOW;
		}

		const lastRow = Connect4.ROWS - 1;

		expect(
			runCheckWin({
				lastPosition: { row: lastRow, col },
				currentRole: Role.RED,
				board,
			}),
		).toBe(true);
	});

	it('currentRole の反対色が横方向に4つ揃っている場合に true を返す', () => {
		const board: BoardState = createEmptyBoard();
		const row = Connect4.ROWS - 1;

		// targetColor = RED になるように currentRole を YELLOW にする
		for (let col = 0; col < 4; col++) {
			board[row][col] = Role.RED;
		}

		expect(
			runCheckWin({
				lastPosition: { row, col: 3 },
				currentRole: Role.YELLOW,
				board,
			}),
		).toBe(true);
	});

	it('currentRole の反対色が斜め（左上→右下）に4つ揃っている場合に true を返す', () => {
		const board: BoardState = createEmptyBoard();

		// targetColor = YELLOW になるように currentRole を RED にする
		board[0][0] = Role.YELLOW;
		board[1][1] = Role.YELLOW;
		board[2][2] = Role.YELLOW;
		board[3][3] = Role.YELLOW;

		expect(
			runCheckWin({
				lastPosition: { row: 3, col: 3 },
				currentRole: Role.RED,
				board,
			}),
		).toBe(true);
	});

	it('currentRole の反対色が斜め（左下→右上）に4つ揃っている場合に true を返す', () => {
		const board: BoardState = createEmptyBoard();

		// targetColor = RED になるように currentRole を YELLOW にする
		board[3][0] = Role.RED;
		board[2][1] = Role.RED;
		board[1][2] = Role.RED;
		board[0][3] = Role.RED;

		expect(
			runCheckWin({
				lastPosition: { row: 0, col: 3 },
				currentRole: Role.YELLOW,
				board,
			}),
		).toBe(true);
	});

	it('どの方向にも4つ連続していない場合は false を返す', () => {
		const board: BoardState = createEmptyBoard();

		// ランダムに石を置くが、4つ連続は作らない
		board[5][0] = Role.RED;
		board[5][1] = Role.YELLOW;
		board[5][2] = Role.RED;
		board[4][0] = Role.YELLOW;
		board[4][1] = Role.RED;

		expect(
			runCheckWin({
				lastPosition: { row: 5, col: 2 },
				currentRole: Role.YELLOW,
				board,
			}),
		).toBe(false);
	});
});
