export default function getNewRoomId(length: number = 6): string {
	const base = (typeof crypto !== "undefined" && "randomUUID" in crypto)
		? crypto.randomUUID().replace(/-/g, "")
		: Math.random().toString(36).slice(2);
	return base.slice(0, length);
}