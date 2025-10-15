import { OnRestartProps } from "@/types/connect4";
import { Role } from "@/constants/connect4";
import { createEmptyBoard } from "@/libs/connect4/createEmptyBoard";

export const onRestart = ({ setIsWin, setBoard, setCurrentRole, setCanPlay, setLastPosition }: OnRestartProps) => {
	setIsWin(false);
	setBoard(createEmptyBoard());
	setCurrentRole(Role.RED);
	setCanPlay(true);
	setLastPosition({ row: null, col: null });
}
