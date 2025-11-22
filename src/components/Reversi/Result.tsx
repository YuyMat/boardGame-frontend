import { ResultProps } from "@/types/reversi";
import { Button, Modal } from "antd";

/**
 * オセロゲームの結果を表示するモーダルコンポーネントです。
 * 黒石と白石の数を表示し、勝者を発表します。
 * 
 * @param props - コンポーネントのProps
 * @param props.isOpen - モーダルが開いているかどうか
 * @param props.onRestart - リスタートボタンがクリックされた時のハンドラ関数
 * @param props.handleCancel - キャンセルボタンがクリックされた時のハンドラ関数
 * @param props.onShowGames - ゲーム一覧ボタンがクリックされた時のハンドラ関数
 * @param props.blackCount - 黒石の数
 * @param props.whiteCount - 白石の数
 * 
 * @remarks
 * - 石の数が同じ場合は引き分けと表示されます
 * - 石の数が多い方が勝者として表示されます
 * - 3つのアクション（戻る、ゲーム一覧、リスタート）を提供します
 */
export default function Result({ isOpen, onRestart, handleCancel, onShowGames, blackCount, whiteCount }: ResultProps) {
	return (
		<Modal
			open={isOpen}
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
				{blackCount} - {whiteCount} により...
			</p>
			{blackCount === whiteCount ?
				<p className="text-center text-2xl">引き分け</p>
				:
				<p className="text-center text-2xl">{
					blackCount > whiteCount
						? "🎉 黒の勝利 🎉"
						: "🎉 白の勝利 🎉"
				}
				</p>
			}

		</Modal>
	)
}
