import { describe, it, expect, vi, beforeEach } from 'vitest';
import { onCellClick } from '@/libs/connect4/onCellClick';
import { createEmptyBoard } from '@/libs/connect4/createEmptyBoard';
import { Connect4, Role } from '@/constants/connect4';
import type { BoardState } from '@/types/connect4';

describe('onCellClick', () => {
	let board: BoardState;

	beforeEach(() => {
		board = createEmptyBoard();
	});

	const createSetBoard = () =>
		((updater: (prev: BoardState) => BoardState) => {
			board = updater(board);
		}) as unknown as (value: BoardState | ((prev: BoardState) => BoardState)) => void;

	it('空のボードでは指定列の最下段に石を配置し、ターンと lastPosition を更新する', () => {
		const setBoard = createSetBoard();
		const setCurrentRole = vi.fn();
		const setLastPosition = vi.fn();

		onCellClick({
			colIndex: 0,
			canPlay: true,
			currentRole: Role.RED,
			setCurrentRole,
			setLastPosition,
			setBoard,
		} as any);

		const bottomRow = Connect4.ROWS - 1;
		expect(board[bottomRow][0]).toBe(Role.RED);
		expect(setLastPosition).toHaveBeenCalledWith({ row: bottomRow, col: 0 });
		expect(setCurrentRole).toHaveBeenCalledWith(Role.YELLOW);
	});

	it('同じ列に2回連続で呼び出すと、下から2段目に2つ目の石を配置する', () => {
		const setBoard = createSetBoard();
		const setCurrentRole = vi.fn();
		const setLastPosition = vi.fn();

		// 1回目: RED を最下段に配置
		onCellClick({
			colIndex: 0,
			canPlay: true,
			currentRole: Role.RED,
			setCurrentRole,
			setLastPosition,
			setBoard,
		} as any);

		// 2回目: YELLOW をその上に配置する想定
		onCellClick({
			colIndex: 0,
			canPlay: true,
			currentRole: Role.YELLOW,
			setCurrentRole,
			setLastPosition,
			setBoard,
		} as any);

		const bottomRow = Connect4.ROWS - 1;
		expect(board[bottomRow][0]).toBe(Role.RED);
		expect(board[bottomRow - 1][0]).toBe(Role.YELLOW);
	});

	it('列がすでに満杯の場合はボードもターンも lastPosition も変化しない', () => {
		// 列0をすべて埋める
		for (let row = 0; row < Connect4.ROWS; row++) {
			board[row][0] = Role.RED;
		}
		const originalBoard = board;

		const setBoard = createSetBoard();
		const setCurrentRole = vi.fn();
		const setLastPosition = vi.fn();

		onCellClick({
			colIndex: 0,
			canPlay: true,
			currentRole: Role.YELLOW,
			setCurrentRole,
			setLastPosition,
			setBoard,
		} as any);

		// setBoard は呼ばれるが、prev がそのまま返るため参照は変わらない
		expect(board).toBe(originalBoard);
		expect(setCurrentRole).not.toHaveBeenCalled();
		expect(setLastPosition).not.toHaveBeenCalled();
	});

	it('canPlay が false の場合はボードもターンも lastPosition も変化しない', () => {
		const originalBoard = board;

		const setBoard = createSetBoard();
		const setCurrentRole = vi.fn();
		const setLastPosition = vi.fn();

		onCellClick({
			colIndex: 0,
			canPlay: false,
			currentRole: Role.RED,
			setCurrentRole,
			setLastPosition,
			setBoard,
		} as any);

		expect(board).toBe(originalBoard);
		expect(setCurrentRole).not.toHaveBeenCalled();
		expect(setLastPosition).not.toHaveBeenCalled();
	});

	it('境界列（0列目および最終列）に対しても正常に配置できる', () => {
		const setBoard = createSetBoard();
		const setCurrentRole = vi.fn();
		const setLastPosition = vi.fn();

		// 0列目
		onCellClick({
			colIndex: 0,
			canPlay: true,
			currentRole: Role.RED,
			setCurrentRole,
			setLastPosition,
			setBoard,
		} as any);

		// 最終列
		onCellClick({
			colIndex: Connect4.COLS - 1,
			canPlay: true,
			currentRole: Role.YELLOW,
			setCurrentRole,
			setLastPosition,
			setBoard,
		} as any);

		const bottomRow = Connect4.ROWS - 1;
		expect(board[bottomRow][0]).toBe(Role.RED);
		expect(board[bottomRow][Connect4.COLS - 1]).toBe(Role.YELLOW);
	});
});
