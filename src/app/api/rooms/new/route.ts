export const dynamic = "force-dynamic";
import { getRandomInt } from "@/utils/getRandom";

const MIN_ROOM_ID_NUMBER = Number(process.env.ROOMID_MIN);
const MAX_ROOM_ID_NUMBER = Number(process.env.ROOMID_MAX);

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
