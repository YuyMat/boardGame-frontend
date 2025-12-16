"use client"

import { useUpdateEffect } from "@/hooks/utils/useUpdateEffect";
import { checkWin, checkDraw } from "@/libs/connect4";
import { UseConnect4WinCheckProps } from "@/types/connect4";

/**
 * Connect4の勝敗判定を管理する内部フック
 * ボードが更新されるたびに勝敗をチェックする
 */
export function useConnect4WinCheck({
	board,
	lastPosition,
	currentRole,
	setCanPlay,
	setIsWin,
	setIsDraw,
}: UseConnect4WinCheckProps) {
	useUpdateEffect(() => {
		// 勝利判定
		if (checkWin({ lastPosition, currentRole, board })) {
			setCanPlay(false);
			const timer = setTimeout(() => {
				setIsWin(true);
			}, 200);
			return () => clearTimeout(timer);
		}

		// 引き分け判定
		if (checkDraw(board)) {
			setCanPlay(false);
			setIsDraw(true);
			const timer = setTimeout(() => {
				setIsWin(true);
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [board]);
}
