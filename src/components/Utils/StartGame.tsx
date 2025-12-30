import { StartGameProps } from "@/types/utils";
import { Role } from "@/constants/utils";
import { Button } from "antd";

export default function StartGame({ matchState, setMatchState, playerRole }: StartGameProps) {
	return (
		<Button type="primary" onClick={() => setMatchState("playing")} disabled={matchState !== "matched" || playerRole === Role.SUB}>
			ゲームを開始
		</Button>
	)
}
