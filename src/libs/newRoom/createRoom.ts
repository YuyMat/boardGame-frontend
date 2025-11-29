/**
 * 新規ルームを作成し、ルームIDを取得します
 *
 * @returns 作成されたルームのID
 * @throws ルーム作成に失敗した場合にエラーをスローします
 */
export async function createRoom(): Promise<string> {
	const res = await fetch("/api/rooms/new", { cache: "no-store" });
	if (!res.ok) throw new Error("Failed to create room");
	const data = await res.json();
	return data.roomId;
}
