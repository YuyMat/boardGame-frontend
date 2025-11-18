"use client"

import { useState } from "react";
import { UseReversiGameProps } from "@/types/reversi";
import { onCellClick } from "@/libs/reversi";
import { useReversiGameState } from "./_internal/useReversiGameState";
import { useReversiSocketSync } from "./_internal/useReversiSocketSync";
import { useReversiWinCheck } from "./_internal/useReversiWinCheck";
import { useReversiRestart } from "./_internal/useReversiRestart";

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
	const [isWin, setIsWin] = useState(false);
	const {
		board,
		setBoard,
		lastPosition,
		setLastPosition,
		canPlay,
		setCanPlay,
		highlightedCells,
		setHighlightedCells,
		isSkipTurn,
		setIsSkipTurn,
		blackCount,
		whiteCount,
		skipTurnRef,
		resetGameState,
	} = useReversiGameState();

	useReversiSocketSync({
		socketRef,
		roomId,
		matchState,
		board,
		lastPosition,
		currentRole,
		setBoard,
		setCurrentRole,
		setLastPosition,
	});

	useReversiWinCheck({
		board,
		currentRole,
		matchState,
		playerRole,
		isSkipTurn,
		skipTurnRef,
		blackCount,
		whiteCount,
		setCanPlay,
		setIsWin,
		setHighlightedCells,
		setIsSkipTurn,
		setCurrentRole,
	});

	useReversiRestart({
		socketRef,
		roomId,
		membersRef,
		setMatchState,
		setIsWin,
		resetGameState,
		setCurrentRole,
	});

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
