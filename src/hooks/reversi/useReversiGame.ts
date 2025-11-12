"use client"

import { useEffect, useRef, useState } from "react";
import { useUpdateEffect } from "@/hooks/utils/useUpdateEffect";
import { BoardState, lastPositionState, RoleState, handleBoardUpdatedProps, UseReversiGameProps, HighlightedBoardState } from "@/types/reversi";
import { onCellClick, checkWin, createEmptyBoard, createEmptyHighlightedBoard, countStones } from "@/libs/reversi";
import { computeHighlights } from "@/libs/reversi/computeHighlights";

/**
 * オセロゲームのゲームロジックとリアルタイム同期を管理するカスタムフックです。
 * ボードの状態管理、合法手のハイライト、勝敗判定、Socket.IOを使った盤面同期を行います。
 * 
 * @param props - ゲーム管理に必要なパラメータ
 * @param props.socketRef - Socket.IOクライアントのRefオブジェクト
 * @param props.matchState - 現在のマッチ状態（waiting | matched | playing）
 * @param props.playerRole - このプレイヤーのロール（黒または白）
 * @param props.roomId - ルームID
 * @param props.membersRef - ルームのメンバー数のRefオブジェクト
 * @param props.setMatchState - マッチ状態を更新するセッター関数
 * @param props.currentRole - 現在のターンのプレイヤー
 * @param props.setCurrentRole - 現在のロールを更新するセッター関数
 * 
 * @returns ゲーム状態と操作関数を含むオブジェクト
 * - `board`: 現在の盤面の状態
 * - `currentRole`: 現在のターンのプレイヤー
 * - `isWin`: 勝敗が決定したかどうか
 * - `setIsWin`: 勝敗フラグを更新するセッター関数
 * - `onCellClick`: セルをクリックした時のハンドラ関数
 * - `lastPosition`: 最後に石が置かれた位置
 * - `canPlay`: プレイ可能かどうか
 * - `blackCount`: 黒石の数を保持するRefオブジェクト
 * - `whiteCount`: 白石の数を保持するRefオブジェクト
 * - `isSkipTurn`: スキップターンが発生したかどうか
 * - `highlightedCells`: 合法手がハイライトされているセルの配列
 * 
 * @remarks
 * - Socket.IOを使用してリアルタイムで盤面を同期します
 * - 自分のターンかつ合法手のみ石を置くことができます
 * - スキップターン（パス）の判定も自動的に行われます
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
	const suppressSyncRef = useRef(false);
	const skipTurnRef = useRef(false);

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

	// 勝敗判定 & ハイライト更新
	useUpdateEffect(() => {
		const stonesCount = countStones(board);
		blackCount.current = stonesCount.blackCount;
		whiteCount.current = stonesCount.whiteCount;

		if (isSkipTurn) {
			if (!skipTurnRef.current)
				skipTurnRef.current = true;
			else {
				setIsSkipTurn(false);
				skipTurnRef.current = false;
			}
		}
		
		if (checkWin({ currentRole, board, setHighlightedCells, setIsSkipTurn, setCurrentRole, setCanPlay })) {
			setHighlightedCells(createEmptyHighlightedBoard());
			setCanPlay(false);
			const timer = setTimeout(() => {
				setIsWin(true);
			}, 200);
			return () => clearTimeout(timer);
		}
		if (matchState === "playing" && playerRole !== currentRole) {
			setHighlightedCells(createEmptyHighlightedBoard());
		}
	}, [board, matchState, currentRole]);

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
