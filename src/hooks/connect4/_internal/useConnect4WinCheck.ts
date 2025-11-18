"use client"

import { Dispatch, SetStateAction } from "react";
import { useUpdateEffect } from "@/hooks/utils/useUpdateEffect";
import { BoardState, lastPositionState, RoleState } from "@/types/connect4";
import { checkWin, checkDraw } from "@/libs/connect4";

interface UseConnect4WinCheckProps {
	board: BoardState;
	lastPosition: lastPositionState;
	currentRole: RoleState;
	setCanPlay: Dispatch<SetStateAction<boolean>>;
	setIsWin: Dispatch<SetStateAction<boolean>>;
	setIsDraw: Dispatch<SetStateAction<boolean>>;
}

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
