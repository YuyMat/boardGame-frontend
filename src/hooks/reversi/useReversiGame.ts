"use client"

import { useEffect, useRef, useState } from "react";
import { useUpdateEffect } from "@/hooks/utils/useUpdateEffect";
import { BoardState, lastPositionState, RoleState, handleBoardUpdatedProps, UseReversiGameProps, HighlightedBoardState } from "@/types/reversi";
import { onCellClick, checkWin, createEmptyBoard, createEmptyHighlightedBoard, countStones } from "@/libs/reversi";

export default function useReversiGame({
	socketRef,
	matchState,
	playerRole,
	roomId,
	membersRef,
	setMatchState,
	currentRole,
	setCurrentRole,
}: UseReversiGameProps) {
	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [lastPosition, setLastPosition] = useState<lastPositionState>({ row: null, col: null });
	const [isWin, setIsWin] = useState(false);
	const [canPlay, setCanPlay] = useState(true);
	const [highlightedCells, setHighlightedCells] = useState<HighlightedBoardState>(createEmptyHighlightedBoard());
	const [isSkipTurn, setIsSkipTurn] = useState(false);

	const blackCount = useRef(0);
	const whiteCount = useRef(0);
	const suppressSyncRef = useRef<boolean>(false);

	// ソケットリスナー設定
	useEffect(() => {
		const socket = socketRef.current;
		if (!socket) return;

		const handleBoardUpdated = ({ board: nextBoard, currentRole: nextRole, lastPosition: nextLast }: handleBoardUpdatedProps) => {
			suppressSyncRef.current = true;
			setBoard(nextBoard);
			setCurrentRole(nextRole);
			if (nextLast) setLastPosition(nextLast);
		};

		const handleRestart = ({firstRole}: {firstRole: RoleState}) => {
			if (membersRef.current === 1) {
				setMatchState("waiting");
				return;
			}
			setIsWin(false);
			setBoard(createEmptyBoard());
			setCurrentRole(firstRole);
			setLastPosition({ row: null, col: null });
			setCanPlay(true);
		};

		socket.on("boardUpdated", handleBoardUpdated);
		socket.on("restart", handleRestart);

		return () => {
			socket.off("boardUpdated", handleBoardUpdated);
			socket.off("restart", handleRestart);
		};
	}, [roomId]);

	// 盤面同期送信
	useEffect(() => {
		if (matchState !== "playing") return;
		const socket = socketRef.current;
		if (!socket) return;
		if (suppressSyncRef.current) {
			suppressSyncRef.current = false;
			return;
		}
		socket.emit("syncBoard", {
			roomId,
			board,
			currentRole,
			lastPosition,
		});
	}, [board, lastPosition, matchState, roomId]);

	// 勝敗判定
	useUpdateEffect(() => {
		const stonesCount = countStones(board);
		blackCount.current = stonesCount.blackCount;
		whiteCount.current = stonesCount.whiteCount;
		
		if (checkWin({ currentRole, board, setHighlightedCells, setIsSkipTurn, setCurrentRole, setCanPlay })) {
			setHighlightedCells(createEmptyHighlightedBoard());
			setCanPlay(false);
			const timer = setTimeout(() => {
				setIsWin(true);
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [board]);

	const handleCellClick = (rowIndex: number, colIndex: number) => {
		onCellClick({
			rowIndex,
			colIndex,
			canPlay: canPlay && playerRole === currentRole,
			currentRole,
			setCurrentRole,
			setLastPosition,
			setBoard,
			highlightedCells,
			setIsSkipTurn,
		});
	};

	return {
		board,
		currentRole,
		isWin,
		setIsWin,
		onCellClick: handleCellClick,
		lastPosition,
		canPlay,
		blackCount,
		whiteCount,
		isSkipTurn,
		highlightedCells,
	};
}
