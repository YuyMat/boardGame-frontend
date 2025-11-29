import { ResultProps } from "@/types/utils";
import { Button, Modal } from "antd";
import { Role } from "@/constants/utils";

/**
 * オセロゲームの結果を表示するモーダルコンポーネントです。
 * 黒石と白石の数を表示し、勝者を発表します。
 * 
 * @param props - コンポーネントのProps
 * @param props.playerRole - プレイヤーの色
 * @param props.isOpen - モーダルが開いているかどうか
 * @param props.onRestart - リスタートボタンがクリックされた時のハンドラ関数
 * @param props.handleCancel - キャンセルボタンがクリックされた時のハンドラ関数
 * @param props.onShowGames - ゲーム一覧ボタンがクリックされた時のハンドラ関数
 * @param props.mainScore - メインプレイヤーの石の数
 * @param props.subScore - サブプレイヤーの石の数
 * @param props.mainRole - メインプレイヤーの色
 * @param props.subRole - サブプレイヤーの色
 * 
 * @remarks
 * - 石の数が同じ場合は引き分けと表示されます
 * - 石の数が多い方が勝者として表示されます
 * - 3つのアクション（戻る、ゲーム一覧、リスタート）を提供します
 */
export default function Result({ playerRole, isOpen, onRestart, handleCancel, onShowGames, mainScore, subScore, mainRole, subRole }: ResultProps) {
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
				playerRole === Role.MAIN ? (
					<Button key="restart" type="primary" onClick={onRestart}>
						リスタート
					</Button>
				) : (
					<Button key="cannot-restart" disabled>
						ホストのみリスタート可能
					</Button>
				),
			]}
		>
			<p className="text-center text-2xl">
				{mainScore} - {subScore} により...
			</p>
			{mainScore === subScore ?
				<p className="text-center text-2xl">😑 引き分け 😑</p>
				:
				<p className="text-center text-2xl">{
					mainScore > subScore
						? `🎉 ${mainRole}の勝利 🎉`
						: `🎉 ${subRole}の勝利 🎉`
				}
				</p>
			}

		</Modal>
	)
}
