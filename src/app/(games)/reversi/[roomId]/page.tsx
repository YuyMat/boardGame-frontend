"use client"

import { use } from "react";

export default function Page({ params }: { params: Promise<{ roomId: string }> }) {
	const { roomId } = use(params);

	return (
		<div>{roomId}</div>
	)
}
