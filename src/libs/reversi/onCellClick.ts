import { OnCellClickProps } from "@/types/reversi";
import { Role } from "@/constants/reversi";
import { reverseStones } from "./reverseStones";

/**
 * オセロゲームでセルがクリックされたときの処理を実行します。
 * 指定された位置に石を置き、挟まれた相手の石をひっくり返し、ターンを切り替えます。
 * 
 * @param params - セルクリック処理に必要なパラメータ
 * @param params.rowIndex - クリックされた行のインデックス（0〜7）
 * @param params.colIndex - クリックされた列のインデックス（0〜7）
 * @param params.canPlay - プレイ可能な状態かどうかのフラグ
 * @param params.currentRole - 現在のプレイヤーの色（Role.BLACKまたはRole.WHITE）
 * @param params.setCurrentRole - 現在のロールを更新するセッター関数
 * @param params.setLastPosition - 最後の位置を更新するセッター関数
 * @param params.setBoard - ボードの状態を更新するセッター関数
 * @param params.highlightedCells - 合法手がハイライトされているセルの配列
 * 
 * @remarks
 * - ハイライトされていない位置（合法手でない位置）はクリックしても何も起こりません
 * - プレイ不可能な状態（`canPlay=false`）の場合は何もしません
 * - 石を置いた後、相手の石を自動的にひっくり返し、ターンが切り替わります
 */
export const onCellClick = ({ rowIndex, colIndex, canPlay, currentRole, setCurrentRole, setLastPosition, setBoard, highlightedCells }: OnCellClickProps) => {	
	setBoard((prev) => {
		if (!canPlay || highlightedCells[rowIndex][colIndex] !== true)
			return prev;

		const next = prev.map((row) => [...row]);
		next[rowIndex][colIndex] = currentRole;
		reverseStones({
			board: next,
			lastPosition: { row: rowIndex, col: colIndex },
			currentRole
		});
		setCurrentRole(currentRole === Role.BLACK ? Role.WHITE : Role.BLACK);
		setLastPosition({ row: rowIndex, col: colIndex });
		return next;
	});
};
