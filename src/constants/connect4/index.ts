import { FirstState, ShowFirstState } from "@/types/connect4";

export class Connect4 {
	static ROWS = 6;
	static COLS = 7;
}

export const keyToShowLabel: Record<FirstState, ShowFirstState> = {
	random: "ランダム",
	r: "赤",
	y: "黄",
};

export const firstTurnItems = [
	{
		label: "ランダム(デフォルト)",
		key: "random",
	},
	{
		label: "赤",
		key: "r",
	},
	{
		label: "黄",
		key: "y",
	},
]
