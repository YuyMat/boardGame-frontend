import { CardStateBoard } from "@/types/memory";
import { CardState } from "@/constants/memory";

/**
 * 全てのカードが取り除かれたかどうか（ゲーム終了）を判定します。
 *
 * @param cardStateBoard - 現在のカード状態ボード
 * @returns 全てのカードがREMOVED状態であればtrue、そうでなければfalse
 */
export const checkFinished = (cardStateBoard: CardStateBoard) => {
	return cardStateBoard.flat().every((state) => state === CardState.REMOVED);
}
