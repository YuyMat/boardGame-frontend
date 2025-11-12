export const Connect4 = {
	ROWS: 6,
	COLS: 7,
} as const;

export const Role = {
	RED: 1,
	YELLOW: 2,
} as const;

export const keyToShowLabel = {
	random: "ランダム",
	[Role.RED]: "赤",
	[Role.YELLOW]: "黄",
} as const;

export const firstTurnItems = [
	{
		label: "ランダム(デフォルト)",
		key: "random",
	},
	{
		label: "赤",
		key: Role.RED,
	},
	{
		label: "黄",
		key: Role.YELLOW,
	},
]
