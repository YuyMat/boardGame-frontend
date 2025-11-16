import { describe, it, expect } from 'vitest';
import { reverseStones } from '@/libs/reversi/reverseStones';
import { Role } from '@/constants/reversi';
import type { BoardState } from '@/types/reversi';

const createEmptyBoard = (): BoardState => Array(8).fill(null).map(() => Array(8).fill(null));

describe('reverseStones', () => {
	it('水平方向で挟んだ相手の石をひっくり返す', () => {
		const board = createEmptyBoard();

		// 行3: B, W, W, W, B の形を作り、(3,4) に最後に置いたとみなす
		board[3][0] = Role.BLACK;
		board[3][1] = Role.WHITE;
		board[3][2] = Role.WHITE;
		board[3][3] = Role.WHITE;
		board[3][4] = Role.BLACK;

		reverseStones({
			board,
			lastPosition: { row: 3, col: 4 },
			currentRole: Role.BLACK,
		});

		expect(board[3][1]).toBe(Role.BLACK);
		expect(board[3][2]).toBe(Role.BLACK);
		expect(board[3][3]).toBe(Role.BLACK);
	});

	it('垂直方向で挟んだ相手の石をひっくり返す', () => {
		const board = createEmptyBoard();

		// 列4: B, W, W, W, B の縦パターン (0〜4 行)
		board[0][4] = Role.BLACK;
		board[1][4] = Role.WHITE;
		board[2][4] = Role.WHITE;
		board[3][4] = Role.WHITE;
		board[4][4] = Role.BLACK;

		reverseStones({
			board,
			lastPosition: { row: 4, col: 4 },
			currentRole: Role.BLACK,
		});

		expect(board[1][4]).toBe(Role.BLACK);
		expect(board[2][4]).toBe(Role.BLACK);
		expect(board[3][4]).toBe(Role.BLACK);
	});

	it('斜め（左上→右下）方向で挟んだ相手の石をひっくり返す', () => {
		const board = createEmptyBoard();

		// (1,1)=B, (2,2)=W, (3,3)=W, (4,4)=B
		board[1][1] = Role.BLACK;
		board[2][2] = Role.WHITE;
		board[3][3] = Role.WHITE;
		board[4][4] = Role.BLACK;

		reverseStones({
			board,
			lastPosition: { row: 4, col: 4 },
			currentRole: Role.BLACK,
		});

		expect(board[2][2]).toBe(Role.BLACK);
		expect(board[3][3]).toBe(Role.BLACK);
	});

	it('斜め（左下→右上）方向で挟んだ相手の石をひっくり返す', () => {
		const board = createEmptyBoard();

		// (5,1)=B, (4,2)=W, (3,3)=W, (2,4)=B
		board[5][1] = Role.BLACK;
		board[4][2] = Role.WHITE;
		board[3][3] = Role.WHITE;
		board[2][4] = Role.BLACK;

		reverseStones({
			board,
			lastPosition: { row: 2, col: 4 },
			currentRole: Role.BLACK,
		});

		expect(board[4][2]).toBe(Role.BLACK);
		expect(board[3][3]).toBe(Role.BLACK);
	});

	it('複数方向で挟んだ石を同時にひっくり返す', () => {
		const board = createEmptyBoard();

		// 中央(3,3) を最後に置いた BLACK として、左右と上下で挟む
		board[3][1] = Role.BLACK;
		board[3][2] = Role.WHITE;
		board[3][4] = Role.WHITE;
		board[3][5] = Role.BLACK;

		board[1][3] = Role.BLACK;
		board[2][3] = Role.WHITE;
		board[4][3] = Role.WHITE;
		board[5][3] = Role.BLACK;

		board[3][3] = Role.BLACK;

		reverseStones({
			board,
			lastPosition: { row: 3, col: 3 },
			currentRole: Role.BLACK,
		});

		// 左右方向
		expect(board[3][2]).toBe(Role.BLACK);
		expect(board[3][4]).toBe(Role.BLACK);

		// 上下方向
		expect(board[2][3]).toBe(Role.BLACK);
		expect(board[4][3]).toBe(Role.BLACK);
	});

	it('途中に null がある場合や端まで相手の石だけの場合はひっくり返さない', () => {
		const board = createEmptyBoard();

		// 行3: B, W, null, W, B のように途中に null
		board[3][0] = Role.BLACK;
		board[3][1] = Role.WHITE;
		board[3][3] = Role.WHITE;
		board[3][4] = Role.BLACK;

		reverseStones({
			board,
			lastPosition: { row: 3, col: 4 },
			currentRole: Role.BLACK,
		});

		expect(board[3][1]).toBe(Role.WHITE);
		expect(board[3][3]).toBe(Role.WHITE);
	});
});
