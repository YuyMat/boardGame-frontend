import { OnRestartProps } from "@/types/connect4";
import { createEmptyBoard } from "@/libs/connect4/createEmptyBoard";

export const onRestart = ({ setIsWin, setBoard, setCanPlay, setLastPosition }: OnRestartProps) => {
	setIsWin(false);
	setBoard(createEmptyBoard());
	setCanPlay(true);
	setLastPosition({ row: null, col: null });
}
