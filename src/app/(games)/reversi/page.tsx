"use client"

import { useState, useEffect } from "react";
import { Board } from "@/components/Reversi";
import { createEmptyBoard, createEmptyHighlightedBoard, canTurnOver } from "@/libs/reversi";
import { BoardState, TurnState, lastPositionState, HighlightedBoardState } from "@/types/reversi";

export default function Page() {
	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [highlightedCells, setHighlightedCells] = useState<HighlightedBoardState>(createEmptyHighlightedBoard());
	const [lastPosition, setLastPosition] = useState<lastPositionState>({ row: 0, col: 0 });
	const [currentTurn, setCurrentTurn] = useState<TurnState>('b');
	const [isWin, setIsWin] = useState(false);
	const [canPlay, setCanPlay] = useState(true);

	const handleCellClick = (rowIndex: number, colIndex: number) => {
		if (!canPlay || board[rowIndex][colIndex] !== null)
			return;

		// 簡単な石配置（実際のオセロルールは後で実装）
		const newBoard = [...board];
		newBoard[rowIndex][colIndex] = currentTurn;
		setBoard(newBoard);
		setCurrentTurn(currentTurn === 'b' ? 'w' : 'b');
		setLastPosition({ row: rowIndex, col: colIndex });
	};

	const handleRestart = () => {
		setBoard(createEmptyBoard());
		setCurrentTurn('b');
		setIsWin(false);
		setCanPlay(true);
	};

	// 置けるマスのハイライト用の配列処理
	useEffect(() => {
		const newHighlightedCells = createEmptyHighlightedBoard();
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				if (canTurnOver({ board, row, col, currentTurn })) {
					setHighlightedCells(() => {
						newHighlightedCells[row][col] = 1;
						return newHighlightedCells;
					});
				}
			}
		}
	}, [board]);

	return (
		<div className={`${currentTurn === 'b' ? 'bg-gray-500' : 'bg-gray-100'} min-h-[calc(100vh-72px)] transition-colors duration-300 relative z-1`}>
			<Board
				board={board}
				highlightedCells={highlightedCells}
				currentTurn={currentTurn}
				isWin={isWin}
				setIsWin={setIsWin}
				onCellClick={handleCellClick}
				onRestart={handleRestart}
			/>
		</div>
	)
}
