"use client"

import { useState } from "react";
import Board from "@/components/Connect4/Board";
import { createEmptyBoard } from "@/libs/connect4/createEmptyBoard";
import { BoardState, TurnState, lastPositionState } from "@/types/connect4";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import { checkWin } from "@/libs/connect4/checkWin";
import { onCellClick } from "@/libs/connect4/onCellClick";
import { onRestart } from "@/libs/connect4/onRestart";

export default function page() {
	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [lastPosition, setLastPosition] = useState<lastPositionState>({ row: 0, col: 0 });
	const [currentTurn, setCurrentTurn] = useState<TurnState>('r');
	const [isWin, setIsWin] = useState(false);
	const [canPlay, setCanPlay] = useState(true);

	useUpdateEffect(() => {
		if (checkWin({ lastPosition, currentTurn, board })) {
			setCanPlay(false);
			const timer = setTimeout(() => {
				setIsWin(true);
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [board]);

	return (
		<div className={`${currentTurn === 'r' ? 'bg-red-200' : 'bg-yellow-200'} min-h-screen transition-colors duration-300 relative z-1`}>
			<Board
				board={board}
				currentTurn={currentTurn}
				isWin={isWin}
				setIsWin={setIsWin}
				onCellClick={(colIndex) =>
					onCellClick({
						colIndex,
						canPlay,
						currentTurn,
						setCurrentTurn,
						setLastPosition,
						setBoard,
					})
				}
				onRestart={() =>
					onRestart({
						setIsWin,
						setBoard,
						setCurrentTurn,
						setCanPlay
					})
				}
			/>
		</div>
	)
}
