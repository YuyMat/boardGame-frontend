import { CanTurnOverProps } from "@/types/reversi";

const directions = [
	{ row: -1, col: 0 },
	{ row: 1, col: 0 },
	{ row: 0, col: -1 },
	{ row: 0, col: 1 },
	{ row: -1, col: -1 },
	{ row: 1, col: 1 },
	{ row: -1, col: 1 },
	{ row: 1, col: -1 },
];

export function canTurnOver({ board, row, col, currentTurn }: CanTurnOverProps) {
	if (board[row][col] !== null)
		return false;
	
	const oppositeTurn = currentTurn === 'b' ? 'w' : 'b';
	
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
			if (currentCell === oppositeTurn)
				hasOppositeStone = true;
			else if (currentCell === currentTurn) {
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
