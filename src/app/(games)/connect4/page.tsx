"use client"

import { useState } from "react";
import Board from "@/components/Connect4/Board";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import { BoardState, RoleState, lastPositionState } from "@/types/connect4";
import { createEmptyBoard, checkWin, onCellClick, onRestart } from "@/libs/connect4";
import { Role } from "@/constants/connect4";

export default function Page() {
	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [lastPosition, setLastPosition] = useState<lastPositionState>({ row: 0, col: 0 });
	const [currentRole, setCurrentRole] = useState<RoleState>(Role.RED);
	const [isWin, setIsWin] = useState(false);
	const [canPlay, setCanPlay] = useState(true);

	useUpdateEffect(() => {
		if (checkWin({ lastPosition, currentRole, board })) {
			setCanPlay(false);
			const timer = setTimeout(() => {
				setIsWin(true);
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [board]);

	return (
		<div className={`${currentRole === Role.RED ? 'bg-red-200' : 'bg-yellow-200'} min-h-[calc(100vh-72px)] transition-colors duration-300 relative z-1`}>
			<Board
				board={board}
				currentRole={currentRole}
				isWin={isWin}
				setIsWin={setIsWin}
				onCellClick={(colIndex) =>
					onCellClick({
						colIndex,
						canPlay,
						currentRole,
						setCurrentRole,
						setLastPosition,
						setBoard,
					})
				}
				onRestart={() =>
					onRestart({
						setIsWin,
						setBoard,
						setCurrentRole,
						setCanPlay
					})
				}
			/>
		</div>
	)
}
