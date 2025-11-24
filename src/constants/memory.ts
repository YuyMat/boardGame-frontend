export const totalCards = [8, 12, 16, 20, 24] as const;
export const defaultTotalCards = 16;
export const cols = 4;
export const MATCH_POINT = 2;

export const Role = {
	BLUE: 1,
	GREEN: 2,
} as const;

export const keyToShowLabel = {
	random: "ランダム",
	[Role.BLUE]: "青",
	[Role.GREEN]: "緑",
} as const;

export const firstTurnItems = [
	{
		label: "ランダム(デフォルト)",
		key: "random",
	},
	{
		label: "青",
		key: Role.BLUE,
	},
	{
		label: "緑",
		key: Role.GREEN,
	},
]

export const mainPlayerColorClass = "text-blue-900" as const;

export enum CardState {
	CLOSED = 0,
	OPENED = 1,
	REMOVED = 2,
}

export const MAX_FILL_TRIES = 5;
export const TRUMP_CARDS = 55;
export const CHIPS = 7;
export const DICE = 13;
