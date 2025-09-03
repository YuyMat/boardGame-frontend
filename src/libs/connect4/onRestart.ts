import { OnRestartProps } from "@/types/connect4";
import { createEmptyBoard } from "@/libs/connect4/createEmptyBoard";

export const onRestart = ({ setIsWin, setBoard, setCurrentTurn, setCanPlay }: OnRestartProps) => {
	setIsWin(false);
	setBoard(createEmptyBoard());
	setCurrentTurn('r');
	setCanPlay(true);
}