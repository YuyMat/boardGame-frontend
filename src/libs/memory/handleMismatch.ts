import { CardState, Role } from "@/constants/memory";
import { HandleMismatchProps } from "@/types/memory";

/**
 * カードがマッチしなかった時の処理を実行します。
 * カードを閉じた状態に戻し、ターンを切り替えます。
 *
 * @param props - ミスマッチ処理に必要なパラメータ
 * @param props.first - 1枚目のカード情報
 * @param props.second - 2枚目のカード情報
 * @param props.timeoutRef - タイムアウト用のRefオブジェクト
 * @param props.setCardStateBoard - カード状態を更新するセッター関数
 * @param props.setCurrentRole - 現在のロールを更新するセッター関数
 * @param props.setIsChecking - チェック中フラグを更新するセッター関数
 */
export const handleMismatch = ({
	first,
	second,
	timeoutRef,
	setCardStateBoard,
	setCurrentRole,
	setIsChecking,
}: HandleMismatchProps) => {
	timeoutRef.current = setTimeout(() => {
		setCardStateBoard((prev) => {
			const next = prev.map((row) => [...row]);
			next[first.position.row][first.position.col] = CardState.CLOSED;
			next[second.position.row][second.position.col] = CardState.CLOSED;
			return next;
		});
		setCurrentRole((prev) => (prev === Role.BLUE ? Role.GREEN : Role.BLUE));
		setIsChecking(false);
	}, 1000);
};
