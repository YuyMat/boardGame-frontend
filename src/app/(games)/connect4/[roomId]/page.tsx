"use client"

import Board from "@/components/Connect4/Board";
import { use, useEffect, useRef, useState } from "react";
import { createEmptyBoard } from "@/libs/connect4/createEmptyBoard";
import { BoardState, lastPositionState, MatchState, TurnState } from "@/types/connect4";
import { onCellClick } from "@/libs/connect4/onCellClick";
import { onRestart } from "@/libs/connect4/onRestart";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import { checkWin } from "@/libs/connect4/checkWin";
import { createSocket } from "@/libs/socket/client";
import Loading from "@/components/Connect4/Loading";
import styles from "@/styles/Utils.module.scss";

export default function Page({ params }: { params: Promise<{ roomId: string }> }) {
	const { roomId } = use(params);

	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [lastPosition, setLastPosition] = useState<lastPositionState>({ row: 0, col: 0 });
	const [currentTurn, setCurrentTurn] = useState<TurnState>('r');
	const [isWin, setIsWin] = useState(false);
	const [canPlay, setCanPlay] = useState(true);
	const [matchState, setMatchState] = useState<MatchState>("waiting");

	const socketRef = useRef<any>(null);

	useEffect(() => {
		const socket = createSocket();
		socketRef.current = socket;

		socket.connect();
		socket.emit("joinRoom", roomId);

		socket.on("joinedRoom", ({ members }: { members: number }) => {
			console.log(`入室しました。現在の人数:`, members);
		});

		socket.on("roomPaired", ({ roomId: pairedRoomId }: { roomId: string }) => {
			if (pairedRoomId === roomId) {
				setMatchState("matched");
				setTimeout(() => {
					setMatchState("playing");
				}, 2000);
			}
		});

		return () => {
			socket.disconnect();
			socketRef.current = null;
		};
	}, [roomId]);

	useUpdateEffect(() => {
		if (checkWin({ lastPosition, currentTurn, board })) {
			setCanPlay(false);
			const timer = setTimeout(() => {
				setIsWin(true);
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [board]);

	if (matchState === "waiting") {
		return <Loading text="対線相手を待っています…" />
	}
	if (matchState === "matched") {
		return <Loading text="対線相手とマッチしました！" />
	}
	if (matchState === "playing") {
		return (
			<div className={`${currentTurn === 'r' ? 'bg-red-200' : 'bg-yellow-200'} min-h-screen transition-colors duration-300 relative z-1 ${styles.fadeIn}`}>
				<Board
					board={board}
					currentTurn={currentTurn}
					isWin={isWin}
					setIsWin={setIsWin}
					onCellClick={(colIndex) =>
						onCellClick({
							colIndex,
							canPlay,
							currentTurn,
							setCurrentTurn,
							setLastPosition,
							setBoard,
						})
					}
					onRestart={() =>
						onRestart({
							setIsWin,
							setBoard,
							setCurrentTurn,
							setCanPlay
						})
					}
				/>
			</div>
		);
	}
}