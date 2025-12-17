import { RoleState } from "@/types/connect4";
import { Role } from "@/constants/connect4";

/**
 * Connect4ゲームで現在のターンを視覚的に表示するディスクコンポーネントです。
 * 画面上部に現在のターンの色のディスクを表示します。
 * 
 * @param props - コンポーネントのProps
 * @param props.currentRole - 現在のターンのプレイヤー（Role.REDまたはRole.YELLOW）
 * 
 * @remarks
 * - 赤のターンの場合は赤いディスク、黄色のターンの場合は黄色いディスクを表示します
 * - 画面上部中央に固定配置されます
 */
export default function TurnDisc({ currentRole }: { currentRole: RoleState }) {
	return (
		<div
			className={`absolute left-1/2 -translate-x-1/2 -top-2 w-12 h-12 rounded-full flex items-center justify-center transition-colors -z-10
			${currentRole === Role.RED
					? 'bg-red-500'
					: 'bg-yellow-500'
				}`}
		>
		</div >
	)
}
