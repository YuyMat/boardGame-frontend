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
import type { Socket } from "socket.io-client";
import Loading from "@/components/Connect4/Loading";
import styles from "@/styles/Utils.module.scss";
import { ShowTurn, ShowColor } from "@/components/Connect4/PlayerInfo";

export default function Page({ params }: { params: Promise<{ roomId: string }> }) {
	const { roomId } = use(params);

	const [board, setBoard] = useState<BoardState>(createEmptyBoard());
	const [lastPosition, setLastPosition] = useState<lastPositionState>({ row: 0, col: 0 });
	const [currentTurn, setCurrentTurn] = useState<TurnState>('r');
	const [isWin, setIsWin] = useState(false);
	const [canPlay, setCanPlay] = useState(true);
	const [matchState, setMatchState] = useState<MatchState>("waiting");
	const [playerRole, setPlayerRole] = useState<TurnState | null>(null);
	const [members, setMembers] = useState<number>(0);

	const socketRef = useRef<Socket | null>(null);
	const suppressSyncRef = useRef<boolean>(false);

	useEffect(() => {
		let pairedTimer: ReturnType<typeof setTimeout> | null = null;
		const socket = createSocket();
		socketRef.current = socket;

		socket.connect();
		socket.emit("joinRoom", roomId);

		const handleJoinedRoom = ({ members, role }: { members: number; role: 'r' | 'y' | null }) => {
			console.log(`入室しました。現在の人数:`, members);
			setMembers(members);
			// 最初に受け取ったロールのみ採用（後から上書きしない）
			setPlayerRole((prev) => (prev ?? role));
		};

		const handleRoomPaired = ({ roomId: pairedRoomId }: { roomId: string }) => {
			if (pairedRoomId === roomId) {
				setMatchState("matched");
				pairedTimer = setTimeout(() => {
					setMatchState("playing");
				}, 2000);
			}
		};

		const handleBoardUpdated = ({ board: nextBoard, currentTurn: nextTurn, lastPosition: nextLast, isWin: nextIsWin }: { board: BoardState; currentTurn: TurnState; lastPosition?: lastPositionState; isWin?: boolean; }) => {
			suppressSyncRef.current = true;
			setBoard(nextBoard);
			setCurrentTurn(nextTurn);
			if (nextLast) setLastPosition(nextLast);
			if (typeof nextIsWin === 'boolean') setIsWin(nextIsWin);
		};

		const handleRestart = () => {
			if (members === 1) {
				setMatchState("waiting");
				return ;
			}
			setIsWin(false);
			setBoard(createEmptyBoard());
			setCurrentTurn('r');
			setCanPlay(true);
		};

		socket.on("joinedRoom", handleJoinedRoom);
		socket.on("roomPaired", handleRoomPaired);
		socket.on("boardUpdated", handleBoardUpdated);
		socket.on("restart", handleRestart);

		return () => {
			if (pairedTimer !== null) {
				clearTimeout(pairedTimer);
			}
			socket.off("joinedRoom", handleJoinedRoom);
			socket.off("roomPaired", handleRoomPaired);
			socket.off("boardUpdated", handleBoardUpdated);
			socket.off("restart", handleRestart);
			socket.disconnect();
			socketRef.current = null;
		};
	}, [roomId]);

	// 盤面が変わったらサーバへ同期送信（リモート更新直後は一度だけ抑制）
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
			isWin,
		});
	}, [board, currentTurn, isWin, lastPosition, matchState, roomId]);

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
		console.log(`playerRole:`, playerRole);
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
							canPlay: canPlay && playerRole === currentTurn,
							currentTurn,
							setCurrentTurn,
							setLastPosition,
							setBoard,
						})
					}
					onRestart={() => {
						onRestart({
							setIsWin,
							setBoard,
							setCurrentTurn,
							setCanPlay
						});
						socketRef.current?.emit("restart", roomId);
					}}
				/>
				<ShowTurn currentTurn={currentTurn} playerRole={playerRole} />
				<ShowColor playerRole={playerRole} />
			</div>
		);
	}
}