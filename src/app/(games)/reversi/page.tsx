"use client"

import { useState, useEffect, useRef } from "react";
import { Board, Result, SkipTurn } from "@/components/Reversi";
import { createEmptyBoard, createEmptyHighlightedBoard, canTurnOver, reverseStones, countStones } from "@/libs/reversi";
import { BoardState, RoleState, LastPositionState, HighlightedBoardState } from "@/types/reversi";
import useGotoTopPage from "@/hooks/utils/useGotoTopPage";
import closeModal from "@/utils/closeModal";
import { Role } from "@/constants/reversi";

export default function Page() {
	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [highlightedCells, setHighlightedCells] = useState<HighlightedBoardState>(createEmptyHighlightedBoard());
	const [lastPosition, setLastPosition] = useState<LastPositionState>({ row: 0, col: 0 });
	const [currentRole, setCurrentRole] = useState<RoleState>(Role.BLACK);
	const [openResultModal, setOpenResultModal] = useState(false);
	const [canPlay, setCanPlay] = useState(true);
	const [isSkipTurn, setIsSkipTurn] = useState(false);
	const blackCount = useRef(0);
	const whiteCount = useRef(0);
	const gotoTopPage = useGotoTopPage();

	const handleCellClick = (rowIndex: number, colIndex: number) => {
		if (!canPlay || board[rowIndex][colIndex] !== null || highlightedCells[rowIndex][colIndex] !== true)
			return;

		// 盤面のディープコピーを作成（各行もコピー）
		const newBoard = board.map(row => [...row]);
		newBoard[rowIndex][colIndex] = currentRole;
		reverseStones({
			board: newBoard,
			lastPosition: { row: rowIndex, col: colIndex },
			currentRole
		});
		setBoard(newBoard);
		setCurrentRole(currentRole === Role.BLACK ? Role.WHITE : Role.BLACK);
		setLastPosition({ row: rowIndex, col: colIndex });
		setIsSkipTurn(false);
	};

	const handleRestart = () => {
		setBoard(createEmptyBoard());
		setHighlightedCells(createEmptyHighlightedBoard());
		setCurrentRole(Role.BLACK);
		setOpenResultModal(false);
		setCanPlay(true);
	};

	const computeHighlights = (role: RoleState) => {
		const highlights = createEmptyHighlightedBoard();
		let any = false;
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				if (canTurnOver({ board, row, col, currentRole: role })) {
					highlights[row][col] = true;
					any = true;
				}
			}
		}
		return { highlights, any };
	};

	// 置けるマスのハイライトと自動パス処理
	useEffect(() => {
		const stonesCount = countStones(board);
		blackCount.current = stonesCount.blackCount;
		whiteCount.current = stonesCount.whiteCount;

		// 現在のターンでの合法手
		const { highlights: currentHighlights, any: hasCurrentMove } = computeHighlights(currentRole);
		if (hasCurrentMove) {
			setHighlightedCells(currentHighlights);
			return;
		}

		// 現在置けない → 相手にパスできるか検査
		const nextTurn = currentRole === Role.BLACK ? Role.WHITE : Role.BLACK;
		const { highlights: nextHighlights, any: hasNextMove } = computeHighlights(nextTurn);
		if (hasNextMove) {
			setIsSkipTurn(true);
			setCurrentRole(nextTurn);
			setHighlightedCells(nextHighlights);
			return;
		}

		// 両者とも置けない → 終局
		setIsSkipTurn(false);
		setHighlightedCells(createEmptyHighlightedBoard());
		setOpenResultModal(true);
		setCanPlay(false);
	}, [board, currentRole]);

	return (
		<div className={`${currentRole === Role.BLACK ? 'bg-gray-500' : 'bg-gray-100'} min-h-[calc(100vh-72px)] transition-colors duration-300 relative z-1`}>
			<Result isOpen={openResultModal} onRestart={handleRestart} handleCancel={() => closeModal(setOpenResultModal)} onShowGames={() => gotoTopPage(setOpenResultModal)} blackCount={blackCount.current} whiteCount={whiteCount.current} />
			<SkipTurn isSkipTurn={isSkipTurn} currentRole={currentRole} />
			<Board
				board={board}
				highlightedCells={highlightedCells}
				currentRole={currentRole}
				onCellClick={handleCellClick}
			/>
		</div>
	)
}
