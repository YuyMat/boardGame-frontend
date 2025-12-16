import FirstRoleSelector from "../Utils/FirstRoleSelector";
import { ReversiRuleSettingsProps } from "@/types/reversi";

/**
 * リバーシのルール設定を行うコンポーネント
 * 
 * 先攻・後攻の選択などのルール設定UIを提供します。
 * 現在は先攻・後攻の選択のみ実装されています。
 * 
 * @param props - コンポーネントのProps
 * @param props.setFirstRole - 先攻・後攻の状態を更新する関数
 * @param props.keyToShowLabel - 先攻・後攻のキーに対応するラベルのマップ
 * @param props.firstTurnItems - 先攻・後攻の選択肢リスト
 */
export default function ReversiRuleSettings({ setFirstRole, keyToShowLabel, firstTurnItems }: ReversiRuleSettingsProps) {
	return (
		<>
			<FirstRoleSelector setFirst={setFirstRole} keyToShowLabel={keyToShowLabel} firstTurnItems={firstTurnItems} />
		</>
	)
}
