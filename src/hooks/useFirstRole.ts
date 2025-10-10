"use client"

import { useState, useEffect } from "react";
import { FirstState } from "@/types/connect4";
import { createSocket } from "@/libs/socket/client";

export default function useFirstRole(roomId: string) {
	const [firstRole, setFirstRole] = useState<FirstState>("random");
	const socket = createSocket();

	useEffect(() => {
		socket.connect();
		socket.emit("setFirstRole", { roomId, firstRole });
		return () => {
			socket.disconnect();
		};
	}, [firstRole, roomId]);
	
	return {
		firstRole,
		setFirstRole,
	};
}
