"use client"

import { useEffect, useRef, useState, useCallback } from "react";
import { createSocket } from "@/libs/socket/client";
import { MatchState, RoleState, HandleJoinedRoomProps, FirstState } from "@/types/connect4";
import { Role } from "@/constants/connect4";
import type { Socket } from "socket.io-client";

/**
 * Connect4ゲームのルーム管理とマッチング機能を提供するカスタムフックです。
 * Socket.IOを使用してルームへの参加、プレイヤーのマッチング、先手設定の同期を行います。
 * 
 * @param roomId - 参加するルームのID
 * @param setFirstRole - 先手設定を更新するセッター関数
 * @param firstRole - 現在の先手設定（'random' | Role.RED | Role.YELLOW）
 * 
 * @returns ルーム状態と操作関数を含むオブジェクト
 * - `socketRef`: Socket.IOクライアントのRefオブジェクト
 * - `members`: 現在のルームメンバー数
 * - `playerRole`: このプレイヤーに割り当てられたロール
 * - `matchState`: マッチング状態（waiting | matched | playing）
 * - `setMatchState`: マッチ状態を更新するセッター関数
 * - `membersRef`: メンバー数のRefオブジェクト
 * - `emitRestart`: ゲームをリスタートするイベントを送信する関数
 * - `currentRole`: 現在のターンのプレイヤー
 * - `setCurrentRole`: 現在のロールを更新するセッター関数
 * 
 * @remarks
 * - マウント時に自動的にSocket.IO接続を確立し、ルームに参加します
 * - 2人のプレイヤーが揃うと自動的にマッチングされます
 * - アンマウント時に自動的にSocket.IOから切断します
 */
export default function useConnect4Room(
	roomId: string,
	setFirstRole: React.Dispatch<React.SetStateAction<FirstState>>,
	firstRole: FirstState,
) {
	const [members, setMembers] = useState<number>(0);
	const [playerRole, setPlayerRole] = useState<RoleState | null>(null);
	const [matchState, setMatchState] = useState<MatchState>("waiting");
	const [currentRole, setCurrentRole] = useState<RoleState>(Role.RED);

	const socketRef = useRef<Socket | null>(null);
	const membersRef = useRef<number>(0);
	const matchStateRef = useRef<MatchState>("waiting");
	matchStateRef.current = matchState;

	useEffect(() => {
		let pairedTimer: ReturnType<typeof setTimeout> | null = null;
		const socket = createSocket();
		socketRef.current = socket;

		socket.connect();
		socket.emit("startRoom", roomId, "connect4");

		const handleJoinedRoom = ({ members, role }: HandleJoinedRoomProps) => {
			setMembers(members);
			membersRef.current = members;
			// 最初に受け取ったロールのみ採用（後から上書きしない）
			setPlayerRole((prev) => (prev ?? role));
		};

		const handleRoomPaired = (firstRole: RoleState) => {
			if (matchStateRef.current === "waiting") {
				setMatchState("matched");
				setFirstRole(firstRole);
				setCurrentRole(firstRole);
				pairedTimer = setTimeout(() => {
					setMatchState("playing");
				}, 2000);
			}
		};

		const handleMembersUpdate = ({ members }: { members: number }) => {
			setMembers(members);
			membersRef.current = members;
		};

		socket.on("joinedRoom", handleJoinedRoom);
		socket.on("roomPaired", handleRoomPaired);
		socket.on("membersUpdate", handleMembersUpdate);

		return () => {
			if (pairedTimer !== null) {
				clearTimeout(pairedTimer);
			}
			socket.off("joinedRoom", handleJoinedRoom);
			socket.off("roomPaired", handleRoomPaired);
			socket.off("membersUpdate", handleMembersUpdate);
			socket.disconnect();
			socketRef.current = null;
		};
	}, [roomId]);

	// 先手設定の変更をサーバへ通知（単一ソケットで管理）
	useEffect(() => {
		if (!socketRef.current) return;
		socketRef.current.emit("setFirstRole", { roomId, firstRole });
	}, [firstRole, roomId]);

	const emitRestart = useCallback(() => {
		socketRef.current?.emit("restart", roomId);
	}, [roomId]);

	return {
		socketRef,
		members,
		playerRole,
		matchState,
		setMatchState,
		membersRef,
		emitRestart,
		currentRole,
		setCurrentRole,
	};
}
