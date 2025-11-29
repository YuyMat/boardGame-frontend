import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkHealth, createRoom } from "@/libs/newRoom";
import { getBackendUrl } from "@/utils/getBackendUrl";

/**
 * ルーム作成前の初期化プロセスを管理するフック
 *
 * @param gamePath - ゲームのパス名 (例: "reversi", "connect4")
 * @returns バックエンドのヘルスチェック状態
 */
export const useRoomInitializer = (gamePath: string) => {
	const [isBackendHealthy, setIsBackendHealthy] = useState<boolean | null>(null);
	const router = useRouter();

	useEffect(() => {
		const backendUrl = getBackendUrl();
		let isMounted = true;

		(async () => {
			const healthy = await checkHealth(backendUrl);
			if (!isMounted) return;

			if (healthy) {
				setIsBackendHealthy(true);
				if (!isMounted) return;
				try {
					const roomId = await createRoom();
					if (!isMounted) return;
					router.replace(`/${gamePath}/${roomId}`);
				} catch {
					if (!isMounted) return;
					router.replace("/");
				}
			} else {
				setIsBackendHealthy(false);
			}
		})();

		return () => {
			isMounted = false;
		};
	}, [gamePath, router]);

	return { isBackendHealthy };
};
