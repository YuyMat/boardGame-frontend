"use client"

import { useState, useEffect, useRef } from "react";
import { Board, Result, SkipTurn } from "@/components/Reversi";
import { createEmptyBoard, createEmptyHighlightedBoard, canTurnOver, reverseStones, countStones } from "@/libs/reversi";
import { BoardState, TurnState, lastPositionState, HighlightedBoardState } from "@/types/reversi";
import useGotoTopPage from "@/hooks/useGotoTopPage";
import closeModal from "@/utils/closeModal";

export default function Page() {
	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [highlightedCells, setHighlightedCells] = useState<HighlightedBoardState>(createEmptyHighlightedBoard());
	const [lastPosition, setLastPosition] = useState<lastPositionState>({ row: 0, col: 0 });
	const [currentTurn, setCurrentTurn] = useState<TurnState>('b');
	const [openResultModal, setOpenResultModal] = useState(false);
	const [canPlay, setCanPlay] = useState(true);
	const [isSkipTurn, setIsSkipTurn] = useState(false);
	const blackCount = useRef(0);
	const whiteCount = useRef(0);
	const gotoTopPage = useGotoTopPage();

	const handleCellClick = (rowIndex: number, colIndex: number) => {
		if (!canPlay || board[rowIndex][colIndex] !== null || highlightedCells[rowIndex][colIndex] !== 1)
			return;

		// 盤面のディープコピーを作成（各行もコピー）
		const newBoard = board.map(row => [...row]);
		newBoard[rowIndex][colIndex] = currentTurn;
		reverseStones({
			board: newBoard,
			lastPosition: { row: rowIndex, col: colIndex },
			currentTurn
		});
		setBoard(newBoard);
		setCurrentTurn(currentTurn === 'b' ? 'w' : 'b');
		setLastPosition({ row: rowIndex, col: colIndex });
		setIsSkipTurn(false);
	};

	const handleRestart = () => {
		setBoard(createEmptyBoard());
		setHighlightedCells(createEmptyHighlightedBoard());
		setCurrentTurn('b');
		setOpenResultModal(false);
		setCanPlay(true);
	};

	const computeHighlights = (turn: TurnState) => {
		const highlights = createEmptyHighlightedBoard();
		let any = false;
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				if (canTurnOver({ board, row, col, currentTurn: turn })) {
					highlights[row][col] = 1;
					any = true;
				}
			}
		}
		return { highlights, any };
	};

	useEffect(() => {
		blackCount.current = countStones(board).blackCount;
		whiteCount.current = countStones(board).whiteCount;
		if (blackCount.current === 0 || whiteCount.current === 0) {
			setOpenResultModal(true);
		}
		if (blackCount.current + whiteCount.current === 64) {
			setOpenResultModal(true);
		}
	}, [board]);

	// 置けるマスのハイライトと自動パス処理
	useEffect(() => {
		// 現在のターンでの合法手
		const { highlights: currentHighlights, any: hasCurrentMove } = computeHighlights(currentTurn);
		if (hasCurrentMove) {
			setHighlightedCells(currentHighlights);
			return;
		}

		// 現在置けない → 相手にパスできるか検査
		const nextTurn = currentTurn === 'b' ? 'w' : 'b';
		const { highlights: nextHighlights, any: hasNextMove } = computeHighlights(nextTurn);
		if (hasNextMove) {
			setIsSkipTurn(true);
			setCurrentTurn(nextTurn);
			setHighlightedCells(nextHighlights);
			return;
		}

		// 両者とも置けない → 終局
		setIsSkipTurn(false);
		setOpenResultModal(true);
		setCanPlay(false);
	}, [board, currentTurn]);

	return (
		<div className={`${currentTurn === 'b' ? 'bg-gray-500' : 'bg-gray-100'} min-h-[calc(100vh-72px)] transition-colors duration-300 relative z-1`}>
			<Result isOpen={openResultModal} onRestart={handleRestart} handleCancel={() => closeModal(setOpenResultModal)} onShowGames={() => gotoTopPage(setOpenResultModal)} blackCount={blackCount.current} whiteCount={whiteCount.current} />
			<SkipTurn isSkipTurn={isSkipTurn} currentTurn={currentTurn} />
			<Board
				board={board}
				highlightedCells={highlightedCells}
				currentTurn={currentTurn}
				onCellClick={handleCellClick}
			/>
		</div>
	)
}
