"use client"

import { BoardProps } from "@/types/reversi";
import { Role } from "@/constants/reversi";

/**
 * オセロゲームの盤面を表示するメインボードコンポーネントです。
 * 8x8の盤面、石、合法手のハイライト、および直前に置かれた石の位置を表示します。
 * 
 * @param props - コンポーネントのProps
 * @param props.board - 現在の盤面の状態（8x8の2次元配列）
 * @param props.highlightedCells - 合法手がハイライトされているセルの2次元配列
 * @param props.onCellClick - セルをクリックした時のハンドラ関数
 * @param props.currentRole - 現在のターンのプレイヤー（`Role.BLACK` または `Role.WHITE`）
 * @param props.lastPosition - 直前に石を置いたセルの位置（行・列）。該当マスの枠線が強調表示されます
 * 
 * @remarks
 * - 8x8のオセロ盤面を表示します
 * - 合法手の位置は明るい緑色でハイライトされます
 * - 直前に石を置いたマスは枠線の色によって強調表示されます
 * - 黒石と白石が視覚的に区別されます
 * - 現在のターン情報も表示されます
 */
export default function Board({ board, highlightedCells, onCellClick, currentRole, lastPosition }: BoardProps) {
	return (
		<div className="relative z-1">
			<div className="pt-2 pl-2">
				<h2 className={`text-2xl font-bold ${currentRole === Role.BLACK ? 'text-green-500' : 'text-green-700'}`}>リバーシ</h2>
			</div>
			<div className="flex flex-col items-center p-6">
				{/* 盤面 */}
				<div className="bg-green-600 p-4 rounded-lg shadow-lg mt-2">
					<div className="grid grid-cols-8 gap-1">
						{board.map((row, rowIndex) =>
							row.map((cell, colIndex) => (
								<div
									key={`${rowIndex}-${colIndex}`}
									className={`w-10 h-10 border-2 flex items-center justify-center cursor-pointer transition-colors hover:bg-green-600
										${highlightedCells[rowIndex][colIndex] === true
											? 'bg-green-500'
											: 'bg-green-700'}
										${lastPosition.row === rowIndex && lastPosition.col === colIndex
											? 'border-green-200'
											: 'border-green-800'}
									`}
									onClick={() => onCellClick(rowIndex, colIndex)}
								>
									{/* 石の表示 */}
									{cell && (
										<div 
											className={`w-9 h-9 rounded-full border-2 shadow-lg ${
												cell === Role.BLACK 
													? 'bg-gray-900 border-gray-700' 
													: 'bg-white border-gray-300'
											}`}
										/>
									)}
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
