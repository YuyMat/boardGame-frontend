import { CardStateBoard } from "@/types/memory";
import { CardState } from "@/constants/memory";

export const checkFinished = (cardStateBoard: CardStateBoard) => {
	return cardStateBoard.flat().every((state) => state === CardState.REMOVED);
}
