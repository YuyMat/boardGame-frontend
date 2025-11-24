import MemoryCardsSelector from "@/components/Memory/MemoryCardsSelector";
import ApplyRulesButton from "@/components/Memory/ApplyRulesButton";
import { MemoryRuleSettingsProps } from "@/types/memory";

export default function MemoryRuleSettings({ cards, setSettings }: MemoryRuleSettingsProps) {
	return (
		<>
			<MemoryCardsSelector cards={cards} setSettings={setSettings} />
			<div className="flex justify-end items-center mt-4">
				<ApplyRulesButton setSettings={setSettings} />
			</div>
		</>
	)
}
