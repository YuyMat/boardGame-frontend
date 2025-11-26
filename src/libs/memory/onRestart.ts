import { createInitialCardBoard, createInitialCardStateBoard } from "@/libs/memory";
import { OnRestartProps } from "@/types/memory";
import { Role } from "@/constants/memory";

export const onRestart = ({ setCardBoard, setCardStateBoard, setCurrentRole, setScores, setIsFinished, setCanPlay, settings }: OnRestartProps) => {
	setCardBoard(createInitialCardBoard(settings.cards));
	setCardStateBoard(createInitialCardStateBoard(settings.cards));
	setCurrentRole(settings.firstRole);
	setScores({ [Role.BLUE]: 0, [Role.GREEN]: 0 });
	setIsFinished(false);
	setCanPlay(true);
}
