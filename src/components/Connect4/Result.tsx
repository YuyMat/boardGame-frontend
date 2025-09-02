import { Button, Modal } from "antd";
import { ResultProps } from "@/types/connect4";

export default function Result({isWin, onRestart, handleCancel, onShowGames, currentTurn}: ResultProps) {
	return (
		<Modal
			open={isWin}
			title="決着！！"
			onOk={onRestart}
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
				currentTurn === 'y'
					? "🎉 🔴赤の勝利 🎉"
					: "🎉 🟡黄色の勝利 🎉"
			}
			</p>
		</Modal>
	)
}
