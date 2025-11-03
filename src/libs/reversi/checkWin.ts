import { Role } from "@/constants/reversi";
import { CheckWinProps } from "@/types/reversi";
import { computeHighlights } from "./computeHighlights";

export const checkWin = ({ currentRole, board, setHighlightedCells, setIsSkipTurn, setCurrentRole, setCanPlay }: CheckWinProps) => {
	setIsSkipTurn(false);
	// 現在のターンでの合法手
	const { highlights: currentHighlights, any: hasCurrentMove } = computeHighlights(board, currentRole);
	if (hasCurrentMove) {
		setHighlightedCells(currentHighlights);
		setIsSkipTurn(false);
		console.log("aaaaaa");
		return false;
	}

	// 現在置けない → 相手にパスできるか検査
	const nextTurn = currentRole === Role.BLACK ? Role.WHITE : Role.BLACK;
	const { highlights: nextHighlights, any: hasNextMove } = computeHighlights(board, nextTurn);
	if (hasNextMove) {
		setIsSkipTurn(true);
		setCurrentRole(nextTurn);
		setHighlightedCells(nextHighlights);
		console.log("bbbbbb");
		return false;
	}

	// 両者とも置けない → 終局
	setIsSkipTurn(false);
	setCanPlay(false);
	return true;
};
