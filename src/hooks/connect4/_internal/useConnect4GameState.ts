"use client"

import { useState } from "react";
import { BoardState, lastPositionState } from "@/types/connect4";
import { createEmptyBoard } from "@/libs/connect4";

/**
 * Connect4のボード状態を管理する内部フック
 * 外部から直接使用せず、useConnect4Gameから使用される
 */
export function useConnect4GameState() {
	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [lastPosition, setLastPosition] = useState<lastPositionState>({
		row: null,
		col: null,
	});
	const [canPlay, setCanPlay] = useState(true);
	const [isDraw, setIsDraw] = useState(false);

	const resetGameState = () => {
		setBoard(createEmptyBoard());
		setLastPosition({ row: null, col: null });
		setCanPlay(true);
		setIsDraw(false);
	};

	return {
		board,
		setBoard,
		lastPosition,
		setLastPosition,
		canPlay,
		setCanPlay,
		isDraw,
		setIsDraw,
		resetGameState,
	};
}
