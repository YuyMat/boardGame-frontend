import { Button } from "antd";
import { ReShowResultProps } from "@/types/utils";

/**
 * ゲーム終了後に結果モーダルを再表示するためのボタンコンポーネントです。
 * 結果モーダルを閉じた後でも、再度結果を確認できるようにします。
 * 
 * @param props - コンポーネントのProps
 * @param props.openModal - 結果モーダルが現在表示されているかどうか
 * @param props.setOpenModal - 結果モーダルの表示/非表示を切り替えるセッター関数
 * @param props.canPlay - ゲームがプレイ可能な状態かどうか
 * 
 * @remarks
 * - ゲームが終了（`canPlay=false`）していて、かつ結果モーダルが閉じている（`openModal=false`）場合のみ表示されます
 * - 画面上部中央に配置されます
 */
export default function ReShowResult({ openModal, setOpenModal, canPlay }: ReShowResultProps) {
	console.log(openModal, canPlay);
	if (!openModal && !canPlay) {
		return (
			<div className="flex justify-center w-full -translate-y-2">
				<Button type="primary" onClick={() => setOpenModal(true)}>
					結果を表示
				</Button>
			</div>
		)
	}
}
