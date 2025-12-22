"use client";

export const dynamic = "force-dynamic";

import { Loading } from "@/components/Utils";
import { useRoomInitializer } from "@/hooks/utils/useRoomInitializer";

export default function Page() {
	const { isBackendHealthy } = useRoomInitializer("connect4");

	if (isBackendHealthy === null)
		return (
			<div className="flex justify-center items-center h-[calc(100svh-72px)]">
				<Loading text="サーバーの状態を確認しています..." />
			</div>
		);

	if (!isBackendHealthy)
		return (
			<div className="flex justify-center items-center h-[calc(100svh-72px)]">
				<Loading text="サーバーを起動しています。約1分後に再接続してください..." />
			</div>
		);

	return (
		<div className="flex justify-center items-center h-[calc(100svh-72px)]">
			<Loading text="部屋を作成しています..." />
		</div>
	);
}
