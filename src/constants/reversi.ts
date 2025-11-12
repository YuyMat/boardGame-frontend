export const directions = [
	{ row: -1, col: 0 },
	{ row: 1, col: 0 },
	{ row: 0, col: -1 },
	{ row: 0, col: 1 },
	{ row: -1, col: -1 },
	{ row: 1, col: 1 },
	{ row: -1, col: 1 },
	{ row: 1, col: -1 },
];

export const Role = {
	BLACK: 1,
	WHITE: 2,
} as const;

export const keyToShowLabel = {
	random: "ランダム",
	[Role.BLACK]: "黒",
	[Role.WHITE]: "白",
} as const;

export const firstTurnItems = [
	{
		label: "ランダム(デフォルト)",
		key: "random",
	},
	{
		label: "黒",
		key: Role.BLACK,
	},
	{
		label: "白",
		key: Role.WHITE,
	},
]

export const MAX_CELL_COUNT = 64 as const;
