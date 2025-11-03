"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Utils";


const env = process.env.NEXT_PUBLIC_ENV;
const backendUrl =
	env === "local"
		? "http://localhost:4000"
		: "https://boardgame-backend-v1ew.onrender.com";

async function checkHealth(url: string): Promise<boolean> {
	try {
		const res = await fetch(`${url}/health`, {
			cache: "no-store",
			signal: AbortSignal.timeout(2000),
		});
		return res.ok;
	} catch {
		return false;
	}
}

async function createRoom(router: ReturnType<typeof useRouter>) {
	try {
		const res = await fetch("/api/rooms/new", { cache: "no-store" });
		if (!res.ok) throw new Error("Failed to create room");
		const data = await res.json();
		const roomId = data.roomId;
		router.replace(`/reversi/${roomId}`);
	} catch {
		router.replace("/");
	}
}

export default function Page() {
	const [isBackendHealthy, setIsBackendHealthy] = useState<boolean | null>(null);
	const router = useRouter();

	useEffect(() => {
		let isMounted = true;

		(async () => {
			const healthy = await checkHealth(backendUrl);
			if (!isMounted) return;

			if (healthy) {
				setIsBackendHealthy(true);
				if (!isMounted) return;
				await createRoom(router);
			} else {
				setIsBackendHealthy(false);
			}
		})();

		return () => {
			isMounted = false;
		};
	}, [router]);

	if (isBackendHealthy === null)
		return (
			<div className="flex justify-center items-center min-h-[calc(100vh-72px)]">
				<Loading text="サーバーの状態を確認しています..." />
			</div>
		);

	if (!isBackendHealthy)
		return (
			<div className="flex justify-center items-center min-h-[calc(100vh-72px)]">
				<Loading text="サーバーを起動しています。約1分後に再接続してください..." />
			</div>
		);

	return (
		<div className="flex justify-center items-center min-h-[calc(100vh-72px)]">
			<Loading text="部屋を作成しています..." />
		</div>
	);
}
