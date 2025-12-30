import { Role } from "@/constants/utils";

export type CSSColorClass = string;
export type RoleState = typeof Role.MAIN | typeof Role.SUB;
export type FirstState = 'random' | RoleState;

export type MatchState = "waiting" | "matched" | "playing";

export type RuleSettingsProps = {
	keyToShowLabel: Record<FirstState, string>;
	mainPlayerColorClass: CSSColorClass;
	settingsComponents?: React.ReactNode;
	playerRole: RoleState | null;
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
	playerRole: RoleState | null;
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

export interface PlayerCardProps {
	playerRole: RoleState | null;
	cardRole: RoleState;
	members: number;
	mainAvatarBGcolor: string;
	subAvatarBGcolor: string;
}

export interface StartGameProps {
	matchState: MatchState;
	setMatchState: React.Dispatch<React.SetStateAction<MatchState>>;
	playerRole: RoleState | null;
}
