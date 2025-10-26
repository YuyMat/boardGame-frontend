import { Button } from "antd";
import { ReShowResultProps } from "@/types/connect4";

export default function ReShowResult({ isWin, setIsWin, canPlay }: ReShowResultProps) {
	if (!isWin && !canPlay) {
		return (
			<Button type="primary" onClick={() => setIsWin(true)} className="absolute -top-3 left-1/2 -translate-x-1/2">
				結果を表示
			</Button>
		)
	}
}
