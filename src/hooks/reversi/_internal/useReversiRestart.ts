"use client"

import { useEffect } from "react";
import { RoleState, UseReversiRestartProps } from "@/types/reversi";

/**
 * Reversiのリスタート処理を管理する内部フック
 */
export function useReversiRestart({
	socketRef,
	roomId,
	membersRef,
	setMatchState,
	setIsWin,
	resetGameState,
	setCurrentRole,
}: UseReversiRestartProps) {
	useEffect(() => {
		const socket = socketRef.current;
		if (!socket) return;

		const handleRestart = ({ firstRole }: { firstRole: RoleState }) => {
			if (membersRef.current === 1) {
				setMatchState("waiting");
				return;
			}
			setIsWin(false);
			resetGameState();
			setCurrentRole(firstRole);
		};

		socket.on("restart", handleRestart);

		return () => {
			socket.off("restart", handleRestart);
		};
	}, [roomId]);
}
