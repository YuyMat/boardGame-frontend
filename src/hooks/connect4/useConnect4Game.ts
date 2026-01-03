"use client"

import { useState } from "react";
import { UseConnect4GameProps } from "@/types/connect4";
import { onCellClick } from "@/libs/connect4";
import { useConnect4GameState } from "./_internal/useConnect4GameState";
import { useConnect4SocketSync } from "./_internal/useConnect4SocketSync";
import { useConnect4WinCheck } from "./_internal/useConnect4WinCheck";
import { useConnect4Restart } from "./_internal/useConnect4Restart";

/**
 * Connect4ゲームのゲームロジックとリアルタイム同期を管理するカスタムフックです。
 * ボードの状態管理、勝敗判定、Socket.IOを使った盤面同期を行います。
 * 
 * @param props - ゲーム管理に必要なパラメータ
 * @param props.socketRef - Socket.IOクライアントのRefオブジェクト
 * @param props.matchState - 現在のマッチ状態（waiting | matched | playing）
 * @param props.playerRole - このプレイヤーのロール（Role.REDまたはRole.YELLOW）
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
 * - `isDraw`: 引き分けかどうか
 * 
 * @remarks
 * - Socket.IOを使用してリアルタイムで盤面を同期します
 * - 自分のターンのみ石を置くことができます
 * - 勝敗判定は自動的に行われます
 */
export default function useConnect4Game({
	socketRef,
	matchState,
	playerRole,
	roomId,
	membersRef,
	setMatchState,
	currentRole,
	setCurrentRole,
}: UseConnect4GameProps) {
	const [isWin, setIsWin] = useState(false);

	const {
		board,
		setBoard,
		lastPosition,
		setLastPosition,
		canPlay,
		setCanPlay,
		isDraw,
		setIsDraw,
		resetGameState,
	} = useConnect4GameState();

	useConnect4SocketSync({
		socketRef,
		roomId,
		matchState,
		board,
		currentRole,
		lastPosition,
		setBoard,
		setCurrentRole,
		setLastPosition,
		setMatchState,
	});

	useConnect4WinCheck({
		board,
		lastPosition,
		currentRole,
		setCanPlay,
		setIsWin,
		setIsDraw,
	});

	useConnect4Restart({
		socketRef,
		roomId,
		membersRef,
		setMatchState,
		setIsWin,
		resetGameState,
		setCurrentRole,
	});

	const handleCellClick = (colIndex: number) => {
		onCellClick({
			colIndex,
			canPlay: canPlay && playerRole === currentRole,
			currentRole,
			setCurrentRole,
			setLastPosition,
			setBoard,
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
		isDraw,
	};
}
