import { Role } from "@/constants/utils";

export type CSSColorClass = string;
export type RoleState = typeof Role.MAIN | typeof Role.SUB;
export type FirstState = 'random' | RoleState;

export type RuleSettingsProps = {
	setFirst: (first: FirstState) => void;
	keyToShowLabel: Record<FirstState, string>;
	firstTurnItems: { label: string; key: string | number }[];
	mainPlayerColorClass: CSSColorClass;
	additionalSettings?: React.ReactNode;
}

export interface ShowRoleProps<T = RoleState> {
	currentRole: T;
	playerRole: T | null;
	canPlay: boolean;
}

export interface ReShowResultProps {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	canPlay: boolean;
}

export interface ResultProps {
	isOpen: boolean;
	onRestart: () => void;
	handleCancel: () => void;
	onShowGames: () => void;
	mainScore: number;
	subScore: number;
	mainRole: string;
	subRole: string;
}

export interface FirstRoleSelectorProps {
	setFirst: (first: FirstState) => void;
	keyToShowLabel: Record<FirstState, string>;
	firstTurnItems: { label: string; key: string | number }[];
}
