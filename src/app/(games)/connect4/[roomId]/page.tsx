"use client"

import { use, useEffect, useRef, useState } from "react";
import { Board, Loading, ShowTurn, RuleSettings, TemporaryWaiting } from "@/components/Connect4";
import { BoardState, FirstState, lastPositionState, MatchState, TurnState } from "@/types/connect4";
import { onCellClick, onRestart, checkWin, createEmptyBoard } from "@/libs/connect4";
import { createSocket } from "@/libs/socket/client";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import type { Socket } from "socket.io-client";
import styles from "@/styles/Utils.module.scss";
import { getRandomInt } from "@/utils/getRandom";

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
	const [firstTurn, setFirstTurn] = useState<FirstState>("random");

	const socketRef = useRef<Socket | null>(null);
	const suppressSyncRef = useRef<boolean>(false);
	const membersRef = useRef<number>(0);
	const matchStateRef = useRef<MatchState>("waiting");

	const getRandomTurn = () => {
		if (getRandomInt(2) === 0)
			return "r";
		return "y";
	}

	useEffect(() => {
		let pairedTimer: ReturnType<typeof setTimeout> | null = null;
		const socket = createSocket();
		socketRef.current = socket;

		socket.connect();
		socket.emit("joinRoom", roomId);

		const handleJoinedRoom = ({ members, role }: { members: number; role: 'r' | 'y' | null }) => {
			setMembers(members);
			membersRef.current = members;
			// 最初に受け取ったロールのみ採用（後から上書きしない）
			setPlayerRole((prev) => (prev ?? role));
		};

		const handleRoomPaired = ({ roomId: pairedRoomId }: { roomId: string }) => {
			if (pairedRoomId === roomId && matchStateRef.current === "waiting") {
				setMatchState("matched");
				pairedTimer = setTimeout(() => {
					setMatchState("playing");
				}, 2000);
			}
		};

		const handleBoardUpdated = ({ board: nextBoard, currentTurn: nextTurn, lastPosition: nextLast }: { board: BoardState; currentTurn: TurnState; lastPosition?: lastPositionState; }) => {
			suppressSyncRef.current = true;
			setBoard(nextBoard);
			setCurrentTurn(nextTurn);
			if (nextLast) setLastPosition(nextLast);
		};

		const handleRestart = () => {
			if (membersRef.current === 1) {
				setMatchState("waiting");
				return;
			}
			setIsWin(false);
			setBoard(createEmptyBoard());
			setCurrentTurn(firstTurn === "random" ? getRandomTurn() : firstTurn);
			setCanPlay(true);
		};

		const handleMembersUpdate = ({ members }: { members: number }) => {
			setMembers(members);
			membersRef.current = members;
		};

		socket.on("joinedRoom", handleJoinedRoom);
		socket.on("roomPaired", handleRoomPaired);
		socket.on("boardUpdated", handleBoardUpdated);
		socket.on("restart", handleRestart);
		socket.on("membersUpdate", handleMembersUpdate);

		return () => {
			if (pairedTimer !== null) {
				clearTimeout(pairedTimer);
			}
			socket.off("joinedRoom", handleJoinedRoom);
			socket.off("roomPaired", handleRoomPaired);
			socket.off("boardUpdated", handleBoardUpdated);
			socket.off("restart", handleRestart);
			socket.off("membersUpdate", handleMembersUpdate);
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
		});
	}, [board, currentTurn, lastPosition, matchState, roomId]);

	useUpdateEffect(() => {
		if (checkWin({ lastPosition, currentTurn, board })) {
			setCanPlay(false);
			const timer = setTimeout(() => {
				setIsWin(true);
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [board]);

	useEffect(() => {
		matchStateRef.current = matchState;
	}, [matchState]);

	useUpdateEffect(() => {
		if (firstTurn === "random") {
			setCurrentTurn(getRandomTurn());
			return;
		}
		setCurrentTurn(firstTurn);
	}, [firstTurn]);

	if (matchState === "waiting") {
		return (
			<>
				<div className="flex flex-col justify-center items-center min-h-[calc(100vh-72px)] ">
					<Loading text="対線相手を待っています…" />
					<div className="mt-7">
						<RuleSettings first={firstTurn} setFirst={setFirstTurn} />
					</div>
				</div>
			</>
		)
	}
	if (matchState === "matched") {
		return (
			<div className="flex justify-center items-center min-h-[calc(100vh-72px)] ">
				<Loading text="対線相手とマッチしました！" />
			</div>
		)
	}
	if (matchState === "playing") {
		return (
			<div className={`${currentTurn === 'r' ? 'bg-red-200' : 'bg-yellow-200'} min-h-[calc(100vh-72px)] transition-colors duration-300 relative z-1 ${styles.fadeIn}`}>
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
				<TemporaryWaiting members={members} />
			</div>
		);
	}
}