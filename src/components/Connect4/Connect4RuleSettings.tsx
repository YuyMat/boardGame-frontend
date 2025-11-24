import FirstRoleSelector from "@/components/Utils/FirstRoleSelector";
import { Connect4RuleSettingsProps } from "@/types/connect4";

export default function Connect4RuleSettings({ setFirstRole, keyToShowLabel, firstTurnItems }: Connect4RuleSettingsProps) {
	return (
		<>
			<FirstRoleSelector setFirst={setFirstRole} keyToShowLabel={keyToShowLabel} firstTurnItems={firstTurnItems} />
		</>
	)
}
