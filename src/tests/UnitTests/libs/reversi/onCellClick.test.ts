import { describe, it, expect, vi, beforeEach } from 'vitest';
import { onCellClick } from '@/libs/reversi/onCellClick';
import { Role } from '@/constants/reversi';
import type { BoardState, HighlightedBoardState } from '@/types/reversi';
import { createEmptyBoard, createEmptyHighlights } from './testUtils';

describe('onCellClick', () => {
	let board: BoardState;
	let highlightedCells: HighlightedBoardState;

	beforeEach(() => {
		board = createEmptyBoard();
		highlightedCells = createEmptyHighlights();
	});

	const createSetBoard = () =>
		((updater: (prev: BoardState) => BoardState) => {
			board = updater(board);
		}) as unknown as (value: BoardState | ((prev: BoardState) => BoardState)) => void;

	it('合法手のセルに石を配置し、ターンと lastPosition を更新する', () => {
		const setBoard = createSetBoard();
		const setCurrentRole = vi.fn();
		const setLastPosition = vi.fn();
		const setIsSkipTurn = vi.fn();

		highlightedCells[3][3] = true;

		onCellClick({
			rowIndex: 3,
			colIndex: 3,
			canPlay: true,
			currentRole: Role.BLACK,
			setCurrentRole,
			setLastPosition,
			setBoard,
			highlightedCells,
			setIsSkipTurn,
		} as any);

		expect(board[3][3]).toBe(Role.BLACK);
		expect(setLastPosition).toHaveBeenCalledWith({ row: 3, col: 3 });
		expect(setCurrentRole).toHaveBeenCalledWith(Role.WHITE);
	});

	it('合法手でないセルをクリックしても何も起こらない', () => {
		const setBoard = createSetBoard();
		const setCurrentRole = vi.fn();
		const setLastPosition = vi.fn();
		const setIsSkipTurn = vi.fn();

		const originalBoard = board;

		onCellClick({
			rowIndex: 3,
			colIndex: 3,
			canPlay: true,
			currentRole: Role.BLACK,
			setCurrentRole,
			setLastPosition,
			setBoard,
			highlightedCells,
			setIsSkipTurn,
		} as any);

		expect(board).toBe(originalBoard);
		expect(setCurrentRole).not.toHaveBeenCalled();
		expect(setLastPosition).not.toHaveBeenCalled();
	});

	it('canPlay が false の場合は何も起こらない', () => {
		const setBoard = createSetBoard();
		const setCurrentRole = vi.fn();
		const setLastPosition = vi.fn();
		const setIsSkipTurn = vi.fn();

		highlightedCells[3][3] = true;
		const originalBoard = board;

		onCellClick({
			rowIndex: 3,
			colIndex: 3,
			canPlay: false,
			currentRole: Role.BLACK,
			setCurrentRole,
			setLastPosition,
			setBoard,
			highlightedCells,
			setIsSkipTurn,
		} as any);

		expect(board).toBe(originalBoard);
		expect(setCurrentRole).not.toHaveBeenCalled();
		expect(setLastPosition).not.toHaveBeenCalled();
	});

	it('端のマス（0 や 7）でも正常に動作する', () => {
		const setBoard = createSetBoard();
		const setCurrentRole = vi.fn();
		const setLastPosition = vi.fn();
		const setIsSkipTurn = vi.fn();

		highlightedCells[0][0] = true;
		highlightedCells[7][7] = true;

		onCellClick({
			rowIndex: 0,
			colIndex: 0,
			canPlay: true,
			currentRole: Role.BLACK,
			setCurrentRole,
			setLastPosition,
			setBoard,
			highlightedCells,
			setIsSkipTurn,
		} as any);

		onCellClick({
			rowIndex: 7,
			colIndex: 7,
			canPlay: true,
			currentRole: Role.WHITE,
			setCurrentRole,
			setLastPosition,
			setBoard,
			highlightedCells,
			setIsSkipTurn,
		} as any);

		expect(board[0][0]).toBe(Role.BLACK);
		expect(board[7][7]).toBe(Role.WHITE);
	});
});
