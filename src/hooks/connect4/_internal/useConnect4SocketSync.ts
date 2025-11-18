"use client"

import { useEffect, useRef } from "react";
import { HandleGameStateUpdatedProps, UseConnect4SocketSyncProps } from "@/types/connect4";

/**
 * Connect4のSocket通信による盤面同期を管理する内部フック
 */
export function useConnect4SocketSync({
	socketRef,
	roomId,
	matchState,
	board,
	currentRole,
	lastPosition,
	setBoard,
	setCurrentRole,
	setLastPosition,
}: UseConnect4SocketSyncProps) {
	const suppressSyncRef = useRef<boolean>(false);

	// 受信: 他プレイヤーの盤面を受け取る
	useEffect(() => {
		const socket = socketRef.current;
		if (!socket) return;

		const handleGameStateUpdated = ({ board: nextBoard, currentRole: nextRole, lastPosition: nextLast }: HandleGameStateUpdatedProps) => {
			suppressSyncRef.current = true;
			setBoard(nextBoard);
			setCurrentRole(nextRole);
			if (nextLast) setLastPosition(nextLast);
		};

		socket.on("boardUpdated", handleGameStateUpdated);

		return () => {
			socket.off("boardUpdated", handleGameStateUpdated);
		};
	}, [roomId]);

	// 送信: 自分の盤面を送信する
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
	}, [board]);
}
