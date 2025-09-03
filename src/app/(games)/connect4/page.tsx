"use client"

import { useState } from "react";
import Board from "@/components/Connect4/Board";
import { Connect4 } from "@/constants/connect4";
import { BoardState, TurnState, lastPositionState } from "@/types/connect4";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import { checkWin } from "@/libs/connect4/checkWin";

export default function page() {
	const createEmptyBoard = (): BoardState => {
		return Array(Connect4.ROWS).fill(null).map(() => Array(Connect4.COLS).fill(null));
	};

	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [lastPosition, setLastPosition] = useState<lastPositionState>({row: 0, col: 0});
	const [currentTurn, setCurrentTurn] = useState<TurnState>('r');
	const [isWin, setIsWin] = useState(false);
	const [canPlay, setCanPlay] = useState(true);

	const onCellClick = (colIndex: number) => {
		setBoard((prev) => {
			let targetRow = prev.length - 1;
			while (targetRow >= 0 && prev[targetRow][colIndex] !== null) {
				targetRow--;
			}
			if (targetRow < 0) return prev;
			if (!canPlay) return prev;

			const next = prev.map((row) => [...row]);
			next[targetRow][colIndex] = currentTurn;
			setCurrentTurn(currentTurn === 'r' ? 'y' : 'r');
			setLastPosition({ row: targetRow, col: colIndex });
			return next;
		});
	};

	const onRestart = () => {
		setIsWin(false);
		setBoard(createEmptyBoard());
		setCurrentTurn('r');
		setCanPlay(true);
	}

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
			<Board board={board} onCellClick={onCellClick} isWin={isWin} setIsWin={setIsWin} onRestart={onRestart} currentTurn={currentTurn} />
		</div>
	)
}
