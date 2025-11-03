import { OnCellClickProps } from "@/types/connect4";
import { Role } from "@/constants/connect4";

/**
 * Connect4ゲームで列がクリックされたときの処理を実行します。
 * 指定された列の最下段の空きセルに石を落とし、ターンを切り替えます。
 * 
 * @param params - セルクリック処理に必要なパラメータ
 * @param params.colIndex - クリックされた列のインデックス（0〜6）
 * @param params.canPlay - プレイ可能な状態かどうかのフラグ
 * @param params.currentRole - 現在のプレイヤーの色（Role.REDまたはRole.YELLOW）
 * @param params.setCurrentRole - 現在のロールを更新するセッター関数
 * @param params.setLastPosition - 最後の位置を更新するセッター関数
 * @param params.setBoard - ボードの状態を更新するセッター関数
 * 
 * @remarks
 * - 列がすでに満杯の場合は何もしません
 * - プレイ不可能な状態（`canPlay=false`）の場合は何もしません
 * - 石を置いた後、自動的にターンが切り替わります
 */
export const onCellClick = ({ colIndex, canPlay, currentRole, setCurrentRole, setLastPosition, setBoard }: OnCellClickProps) => {
	setBoard((prev) => {
		let targetRow = prev.length - 1;
		while (targetRow >= 0 && prev[targetRow][colIndex] !== null) {
			targetRow--;
		}
		if (targetRow < 0) return prev;
		if (!canPlay) return prev;

		const next = prev.map((row) => [...row]);
		next[targetRow][colIndex] = currentRole;
		setCurrentRole(currentRole === Role.RED ? Role.YELLOW : Role.RED);
		setLastPosition({ row: targetRow, col: colIndex });
		return next;
	});
};
