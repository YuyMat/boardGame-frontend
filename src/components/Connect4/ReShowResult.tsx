import { Button } from "antd";
import { ReShowResultProps } from "@/types/connect4";

/**
 * ゲーム終了後に結果モーダルを再表示するためのボタンコンポーネントです。
 * 結果モーダルを閉じた後でも、再度結果を確認できるようにします。
 * 
 * @param props - コンポーネントのProps
 * @param props.isWin - 結果モーダルが現在表示されているかどうか
 * @param props.setIsWin - 結果モーダルの表示/非表示を切り替えるセッター関数
 * @param props.canPlay - ゲームがプレイ可能な状態かどうか
 * 
 * @remarks
 * - ゲームが終了（`canPlay=false`）していて、かつ結果モーダルが閉じている（`isWin=false`）場合のみ表示されます
 * - 画面上部中央に配置されます
 */
export default function ReShowResult({ isWin, setIsWin, canPlay }: ReShowResultProps) {
	if (!isWin && !canPlay) {
		return (
			<Button type="primary" onClick={() => setIsWin(true)} className="absolute -top-3 left-1/2 -translate-x-1/2">
				結果を表示
			</Button>
		)
	}
}
