"use client"

import { useEffect, useRef, useState } from "react";
import { createSocket } from "@/libs/socket/client";
import { MatchState, RoleState, handleJoinedRoomProps, FirstState, lastPositionState } from "@/types/connect4";
import { Role } from "@/constants/connect4";
import type { Socket } from "socket.io-client";

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

	useEffect(() => {
		let pairedTimer: ReturnType<typeof setTimeout> | null = null;
		const socket = createSocket();
		socketRef.current = socket;

		socket.connect();
		socket.emit("startRoom", roomId, "connect4");

		const handleJoinedRoom = ({ members, role }: handleJoinedRoomProps) => {
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

	useEffect(() => {
		matchStateRef.current = matchState;
	}, [matchState]);

	const emitRestart = () => {
		socketRef.current?.emit("restart", roomId);
	};

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
