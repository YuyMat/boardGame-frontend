import { CardState, MATCH_POINT } from "@/constants/memory";
import { HandleMatchProps } from "@/types/memory";

/**
 * カードがマッチした時の処理を実行します。
 * スコアを加算し、マッチしたカードを削除状態にします。
 *
 * @param props - マッチ処理に必要なパラメータ
 * @param props.first - 1枚目のカード情報
 * @param props.second - 2枚目のカード情報
 * @param props.currentRole - 現在のプレイヤー
 * @param props.timeoutRef - タイムアウト用のRefオブジェクト
 * @param props.setScores - スコアを更新するセッター関数
 * @param props.setCardStateBoard - カード状態を更新するセッター関数
 * @param props.setIsChecking - チェック中フラグを更新するセッター関数
 */
export const handleMatch = ({
	first,
	second,
	currentRole,
	timeoutRef,
	setScores,
	setCardStateBoard,
	setIsChecking,
}: HandleMatchProps) => {
	setScores((prev) => ({ ...prev, [currentRole]: prev[currentRole] + MATCH_POINT }));
	timeoutRef.current = setTimeout(() => {
		setCardStateBoard((prev) => {
			const next = prev.map((row) => [...row]);
			next[first.position.row][first.position.col] = CardState.REMOVED;
			next[second.position.row][second.position.col] = CardState.REMOVED;
			return next;
		});
		setIsChecking(false);
	}, 500);
};
