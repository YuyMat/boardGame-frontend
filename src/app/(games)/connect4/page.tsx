"use client"

import { useState } from "react";
import Board from "@/components/Connect4/Board";
import { Connect4 } from "@/constants/connect4";
import { BoardState, TurnState, lastPositionState } from "@/types/connect4";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";

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

	const checkWin = () => {
		const { row, col } = lastPosition;
		const targetColor = currentTurn === 'r' ? 'y' : 'r';

		let count = 0;

		// 縦
		for (let i = 0; i < Connect4.ROWS; i++) {
			if (board[i][col] === targetColor) {
				count++;
			} else {
				count = 0;
			}
			if (count >= 4) return true;
		}

		// 横
		count = 0;
		for (let i = 0; i < Connect4.COLS; i++) {
			if (board[row][i] === targetColor) {
				count++;
			} else {
				count = 0;
			}
			if (count >= 4) return true;
		}

		// 斜め（左上→右下）
		count = 0;
		// 左上に移動
		let startRow = row;
		let startCol = col;
		while (startRow > 0 && startCol > 0) {
			startRow--;
			startCol--;
		}
		// 右下に向かってカウント
		while (startRow < Connect4.ROWS && startCol < Connect4.COLS) {
			if (board[startRow][startCol] === targetColor) {
				count++;
				if (count >= 4) return true;
			} else {
				count = 0;
			}
			startRow++;
			startCol++;
		}

		// 斜め（左下→右上）
		count = 0;
		// 左下に移動
		startRow = row;
		startCol = col;
		while (startRow < Connect4.ROWS - 1 && startCol > 0) {
			startRow++;
			startCol--;
		}
		// 右上に向かってカウント
		while (startRow >= 0 && startCol < Connect4.COLS) {
			if (board[startRow][startCol] === targetColor) {
				count++;
				if (count >= 4) return true;
			} else {
				count = 0;
			}
			startRow--;
			startCol++;
		}

		return false;
	};

	useUpdateEffect(() => {
		if (checkWin()) {
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
