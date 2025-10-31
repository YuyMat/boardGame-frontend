import { CanTurnOverProps } from "@/types/reversi";
import { directions, Role } from "@/constants/reversi";

export function canTurnOver({ board, row, col, currentRole }: CanTurnOverProps) {
	if (board[row][col] !== null)
		return false;
	
	const oppositeRole = currentRole === Role.BLACK ? Role.WHITE : Role.BLACK;
	
	for (const { row: dRow, col: dCol } of directions) {
		let nextRow = row + dRow;
		let nextCol = col + dCol;
		let hasOppositeStone = false; // 各方向でリセット
		
		// この方向に相手の石があるかチェック
		while (nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8) {
			const currentCell = board[nextRow][nextCol];
			if (currentCell === null) {
				// 空のセルに到達したら、この方向では石をひっくり返せない
				break;
			}
			if (currentCell === oppositeRole)
				hasOppositeStone = true;
			else if (currentCell === currentRole) {
				if (hasOppositeStone)
					return true;
				break;
			}
			nextRow += dRow;
			nextCol += dCol;
		}
	}
	return false;
}
