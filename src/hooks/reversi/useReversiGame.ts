"use client"

import { useEffect, useRef, useState } from "react";
import { useUpdateEffect } from "@/hooks/utils/useUpdateEffect";
import { BoardState, lastPositionState, RoleState, handleBoardUpdatedProps, UseReversiGameProps, HighlightedBoardState } from "@/types/reversi";
import { onCellClick, checkWin, createEmptyBoard, createEmptyHighlightedBoard, countStones } from "@/libs/reversi";

/**
 * Manages Reversi game state, move legality, win detection, and real-time board synchronization via Socket.IO.
 *
 * @param props.socketRef - Ref to the Socket.IO client used for real-time synchronization
 * @param props.matchState - Current match state ("waiting" | "matched" | "playing")
 * @param props.playerRole - This player's role/color ("black" or "white")
 * @param props.roomId - Room identifier for socket events
 * @param props.membersRef - Ref containing the current number of members in the room
 * @param props.setMatchState - Setter to update the match state
 * @param props.currentRole - Role/color of the player whose turn it currently is
 * @param props.setCurrentRole - Setter to update the current turn role
 *
 * @returns An object exposing the game state and control hooks:
 * - `board`: The current board state
 * - `currentRole`: The role/color of the player whose turn it currently is
 * - `isWin`: `true` when the game outcome has been decided, `false` otherwise
 * - `setIsWin`: Setter to update the `isWin` flag
 * - `onCellClick`: Handler to call when a cell is clicked (places a stone if the move is legal)
 * - `lastPosition`: Coordinates of the last placed stone ({ row, col } or nulls)
 * - `canPlay`: `true` if local play is allowed, `false` otherwise
 * - `blackCount`: Ref holding the current number of black stones
 * - `whiteCount`: Ref holding the current number of white stones
 * - `isSkipTurn`: `true` if the last move resulted in a skip/pass condition, `false` otherwise
 * - `highlightedCells`: Grid marking legal moves for the current player
 */
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