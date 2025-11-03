import { Connect4, Role } from "@/constants/connect4";
import { CheckWinProps } from "@/types/connect4";

/**
 * Connect4ゲームで勝利条件を満たしているかをチェックします。
 * 縦、横、斜め（2方向）のすべての方向で4つ連続しているかを判定します。
 * 
 * @param params - 勝利判定に必要なパラメータ
 * @param params.lastPosition - 最後に石が置かれた位置（row, col）
 * @param params.currentRole - 現在のプレイヤーの色（Role.REDまたはRole.YELLOW）
 * @param params.board - 現在のゲーム盤面の状態
 * 
 * @returns 勝利条件を満たしている場合は`true`、そうでない場合は`false`
 * 
 * @remarks
 * - 最後に置かれた石を基準に判定を行います
 * - チェック対象は直前のプレイヤー（currentRoleの反対色）の石です
 */
export const checkWin = ({ lastPosition, currentRole, board }: CheckWinProps) => {
	const { row, col } = lastPosition;
	if (row === null || col === null)
		return false;
	const targetColor = currentRole === Role.RED ? Role.YELLOW : Role.RED;

	let count = 0;

	// 縦
	for (let i = 0; i < Connect4.ROWS; i++) {
		if (board[i][col] === targetColor) {
			count++;
		} else {
			count = 0;
		}
		if (count >= 4) return true;
	}

	// 横
	count = 0;
	for (let i = 0; i < Connect4.COLS; i++) {
		if (board[row][i] === targetColor) {
			count++;
		} else {
			count = 0;
		}
		if (count >= 4) return true;
	}

	// 斜め（左上→右下）
	count = 0;
	// 左上に移動
	let startRow = row;
	let startCol = col;
	while (startRow > 0 && startCol > 0) {
		startRow--;
		startCol--;
	}
	// 右下に向かってカウント
	while (startRow < Connect4.ROWS && startCol < Connect4.COLS) {
		if (board[startRow][startCol] === targetColor) {
			count++;
			if (count >= 4) return true;
		} else {
			count = 0;
		}
		startRow++;
		startCol++;
	}

	// 斜め（左下→右上）
	count = 0;
	// 左下に移動
	startRow = row;
	startCol = col;
	while (startRow < Connect4.ROWS - 1 && startCol > 0) {
		startRow++;
		startCol--;
	}
	// 右上に向かってカウント
	while (startRow >= 0 && startCol < Connect4.COLS) {
		if (board[startRow][startCol] === targetColor) {
			count++;
			if (count >= 4) return true;
		} else {
			count = 0;
		}
		startRow--;
		startCol++;
	}

	return false;
};
