import { ShowRoleProps } from "@/types/connect4";
import { Role } from "@/constants/connect4";

/**
 * Connect4ゲームの現在のターン情報を表示するコンポーネントです。
 * プレイヤーのターン、相手のターン、観戦中の状態を表示します。
 * 
 * @param props - コンポーネントのProps
 * @param props.currentRole - 現在のターンのプレイヤー（Role.REDまたはRole.YELLOW）
 * @param props.playerRole - このプレイヤーのロール（観戦時はnull）
 * @param props.canPlay - ゲームがプレイ可能な状態かどうか
 * 
 * @remarks
 * - プレイヤーロールがnullの場合は「観戦中」と表示されます
 * - 自分のターン、相手のターンで異なるメッセージを表示します
 * - ゲーム終了後（`canPlay=false`）は何も表示しません
 */
export default function ShowTurn({ currentRole, playerRole, canPlay }: ShowRoleProps) {
	if (!playerRole) {
		return (
			<div className="absolute top-110 left-1/2 -translate-x-1/2 text-blue-800 font-bold whitespace-nowrap text-base sm:text-xl md:text-2xl">👀 観戦中 👀</div>
		);
	}

	const isMyTurn = currentRole === playerRole;
	const isRed = playerRole === Role.RED;

	if (canPlay) {
		return (
			<div className="absolute top-110 left-1/2 -translate-x-1/2 text-blue-800 font-bold whitespace-nowrap text-base sm:text-xl md:text-2xl">
				{isMyTurn ? (
					isRed ? <p>🔴 あなたの番です 🔴</p> : <p>🟡 あなたの番です 🟡</p>
				) : (
					isRed ? <p>🟡 相手の番です 🟡</p> : <p>🔴 相手の番です 🔴</p>
				)}
			</div>
		);
	}
}
