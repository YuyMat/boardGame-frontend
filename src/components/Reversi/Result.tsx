import { ResultProps } from "@/types/reversi";
import { Button, Modal } from "antd";

export default function Result({ isOpen, onRestart, handleCancel, onShowGames, blackCount, whiteCount }: ResultProps) {
	return (
		<Modal
			open={isOpen}
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
