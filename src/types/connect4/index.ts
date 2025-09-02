// セルの状態を表す型（'r' = 赤、'y' = 黄、null = 空）
export type CellState = 'r' | 'y' | null;

export type TurnState = 'r' | 'y';

// 盤面の状態を表す型
export type BoardState = CellState[][];

export type lastPositionState = {
	row: number;
	col: number;
};

// propsの型定義
export interface BoardProps {
	board: BoardState;
	onCellClick: (colIndex: number) => void;
	isWin: boolean;
	setIsWin: React.Dispatch<React.SetStateAction<boolean>>;
	onRestart: () => void;
	currentTurn: TurnState;
}

export interface ResultProps {
	isWin: boolean;
	onRestart: () => void;
	handleCancel: () => void;
	onShowGames: () => void;
	currentTurn: TurnState;
}
