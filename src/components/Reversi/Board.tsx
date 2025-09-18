"use client"

import { BoardProps } from "@/types/reversi";
import useGotoTopPage from "@/hooks/useGotoTopPage";
import closeModal from "@/utils/closeModal";

export default function Board({ board, highlightedCells, onCellClick, isWin, setIsWin, onRestart, currentTurn }: BoardProps) {
    const gotoTopPage = useGotoTopPage();

	return (
		<div className="relative z-1">
			{/* 結果モーダル（将来追加予定） */}
			{/* <Result isWin={isWin} onRestart={onRestart} handleCancel={() => closeModal(setIsWin)} onShowGames={() => gotoTopPage(setIsWin)} currentTurn={currentTurn} /> */}
			
			{/* ターン表示（将来追加予定） */}
			{/* <TurnDisc currentTurn={currentTurn} /> */}
			
			<div className="pt-2 pl-2">
				<h2 className="text-2xl font-bold text-green-800">オセロ</h2>
			</div>
			<div className="flex flex-col items-center p-6">
				{/* 盤面 */}
				<div className="bg-green-600 p-4 rounded-lg shadow-lg mt-2">
					<div className="grid grid-cols-8 gap-1">
						{board.map((row, rowIndex) =>
							row.map((cell, colIndex) => (
								<div
									key={`${rowIndex}-${colIndex}`}
									className={`w-10 h-10 border-2 border-green-800 flex items-center justify-center cursor-pointer transition-colors hover:bg-green-600 ${highlightedCells[rowIndex][colIndex] === 1 ? 'bg-green-500' : 'bg-green-700'}`}
									onClick={() => onCellClick(rowIndex, colIndex)}
								>
									{/* 石の表示 */}
									{cell && (
										<div 
											className={`w-9 h-9 rounded-full border-2 shadow-lg ${
												cell === 'b' 
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
				
				{/* ゲーム情報 */}
				<div className="mt-4 text-center">
					<p className="text-lg font-semibold">
						現在のターン: <span className={`${currentTurn === 'b' ? 'text-gray-900' : 'text-white'} font-bold`}>
							{currentTurn === 'b' ? '黒' : '白'}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
