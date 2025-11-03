"use client"

import { useEffect, useRef, useState } from "react";
import { useUpdateEffect } from "@/hooks/utils/useUpdateEffect";
import { BoardState, lastPositionState, RoleState, handleBoardUpdatedProps, UseConnect4GameProps } from "@/types/connect4";
import { onCellClick, checkWin, createEmptyBoard } from "@/libs/connect4";

/**
 * Manage Connect4 game state, turn rules, win detection, and real-time board synchronization via Socket.IO.
 *
 * @param socketRef - Ref to the Socket.IO client used for syncing game events
 * @param matchState - Current match lifecycle state ("waiting" | "matched" | "playing")
 * @param playerRole - This player's role (e.g., `Role.RED` or `Role.YELLOW`)
 * @param roomId - ID of the game room used for server synchronization
 * @param membersRef - Ref containing the current number of room members
 * @param setMatchState - Setter to update the match state
 * @param currentRole - Role whose turn it currently is
 * @param setCurrentRole - Setter to update which role's turn it is
 * @returns An object with the current game state and control callbacks:
 * - `board`: the current board state
 * - `currentRole`: the role whose turn it is
 * - `isWin`: `true` if a win has been detected, `false` otherwise
 * - `setIsWin`: setter to update the win flag
 * - `onCellClick`: handler to call when a column is clicked
 * - `lastPosition`: the last placed stone position (`{ row, col }` or `null` entries)
 * - `canPlay`: `true` if the local player is allowed to place a stone
 */
export default function useConnect4Game({
	socketRef,
	matchState,
	playerRole,
	roomId,
	membersRef,
	setMatchState,
	currentRole,
	setCurrentRole,
}: UseConnect4GameProps) {
	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [lastPosition, setLastPosition] = useState<lastPositionState>({ row: null, col: null });
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

	return {
		board,
		currentRole,
		isWin,
		setIsWin,
		onCellClick: handleCellClick,
		lastPosition,
		canPlay,
	};
}