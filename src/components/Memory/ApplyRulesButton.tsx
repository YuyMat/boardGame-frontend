import { Button } from "antd";
import { Settings } from "@/types/memory";

export default function ApplyRulesButton({ setSettings }: { setSettings: React.Dispatch<React.SetStateAction<Settings>> }) {
	return (
		<Button type="primary" onClick={() => setSettings((prev) => ({ ...prev, haveRuleSettings: true }))}>確定</Button>
	)
}
