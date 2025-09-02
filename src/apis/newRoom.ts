export default function getNewRoomId(length: number = 6): string {
	const base = (typeof crypto !== "undefined" && "randomUUID" in crypto)
		? crypto.randomUUID().replace(/-/g, "")
		: Math.random().toString(36).slice(2);

	let id = base;
	while (id.length < length) {
		id += Math.random().toString(36).slice(2);
	}

	return id.slice(0, length);
}