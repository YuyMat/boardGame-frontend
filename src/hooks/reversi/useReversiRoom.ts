"use client"

import { useEffect, useRef, useState, useCallback } from "react";
import { useUpdateEffect } from "@/hooks/utils/useUpdateEffect";
import { createSocket } from "@/libs/socket/client";
import { RoleState, HandleJoinedRoomProps, HandleRoomPairedProps, FirstState } from "@/types/reversi";
import { MatchState, GuestIds } from "@/types/utils";
import { Role } from "@/constants/reversi";
import type { Socket } from "socket.io-client";

/**
 * オセロゲームのルーム管理とマッチング機能を提供するカスタムフックです。
 * Socket.IOを使用してルームへの参加、プレイヤーのマッチング、先手設定の同期を行います。
 * 
 * @param roomId - 参加するルームのID
 * @param setFirstRole - 先手設定を更新するセッター関数
 * @param firstRole - 現在の先手設定（'random' | Role.BLACK | Role.WHITE）
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
 * - `useUpdateEffect`を使用して先手設定の変更をサーバーに通知します
 */
export default function useReversiRoom(
	roomId: string,
	setFirstRole: React.Dispatch<React.SetStateAction<FirstState>>,
	firstRole: FirstState,
) {
	const [members, setMembers] = useState<number>(0);
	const [playerRole, setPlayerRole] = useState<RoleState | null>(null);
	const [matchState, setMatchState] = useState<MatchState>("waiting");
	const [currentRole, setCurrentRole] = useState<RoleState>(Role.BLACK);
	const [guestIds, setGuestIds] = useState<GuestIds>({});

	const socketRef = useRef<Socket | null>(null);
	const membersRef = useRef<number>(0);
	const matchStateRef = useRef<MatchState>("waiting");
	matchStateRef.current = matchState;

	useEffect(() => {
		const socket = createSocket();
		socketRef.current = socket;

		socket.connect();
		socket.emit("startRoom", roomId, "reversi");

		const handleJoinedRoom = ({ members, role, guestIds }: HandleJoinedRoomProps) => {
			setMembers(members);
			membersRef.current = members;
			// 最初に受け取ったロールのみ採用（後から上書きしない）
			setPlayerRole((prev) => (prev ?? role));
			setGuestIds(guestIds);
		};

		const handleRoomPaired = ({ firstRole, guestIds }: HandleRoomPairedProps) => {
			if (matchStateRef.current === "waiting") {
				setMatchState("matched");
				setFirstRole(firstRole);
				setGuestIds(guestIds);
				setCurrentRole(firstRole);
				setMembers(2);
				membersRef.current = 2;
			}
		};

		const handleSomeoneDisconnected = () => {
			if (matchStateRef.current !== "playing") {
				setMatchState("waiting");
			}
			setMembers(1);
			membersRef.current = 1;
			setGuestIds({});
		}

		const handleMembersUpdate = ({ members }: { members: number }) => {
			setMembers(members);
			membersRef.current = members;
		};

		const handleGameStart = () => {
			setMatchState("playing");
		};

		socket.on("joinedRoom", handleJoinedRoom);
		socket.on("roomPaired", handleRoomPaired);
		socket.on("someoneDisconnected", handleSomeoneDisconnected);
		socket.on("membersUpdate", handleMembersUpdate);
		socket.on("gameStarted", handleGameStart);

		return () => {
			socket.off("joinedRoom", handleJoinedRoom);
			socket.off("roomPaired", handleRoomPaired);
			socket.off("someoneDisconnected", handleSomeoneDisconnected);
			socket.off("membersUpdate", handleMembersUpdate);
			socket.off("gameStarted", handleGameStart);
			socket.disconnect();
			socketRef.current = null;
		};
	}, [roomId]);

	// 先手設定の変更をサーバへ通知（単一ソケットで管理）
	useUpdateEffect(() => {
		if (!socketRef.current) return;
		socketRef.current.emit("setFirstRole", { roomId, firstRole });
	}, [firstRole, roomId]);

	useUpdateEffect(() => {
		if (!socketRef.current) return;
		if (matchState !== "playing") return;
		if (playerRole !== Role.BLACK) return;
		socketRef.current.emit("startGame", roomId);
	}, [matchState]);

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
		guestIds,
	};
}
