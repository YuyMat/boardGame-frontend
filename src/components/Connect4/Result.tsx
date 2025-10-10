import { Button, Modal } from "antd";
import { ResultProps } from "@/types/connect4";
import { Role } from "@/constants/connect4";

export default function Result({isWin, onRestart, handleCancel, onShowGames, currentRole}: ResultProps) {
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
				currentRole === Role.YELLOW
					? "🎉 🔴赤の勝利 🎉"
					: "🎉 🟡黄色の勝利 🎉"
				}
			</p>
		</Modal>
	)
}
