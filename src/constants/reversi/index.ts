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

export const MAX_CELL_COUNT = 64 as const;
