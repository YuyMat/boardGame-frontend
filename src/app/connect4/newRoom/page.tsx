export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import getNewRoomId from "@/apis/newRoom";

export default function Page() {
	const roomId = getNewRoomId();
	redirect(`/connect4/${roomId}`);
}
