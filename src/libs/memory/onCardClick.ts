import { OnCardClickProps } from "@/types/memory";
import { CardState } from "@/constants/memory";

/**
 * カードがクリックされた時の処理を実行します。
 * クリックが有効な場合（プレイ可能、チェック中でない、カードが裏向き）、
 * そのカードをOPENED（表向き）状態に変更します。
 *
 * @param props - クリック処理に必要なパラメータ
 * @param props.rowIndex - クリックされたカードの行インデックス
 * @param props.colIndex - クリックされたカードの列インデックス
 * @param props.cardStateBoard - 現在のカード状態ボード
 * @param props.setCardStateBoard - カード状態を更新するセッター関数
 * @param props.canPlay - プレイ可能かどうかのフラグ
 * @param props.isChecking - 現在ペアチェック中かどうかのフラグ
 */
export const onCardClick = ({
	rowIndex,
	colIndex,
	cardStateBoard,
	setCardStateBoard,
	canPlay,
	isChecking
}: OnCardClickProps) => {
	if (cardStateBoard[rowIndex][colIndex] === CardState.OPENED) return;
	if (cardStateBoard[rowIndex][colIndex] === CardState.REMOVED) return;
	if (!canPlay) return;
	if (isChecking) return;

	setCardStateBoard((prev) => {
		const next = prev.map((row) => [...row]);
		next[rowIndex][colIndex] = CardState.OPENED;
		return next;
	});
}
