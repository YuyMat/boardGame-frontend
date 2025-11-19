export const dynamic = "force-dynamic";
import { getBackendUrl } from "@/utils/getBackendUrl";

const backendUrl = getBackendUrl();
const MAX_ROOM_COUNT = Number(process.env.MAX_ROOM_COUNT) || 200;

/**
 * 新規ルーム作成用のID(UUID)を生成します
 * 
 * @returns UUID形式のルームID。ルーム数上限到達時やエラー発生時は`null`
 * 
 * @remarks
 * - `crypto.randomUUID()`を使用してUUIDを生成します
 * - バックエンドサーバーに問い合わせて現在のルーム数を確認し、上限(`MAX_ROOM_COUNT`)未満の場合のみIDを発行します
 */
async function generateRoomId() {
	try {
		const res = await fetch(`${backendUrl}/count-rooms`, {
			cache: "no-store",
			signal: AbortSignal.timeout(5000),
		});
		if (!res.ok) throw new Error();
		const data: { count: number } = await res.json();
		if (data.count < MAX_ROOM_COUNT) {
			const roomId = crypto.randomUUID();
			return roomId;
		}
		else
			return null;
	} catch {
		return null;
	}
}

export async function GET() {
	const roomId = await generateRoomId();
	
	if (!roomId) {
		return new Response("Service Unavailable", { status: 503 });
	}

	return Response.json(
		{ roomId },
		{ headers: { "Cache-Control": "no-store" } }
	);
}
