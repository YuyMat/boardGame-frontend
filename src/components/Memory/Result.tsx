import { Button, Modal } from "antd";
import { ResultProps } from "@/types/memory";
import { Role } from "@/constants/memory";

/**
 * 神経衰弱ゲームの結果を表示するモーダルコンポーネントです。
 * 青プレイヤーと緑プレイヤーの獲得ペア数を表示し、勝者を発表します。
 * 
 * @param props - コンポーネントのProps
 * @param props.isFinished - ゲームが終了し、モーダルを表示するかどうか
 * @param props.onRestart - リスタートボタンがクリックされた時のハンドラ関数
 * @param props.handleCancel - キャンセルボタンがクリックされた時のハンドラ関数
 * @param props.onShowGames - ゲーム一覧ボタンがクリックされた時のハンドラ関数
 * @param props.scores - 各プレイヤーのスコア（獲得ペア数）
 * 
 * @remarks
 * - 獲得ペア数が同じ場合は引き分けと表示されます
 * - 獲得ペア数が多い方が勝者として表示されます
 * - 3つのアクション（戻る、ゲーム一覧、リスタート）を提供します
 */
export default function Result({ isFinished, onRestart, handleCancel, onShowGames, scores }: ResultProps) {
	return (
		<Modal
			open={isFinished}
			title="決着！！"
			onCancel={handleCancel}
			footer={[
				<Button key="back" onClick={handleCancel}>
					戻る
				</Button>,
				<Button key="root" onClick={onShowGames}>
					ゲーム一覧
				</Button>,
				<Button key="restart" type="primary" onClick={onRestart}>
					リスタート
				</Button>,
			]}
		>
			<p className="text-center text-2xl">
				{scores[Role.BLUE]} - {scores[Role.GREEN]} により...
			</p>
			{scores[Role.BLUE] === scores[Role.GREEN] ?
				<p className="text-center text-2xl">引き分け</p>
				:
				<p className="text-center text-2xl">{
					scores[Role.BLUE] > scores[Role.GREEN]
						? "🎉 青の勝利 🎉"
						: "🎉 緑の勝利 🎉"
				}
				</p>
			}

		</Modal>
	)
}
