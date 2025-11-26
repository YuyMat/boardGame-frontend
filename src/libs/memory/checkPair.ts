import { CheckPairProps } from "@/types/memory";
import { findOpenedCards } from "./findOpenedCards";
import { handleMatch } from "./handleMatch";
import { handleMismatch } from "./handleMismatch";

/**
 * 開いている2枚のカードがペアかどうかをチェックします。
 * ペアの場合はhandleMatch、そうでない場合はhandleMismatchを実行します。
 *
 * @param props - ペアチェックに必要なパラメータ
 * @param props.cardStateBoard - カード状態のボード
 * @param props.cardBoard - カードURLのボード
 * @param props.currentRole - 現在のプレイヤー
 * @param props.timeoutRef - タイムアウト用のRefオブジェクト
 * @param props.setIsChecking - チェック中フラグを更新するセッター関数
 * @param props.setScores - スコアを更新するセッター関数
 * @param props.setCardStateBoard - カード状態を更新するセッター関数
 * @param props.setCurrentRole - 現在のロールを更新するセッター関数
 */
export const checkPair = ({
	cardStateBoard,
	cardBoard,
	currentRole,
	timeoutRef,
	setIsChecking,
	setScores,
	setCardStateBoard,
	setCurrentRole,
}: CheckPairProps) => {
	const openedCards = findOpenedCards(cardStateBoard, cardBoard);
	if (openedCards.length !== 2) return;

	setIsChecking(true);

	const [first, second] = openedCards;
	if (first.url === second.url) {
		handleMatch({
			first,
			second,
			currentRole,
			timeoutRef,
			setScores,
			setCardStateBoard,
			setIsChecking,
		});
	} else {
		handleMismatch({
			first,
			second,
			timeoutRef,
			setCardStateBoard,
			setCurrentRole,
			setIsChecking,
		});
	}
};
