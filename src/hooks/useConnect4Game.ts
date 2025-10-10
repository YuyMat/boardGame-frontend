"use client"

import { useEffect, useRef, useState } from "react";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import { BoardState, lastPositionState, RoleState, handleBoardUpdatedProps, UseConnect4GameProps, FirstState } from "@/types/connect4";
import { onCellClick, onRestart, checkWin, createEmptyBoard } from "@/libs/connect4";

export default function useConnect4Game({
	socketRef,
	matchState,
	playerRole,
	firstRole,
	roomId,
	membersRef,
	setMatchState,
	currentRole,
	setCurrentRole,
}: UseConnect4GameProps) {
	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [lastPosition, setLastPosition] = useState<lastPositionState>({ row: 0, col: 0 });
	const [isWin, setIsWin] = useState(false);
	const [canPlay, setCanPlay] = useState(true);

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
			setCanPlay(true);
		};

		socket.on("boardUpdated", handleBoardUpdated);
		socket.on("restart", handleRestart);

		return () => {
			socket.off("boardUpdated", handleBoardUpdated);
			socket.off("restart", handleRestart);
		};
	}, [firstRole, membersRef]);

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
	}, [board, currentRole, lastPosition, matchState, roomId]);

	// 勝敗判定
	useUpdateEffect(() => {
		if (checkWin({ lastPosition, currentRole, board })) {
			setCanPlay(false);
			const timer = setTimeout(() => {
				setIsWin(true);
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [board]);

	const handleCellClick = (colIndex: number) => {
		onCellClick({
			colIndex,
			canPlay: canPlay && playerRole === currentRole,
			currentRole,
			setCurrentRole,
			setLastPosition,
			setBoard,
		});
	};

	// const handleRestart = () => {
	// 	onRestart({
	// 		setIsWin,
	// 		setBoard,
	// 		setCurrentRole,
	// 		setCanPlay,
	// 	});
	// };

	return {
		board,
		currentRole,
		isWin,
		setIsWin,
		onCellClick: handleCellClick,
		// onRestart: handleRestart,
	};
}
