"use client"

import { useState, useEffect, useRef } from "react";
import { Board, SkipTurn } from "@/components/Reversi";
import { ReShowResult, TurnInfo, Result } from "@/components/Utils";
import { createEmptyBoard, createEmptyHighlightedBoard, reverseStones, countStones } from "@/libs/reversi";
import { computeHighlights } from "@/libs/reversi/computeHighlights";
import { BoardState, RoleState, LastPositionState, HighlightedBoardState } from "@/types/reversi";
import useGotoTopPage from "@/hooks/utils/useGotoTopPage";
import closeModal from "@/utils/closeModal";
import { Role } from "@/constants/reversi";

export default function Page() {
	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [highlightedCells, setHighlightedCells] = useState<HighlightedBoardState>(createEmptyHighlightedBoard());
	const [lastPosition, setLastPosition] = useState<LastPositionState>({ row: null, col: null });
	const [currentRole, setCurrentRole] = useState<RoleState>(Role.BLACK);
	const [isWin, setIsWin] = useState(false);
	const [canPlay, setCanPlay] = useState(true);
	const [isSkipTurn, setIsSkipTurn] = useState(false);
	const blackCount = useRef(0);
	const whiteCount = useRef(0);
	const gotoTopPage = useGotoTopPage();

	const localPlayerRole = Role.BLACK;

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
		setIsWin(false);
		setCanPlay(true);
		setLastPosition({ row: null, col: null });
		setIsSkipTurn(false);
	};

	// 置けるマスのハイライトと自動パス処理
	useEffect(() => {
		const stonesCount = countStones(board);
		blackCount.current = stonesCount.blackCount;
		whiteCount.current = stonesCount.whiteCount;

		// 現在のターンでの合法手
		const { highlights: currentHighlights, any: hasCurrentMove } = computeHighlights(board, currentRole);
		if (hasCurrentMove) {
			setHighlightedCells(currentHighlights);
			return;
		}

		// 現在置けない → 相手にパスできるか検査
		const nextTurn = currentRole === Role.BLACK ? Role.WHITE : Role.BLACK;
		const { highlights: nextHighlights, any: hasNextMove } = computeHighlights(board, nextTurn);
		if (hasNextMove) {
			setIsSkipTurn(true);
			setCurrentRole(nextTurn);
			setHighlightedCells(nextHighlights);
			return;
		}

		// 両者とも置けない → 終局
		setIsSkipTurn(false);
		setHighlightedCells(createEmptyHighlightedBoard());
		setIsWin(true);
		setCanPlay(false);
	}, [board, currentRole]);

	return (
		<div className={`${currentRole === Role.BLACK ? 'bg-gray-500' : 'bg-gray-100'} min-h-[calc(100vh-72px)] transition-colors duration-300 relative z-1`}>
			<Result playerRole={localPlayerRole} isOpen={isWin} onRestart={handleRestart} handleCancel={() => closeModal(setIsWin)} onShowGames={() => gotoTopPage(setIsWin)} mainScore={blackCount.current} subScore={whiteCount.current} mainRole={'黒'} subRole={'白'} />
			<SkipTurn isSkipTurn={isSkipTurn} currentRole={currentRole} />
			<Board
				board={board}
				highlightedCells={highlightedCells}
				currentRole={currentRole}
				onCellClick={handleCellClick}
				lastPosition={lastPosition}
			/>
			<TurnInfo currentRole={currentRole} canPlay={canPlay} mainRole={'⚫️'} subRole={'⚪️'} mainRoleColorClass={'text-black'} subRoleColorClass={'text-black'} />
			<ReShowResult openModal={isWin} setOpenModal={setIsWin} canPlay={canPlay} />
		</div>
	)
}
