"use client"

import { useUpdateEffect } from "@/hooks/utils/useUpdateEffect";
import { UseReversiWinCheckProps } from "@/types/reversi";
import { checkWin, countStones, createEmptyHighlightedBoard } from "@/libs/reversi";

/**
 * Reversiの勝敗判定とハイライト表示を管理する内部フック
 */
export function useReversiWinCheck({
	board,
	currentRole,
	matchState,
	playerRole,
	isSkipTurn,
	skipTurnRef,
	blackCount,
	whiteCount,
	setCanPlay,
	setIsWin,
	setHighlightedCells,
	setIsSkipTurn,
	setCurrentRole,
}: UseReversiWinCheckProps) {
	useUpdateEffect(() => {
		const stonesCount = countStones(board);
		blackCount.current = stonesCount.blackCount;
		whiteCount.current = stonesCount.whiteCount;

		// スキップターン処理
		if (isSkipTurn) {
			if (!skipTurnRef.current) {
				skipTurnRef.current = true;
			} else {
				setIsSkipTurn(false);
				skipTurnRef.current = false;
			}
		}

		// 勝敗判定
		if (
			checkWin({
				currentRole,
				board,
				setHighlightedCells,
				setIsSkipTurn,
				setCurrentRole,
				setCanPlay,
			})
		) {
			setHighlightedCells(createEmptyHighlightedBoard());
			setCanPlay(false);
			const timer = setTimeout(() => {
				setIsWin(true);
			}, 200);
			return () => clearTimeout(timer);
		}

		// 相手ターン時はハイライトをクリア
		if (matchState === "playing" && playerRole !== currentRole) {
			setHighlightedCells(createEmptyHighlightedBoard());
		}
	}, [board, matchState, currentRole]);
}
