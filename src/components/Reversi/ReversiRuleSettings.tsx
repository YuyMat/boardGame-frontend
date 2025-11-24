import FirstRoleSelector from "../Utils/FirstRoleSelector";
import { ReversiRuleSettingsProps } from "@/types/reversi";

export default function ReversiRuleSettings({ setFirstRole, keyToShowLabel, firstTurnItems }: ReversiRuleSettingsProps) {
	return (
		<>
			<FirstRoleSelector setFirst={setFirstRole} keyToShowLabel={keyToShowLabel} firstTurnItems={firstTurnItems} />
		</>
	)
}
