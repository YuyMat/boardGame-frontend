import { ShowRoleProps } from "@/types/utils";
import { Role } from "@/constants/reversi";

/**
 * リバーシゲームの現在のターン情報を表示するコンポーネントです。（オンライン対戦用）
 * プレイヤーのターン、相手のターン状態を表示します。
 * 
 * @param props - コンポーネントのProps
 * @param props.currentRole - 現在のターンのプレイヤー（Role.BLACKまたはRole.WHITE）
 * @param props.playerRole - このプレイヤーのロール
 * @param props.canPlay - ゲームがプレイ可能な状態かどうか
 * 
 * @remarks
 * - 自分のターン、相手のターンで異なるメッセージを表示します
 * - ゲーム終了後（`canPlay=false`）は何も表示しません
 * - ローカル対戦用には `TurnInfo` コンポーネントが使用されます
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
