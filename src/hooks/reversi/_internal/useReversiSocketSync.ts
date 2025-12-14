"use client"

import { useEffect, useRef } from "react";
import { HandleGameStateUpdatedProps, UseReversiSocketSyncProps } from "@/types/reversi";

/**
 * ReversiのSocket通信による盤面同期を管理する内部フック
 */
export function useReversiSocketSync({
	socketRef,
	roomId,
	matchState,
	board,
	lastPosition,
	currentRole,
	setBoard,
	setCurrentRole,
	setLastPosition,
}: UseReversiSocketSyncProps) {
	const suppressSyncRef = useRef(false);

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
		const socket = socketRef.current;
		if (!socket) return;
		// 受信側で立てた抑制フラグは、matchState に関係なく必ずここで一度消費する
		if (suppressSyncRef.current) {
			suppressSyncRef.current = false;
			return;
		}
		if (matchState !== "playing") return;

		socket.emit("syncBoard", {
			roomId,
			board,
			currentRole,
			lastPosition,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [board]);
}
