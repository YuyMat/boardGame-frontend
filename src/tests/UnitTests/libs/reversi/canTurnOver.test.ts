import { describe, it, expect } from 'vitest';
import { canTurnOver } from '@/libs/reversi/canTurnOver';
import { Role } from '@/constants/reversi';
import { createEmptyBoard } from './testUtils';

describe('canTurnOver', () => {
	it('指定マスにすでに石がある場合は false を返す', () => {
		const board = createEmptyBoard();
		board[3][3] = Role.BLACK;

		const result = canTurnOver({
			board,
			row: 3,
			col: 3,
			currentRole: Role.BLACK,
		});

		expect(result).toBe(false);
	});

	it('水平方向で相手の石を挟める場合は true を返す', () => {
		const board = createEmptyBoard();

		// 行3で [B, W, W, null, ...] の形を作り、col=3 に置くとひっくり返せる
		board[3][0] = Role.BLACK;
		board[3][1] = Role.WHITE;
		board[3][2] = Role.WHITE;

		const result = canTurnOver({
			board,
			row: 3,
			col: 3,
			currentRole: Role.BLACK,
		});

		expect(result).toBe(true);
	});

	it('垂直方向で相手の石を挟める場合は true を返す', () => {
		const board = createEmptyBoard();

		// 列4で [B, W, W, null, ...] の縦パターンを作り、row=3 に置く
		board[0][4] = Role.BLACK;
		board[1][4] = Role.WHITE;
		board[2][4] = Role.WHITE;

		const result = canTurnOver({
			board,
			row: 3,
			col: 4,
			currentRole: Role.BLACK,
		});

		expect(result).toBe(true);
	});

	it('斜め（左上→右下）方向で相手の石を挟める場合は true を返す', () => {
		const board = createEmptyBoard();

		// (1,1)=B, (2,2)=W, (3,3)=W, (4,4) に置くと挟める
		board[1][1] = Role.BLACK;
		board[2][2] = Role.WHITE;
		board[3][3] = Role.WHITE;

		const result = canTurnOver({
			board,
			row: 4,
			col: 4,
			currentRole: Role.BLACK,
		});

		expect(result).toBe(true);
	});

	it('斜め（左下→右上）方向で相手の石を挟める場合は true を返す', () => {
		const board = createEmptyBoard();

		// (5,1)=B, (4,2)=W, (3,3)=W, (2,4) に置くと挟める
		board[5][1] = Role.BLACK;
		board[4][2] = Role.WHITE;
		board[3][3] = Role.WHITE;

		const result = canTurnOver({
			board,
			row: 2,
			col: 4,
			currentRole: Role.BLACK,
		});

		expect(result).toBe(true);
	});

	it('途中に null が含まれている場合はその方向では挟めない（false）', () => {
		const board = createEmptyBoard();

		// B, W, null, W, ? のような形では挟めない
		board[3][0] = Role.BLACK;
		board[3][1] = Role.WHITE;
		board[3][3] = Role.WHITE;

		const result = canTurnOver({
			board,
			row: 3,
			col: 4,
			currentRole: Role.BLACK,
		});

		expect(result).toBe(false);
	});

	it('相手の石はあるが、その先に自分の石がない場合は false を返す', () => {
		const board = createEmptyBoard();

		// 行3で [null, B, W, W, W, null, ...] のように端まで相手の石のみ
		board[3][1] = Role.BLACK;
		board[3][2] = Role.WHITE;
		board[3][3] = Role.WHITE;
		board[3][4] = Role.WHITE;

		const result = canTurnOver({
			board,
			row: 3,
			col: 0,
			currentRole: Role.BLACK,
		});

		expect(result).toBe(false);
	});

	it('盤面端のマスに対しても正しく判定できる', () => {
		const board = createEmptyBoard();

		// 左端列で B, W, W, null の形
		board[0][0] = Role.BLACK;
		board[1][0] = Role.WHITE;
		board[2][0] = Role.WHITE;

		const resultTop = canTurnOver({
			board,
			row: 3,
			col: 0,
			currentRole: Role.BLACK,
		});

		expect(resultTop).toBe(true);
	});
});
