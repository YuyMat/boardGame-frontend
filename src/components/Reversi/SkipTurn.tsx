import { SkipTurnProps } from "@/types/reversi";
import { Role } from "@/constants/reversi";

/**
 * オセロゲームでスキップターン（パス）が発生した時に表示するメッセージコンポーネントです。
 * どちらのプレイヤーが置けなかったかを表示します。
 * 
 * @param props - コンポーネントのProps
 * @param props.isSkipTurn - スキップターンが発生したかどうか
 * @param props.currentRole - 現在のターンのプレイヤー（Role.BLACKまたはRole.WHITE）
 * 
 * @remarks
 * - スキップターンが発生していない場合は何も表示しません
 * - 「○○は置けないため、××のターンです」というメッセージを表示します
 * - オセロのルールに従って、置ける場所がない場合に自動的にターンがスキップされます
 */
export default function SkipTurn({ isSkipTurn, currentRole }: SkipTurnProps) {
	if (isSkipTurn) {
		return (
			<div className="text-center whitespace-nowrap font-bold text-base sm:text-2xl">
				{`${currentRole === Role.BLACK ? '白' : '黒'}は置けないため、${currentRole === Role.BLACK ? '黒' : '白'}のターンです。`}
			</div>
		)
	}
}
