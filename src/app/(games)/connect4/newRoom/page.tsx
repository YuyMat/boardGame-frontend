"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import getNewRoomId from "@/utils/newRoom";
import { Loading } from "@/components/Connect4";

export default function Page() {
	const router = useRouter();

	useEffect(() => {
		const roomId = getNewRoomId();
		router.replace(`/connect4/${roomId}`);
	}, [router]);

	return (
		<div className="flex justify-center items-center min-h-[calc(100vh-72px)]">
			<Loading text="部屋を作成しています..." />
		</div>
	);
}
