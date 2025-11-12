export const dynamic = "force-dynamic";
import { getRandomInt } from "@/utils/getRandom";

const MIN_ROOM_ID_NUMBER = Number(process.env.ROOMID_MIN);
const MAX_ROOM_ID_NUMBER = Number(process.env.ROOMID_MAX);

/**
 * 一意なルームIDを生成します
 * 
 * @returns 16進数文字列形式の一意なルームID、またはエラー時は`null`
 * 
 * @remarks
 * - 環境変数で設定された範囲内でランダムな数値を生成します
 * - バックエンドサーバーに問い合わせて、既に存在しないIDを確認します
 * - 一意なIDが見つかるまで繰り返します
 * - 生成された数値は16進数文字列に変換されます
 */
async function generateRoomId() {
	while (true) {
		const roomIdNumber = BigInt(getRandomInt(MIN_ROOM_ID_NUMBER, MAX_ROOM_ID_NUMBER));

		const env = process.env.NEXT_PUBLIC_ENV;
		const backendUrl = env === "local"
			? "http://localhost:4000"
			: "https://boardgame-backend-v1ew.onrender.com";
		try {
			const res = await fetch(`${backendUrl}/rooms/${roomIdNumber}/exists`, { cache: "no-store" });
			if (res.ok) {
				const data: { exists: boolean } = await res.json();
				if (!data.exists)
					return roomIdNumber.toString(16);
			}
		} catch {
			return null;
		}
	}
}

export async function GET() {
	const roomId = await generateRoomId();
	return Response.json(
		{ roomId },
		{ headers: { "Cache-Control": "no-store" } }
	);
}
