import { Button, Modal } from "antd";
import { ResultProps } from "@/types/connect4";
import { Role } from "@/constants/connect4";

/**
 * Connect4ゲームの結果を表示するモーダルコンポーネントです。
 * 勝者を発表し、リスタートやゲーム一覧への遷移オプションを提供します。
 * 
 * @param props - コンポーネントのProps
 * @param props.isWin - 勝敗が決定したかどうか（モーダルの表示/非表示を制御）
 * @param props.isDraw - 引き分けかどうか
 * @param props.onRestart - リスタートボタンがクリックされた時のハンドラ関数
 * @param props.handleCancel - キャンセルボタンがクリックされた時のハンドラ関数
 * @param props.onShowGames - ゲーム一覧ボタンがクリックされた時のハンドラ関数
 * @param props.currentRole - 現在のターンのプレイヤー（勝者の判定に使用）
 * 
 * @remarks
 * - 引き分けの場合は引き分けメッセージを表示します
 * - 勝者がいる場合は、currentRoleの逆のプレイヤーが勝者として表示されます
 * - 3つのアクション（戻る、ゲーム一覧、リスタート）を提供します
 */
export default function Result({isWin, isDraw, onRestart, handleCancel, onShowGames, currentRole}: ResultProps) {
	return (
		<Modal
			open={isWin}
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
			<p className="text-center text-2xl">{
				isDraw
					? "😑 引き分け 😑"
					: currentRole === Role.YELLOW
						? "🎉 🔴赤の勝利 🎉"
						: "🎉 🟡黄色の勝利 🎉"
				}
			</p>
		</Modal>
	)
}
