"use client"

import { useEffect } from "react";
import { RoleState } from "@/types/connect4";
import { UseConnect4RestartProps } from "@/types/connect4";

/**
 * Connect4のリスタート処理を管理する内部フック
 */
export function useConnect4Restart({
	socketRef,
	roomId,
	membersRef,
	setMatchState,
	setIsWin,
	resetGameState,
	setCurrentRole,
}: UseConnect4RestartProps) {
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
