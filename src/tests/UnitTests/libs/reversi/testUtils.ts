import type { BoardState, HighlightedBoardState } from '@/types/reversi';

export const createEmptyBoard = (): BoardState =>
	Array(8).fill(null).map(() => Array(8).fill(null));

export const createEmptyHighlights = (): HighlightedBoardState =>
	Array(8).fill(false).map(() => Array(8).fill(false));
