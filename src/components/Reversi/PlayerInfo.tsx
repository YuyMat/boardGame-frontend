import { ShowRoleProps } from "@/types/reversi";
import { Role } from "@/constants/reversi";

/**
 * リバーシゲームの現在のターン情報を表示するコンポーネントです。
 * プレイヤーのターン、相手のターン、観戦中の状態を表示します。
 * 
 * @param props - コンポーネントのProps
 * @param props.currentRole - 現在のターンのプレイヤー（Role.BLACKまたはRole.WHITE）
 * @param props.playerRole - このプレイヤーのロール（観戦時はnull）
 * @param props.canPlay - ゲームがプレイ可能な状態かどうか
 * 
 * @remarks
 * - プレイヤーロールがnullの場合は「観戦中」と表示されます
 * - 自分のターン、相手のターンで異なるメッセージを表示します
 * - ゲーム終了後（`canPlay=false`）は何も表示しません
 */
export default function ShowTurn({ currentRole, playerRole, canPlay }: ShowRoleProps) {
	if (!playerRole) return;

	const isMyTurn = currentRole === playerRole;
	const isBlack = playerRole === Role.BLACK;

	if (canPlay) {
		return (
			<div className={`flex justify-center font-bold whitespace-nowrap text-base sm:text-xl md:text-2xl text-emerald-900`}>
				<div className="bg-white/40 rounded-lg w-[fit-content] px-2 py-1">
					{isMyTurn ? (
						isBlack ? <p>⚫️ あなたの番です ⚫️</p> : <p>⚪️ あなたの番です ⚪️</p>
					) : (
						isBlack ? <p>⚪️ 相手の番です ⚪️</p> : <p>⚫️ 相手の番です ⚫️</p>
					)}
				</div>
			</div>
		);
	}
}
