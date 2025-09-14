"use client"

import { useEffect, useRef, useState } from "react";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import { BoardState, lastPositionState, TurnState, handleBoardUpdatedProps } from "@/types/connect4";
import { onCellClick, onRestart, checkWin, createEmptyBoard } from "@/libs/connect4";
import { getRandomInt } from "@/utils/getRandom";
import { UseConnect4GameProps } from "@/types/connect4";

export default function useConnect4Game({
	socketRef,
	matchState,
	playerRole,
	firstTurn,
	roomId,
	membersRef,
	setMatchState,
}: UseConnect4GameProps) {
	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [lastPosition, setLastPosition] = useState<lastPositionState>({ row: 0, col: 0 });
	const [currentTurn, setCurrentTurn] = useState<TurnState>('r');
	const [isWin, setIsWin] = useState(false);
	const [canPlay, setCanPlay] = useState(true);

	const suppressSyncRef = useRef<boolean>(false);

	const getRandomTurn = (): TurnState => {
		if (getRandomInt(2) === 0)
			return "r";
		return "y";
	};

	// ソケットリスナー設定
	useEffect(() => {
		const socket = socketRef.current;
		if (!socket) return;

		const handleBoardUpdated = ({ board: nextBoard, currentTurn: nextTurn, lastPosition: nextLast }: handleBoardUpdatedProps) => {
			suppressSyncRef.current = true;
			setBoard(nextBoard);
			setCurrentTurn(nextTurn);
			if (nextLast) setLastPosition(nextLast);
		};

		const handleRestart = () => {
			if (membersRef.current === 1) {
				setMatchState("waiting");
				return;
			}
			setIsWin(false);
			setBoard(createEmptyBoard());
			setCurrentTurn(firstTurn === "random" ? getRandomTurn() : firstTurn);
			setCanPlay(true);
		};

		socket.on("boardUpdated", handleBoardUpdated);
		socket.on("restart", handleRestart);

		return () => {
			socket.off("boardUpdated", handleBoardUpdated);
			socket.off("restart", handleRestart);
		};
	}, [firstTurn, membersRef]);

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
			currentTurn,
			lastPosition,
		});
	}, [board, currentTurn, lastPosition, matchState, roomId]);

	// 勝敗判定
	useUpdateEffect(() => {
		if (checkWin({ lastPosition, currentTurn, board })) {
			setCanPlay(false);
			const timer = setTimeout(() => {
				setIsWin(true);
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [board]);

	// 先手設定反映（初回含む）
	useEffect(() => {
		const newTurn = firstTurn === "random" ? getRandomTurn() : firstTurn as TurnState;
		setCurrentTurn(newTurn);
	}, [firstTurn]);

	const handleCellClick = (colIndex: number) => {
		onCellClick({
			colIndex,
			canPlay: canPlay && playerRole === currentTurn,
			currentTurn,
			setCurrentTurn,
			setLastPosition,
			setBoard,
		});
	};

	const handleRestart = () => {
		onRestart({
			setIsWin,
			setBoard,
			setCurrentTurn,
			setCanPlay,
		});
	};

	return {
		board,
		currentTurn,
		isWin,
		setIsWin,
		onCellClick: handleCellClick,
		onRestart: handleRestart,
	};
}
