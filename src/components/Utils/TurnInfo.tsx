import { Role } from "@/constants/utils";
import { TurnInfoProps } from "@/types/reversi";

/**
 * 現在のターンを表示するコンポーネントです。
 *
 * @param props - コンポーネントのProps
 * @param props.currentRole - 現在のターンのプレイヤー
 * @param props.canPlay - ゲームがプレイ可能かどうか（falseの場合は何も表示しない）
 * @param props.mainRole - メインプレイヤー（例: 黒、先攻）の表示名
 * @param props.subRole - サブプレイヤー（例: 白、後攻）の表示名
 * @param props.mainRoleColorClass - メインプレイヤー名を表示する際の色クラス
 * @param props.subRoleColorClass - サブプレイヤー名を表示する際の色クラス
 *
 * @remarks
 * - 汎用的なターン表示コンポーネントとして、Reversi以外のゲームでも使用可能です。
 * - `currentRole` が `Role.MAIN` の場合は `mainRole` と `mainRoleColorClass` を使用し、
 *   それ以外の場合は `subRole` と `subRoleColorClass` を使用します。
 */
export default function TurnInfo({ currentRole, canPlay, mainRole, subRole, mainRoleColorClass, subRoleColorClass }: TurnInfoProps) {
	if (!canPlay) return;

	return (
		<div className="text-center">
			<span className="text-xl font-bold">
				現在のターン: <span className={`font-bold ${currentRole === Role.MAIN ? mainRoleColorClass : subRoleColorClass}`}>
					{currentRole === Role.MAIN ? mainRole : subRole}
				</span>
			</span>
		</div>
	);
}
