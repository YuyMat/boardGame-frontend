import { MatchState } from "@/types/utils";
import { Button } from "antd";

export default function StartGame({ matchState, setMatchState }: { matchState: MatchState, setMatchState: React.Dispatch<React.SetStateAction<MatchState>> }) {
	return (
		<Button type="primary" onClick={() => setMatchState("playing")} disabled={matchState !== "matched"}>
			ゲームを開始
		</Button>
	)
}
