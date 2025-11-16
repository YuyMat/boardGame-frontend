import { describe, it, expect, vi } from 'vitest';
import { onRestart } from '@/libs/connect4/onRestart';
import { createEmptyBoard } from '@/libs/connect4/createEmptyBoard';
import type { BoardState } from '@/types/connect4';

describe('onRestart', () => {
	it('ゲーム状態を初期値にリセットする', () => {
		const setIsWin = vi.fn();
		const setBoard = vi.fn<(board: BoardState) => void>();
		const setCanPlay = vi.fn();
		const setLastPosition = vi.fn();
		const setIsDraw = vi.fn();

		onRestart({
			setIsWin,
			setBoard,
			setCanPlay,
			setLastPosition,
			setIsDraw,
		} as any);

		expect(setIsWin).toHaveBeenCalledWith(false);
		expect(setCanPlay).toHaveBeenCalledWith(true);
		expect(setLastPosition).toHaveBeenCalledWith({ row: null, col: null });
		expect(setIsDraw).toHaveBeenCalledWith(false);

		expect(setBoard).toHaveBeenCalledTimes(1);
		const boardArg = setBoard.mock.calls[0][0];
		expect(boardArg).toEqual(createEmptyBoard());
	});
});
