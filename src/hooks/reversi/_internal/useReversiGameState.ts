"use client"

import { useState, useRef } from "react";
import { BoardState, LastPositionState, HighlightedBoardState } from "@/types/reversi";
import { createEmptyBoard, createEmptyHighlightedBoard } from "@/libs/reversi";

/**
 * Reversiのボード状態を管理する内部フック
 */
export function useReversiGameState() {
	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [lastPosition, setLastPosition] = useState<LastPositionState>({
		row: null,
		col: null,
	});
	const [canPlay, setCanPlay] = useState(true);
	const [highlightedCells, setHighlightedCells] = useState<HighlightedBoardState>(createEmptyHighlightedBoard());
	const [isSkipTurn, setIsSkipTurn] = useState(false);

	const blackCount = useRef(0);
	const whiteCount = useRef(0);
	const skipTurnRef = useRef(false);

	const resetGameState = () => {
		setBoard(createEmptyBoard());
		setLastPosition({ row: null, col: null });
		setCanPlay(true);
		setHighlightedCells(createEmptyHighlightedBoard());
		setIsSkipTurn(false);
		blackCount.current = 0;
		whiteCount.current = 0;
		skipTurnRef.current = false;
	};

	return {
		board,
		setBoard,
		lastPosition,
		setLastPosition,
		canPlay,
		setCanPlay,
		highlightedCells,
		setHighlightedCells,
		isSkipTurn,
		setIsSkipTurn,
		blackCount,
		whiteCount,
		skipTurnRef,
		resetGameState,
	};
}
