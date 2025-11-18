import { Role } from "@/constants/utils";

export type CSSColorClass = string;
export type RoleState = typeof Role.MAIN | typeof Role.SUB;
export type FirstState = 'random' | RoleState;

export type RuleSettingsProps = {
	setFirst: (first: FirstState) => void;
	keyToShowLabel: Record<FirstState, string>;
	firstTurnItems: { label: string; key: string | number }[];
	mainPlayerColorClass: CSSColorClass;
}

export interface ShowRoleProps<T = RoleState> {
	currentRole: T;
	playerRole: T | null;
	canPlay: boolean;
}
