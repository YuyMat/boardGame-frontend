import { describe, it, expect } from 'vitest';
import { checkDraw } from '@/libs/connect4/checkDraw';
import { createEmptyBoard } from '@/libs/connect4/createEmptyBoard';
import { Connect4, Role } from '@/constants/connect4';
import type { BoardState, RoleState } from '@/types/connect4';

describe('checkDraw', () => {
	const fillTopRow = (board: BoardState, filler: RoleState) => {
		for (let col = 0; col < Connect4.COLS; col++) {
			board[0][col] = filler;
		}
	};

	it('空のボードでは false を返す', () => {
		const board = createEmptyBoard();

		expect(checkDraw(board)).toBe(false);
	});

	it('最上段に少なくとも1つ null が含まれる場合は false を返す', () => {
		const board = createEmptyBoard();

		// 0列目と2列目だけ石を置き、1列目は空きのままにする
		board[0][0] = Role.RED;
		board[0][2] = Role.YELLOW;

		expect(checkDraw(board)).toBe(false);
	});

	it('最上段がすべて埋まっている場合は true を返す', () => {
		const board = createEmptyBoard();

		fillTopRow(board, Role.RED);

		expect(checkDraw(board)).toBe(true);
	});

	it('下の段に石があっても最上段に空きがあれば false を返す', () => {
		const board = createEmptyBoard();

		// 一番下の行に石を置くが、最上段は空のまま
		const bottomRow = Connect4.ROWS - 1;
		board[bottomRow][0] = Role.RED;
		board[bottomRow][1] = Role.YELLOW;

		expect(checkDraw(board)).toBe(false);
	});
});
