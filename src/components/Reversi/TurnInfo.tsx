import { Role } from "@/constants/reversi";
import { RoleState } from "@/types/reversi";

interface TurnInfoProps {
	currentRole: RoleState;
}

/**
 * ローカル対戦用の簡易ターン表示コンポーネントです。
 * 現在のプレイヤーが黒か白かを表示します。
 * 
 * @param props - コンポーネントのProps
 * @param props.currentRole - 現在のターンのプレイヤー（Role.BLACKまたはRole.WHITE）
 * 
 * @remarks
 * - オンライン対戦用の `ShowTurn` (PlayerInfo.tsx) とは異なり、観戦者や自分/相手の区別はなく、単純に現在の手番を表示します。
 */
export default function TurnInfo({ currentRole }: TurnInfoProps) {
	return (
		<div className="text-center">
			<p className="text-xl font-bold">
				現在のターン: <span className="font-bold">
					{currentRole === Role.BLACK ? '⚫️' : '⚪️'}
				</span>
			</p>
		</div>
	);
}
