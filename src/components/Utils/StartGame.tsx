import { StartGameProps } from "@/types/utils";
import { Role } from "@/constants/utils";
import { Button, Tooltip } from "antd";

export default function StartGame({ matchState, setMatchState, playerRole }: StartGameProps) {
	return (
		<Tooltip title={playerRole === Role.SUB ? "ルームホストのみゲームを開始できます" : matchState !== "matched" ? "対戦相手を待っています" : undefined}>
			<Button type="primary" onClick={() => setMatchState("playing")} disabled={matchState !== "matched" || playerRole === Role.SUB}>
				ゲームを開始
			</Button>
		</Tooltip>
	)
}
