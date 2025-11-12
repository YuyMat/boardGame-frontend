"use client"

import { BoardProps } from "@/types/connect4";
import Result from "./Result";
import TurnDisc from "./TurnDisc";
import useGotoTopPage from "@/hooks/utils/useGotoTopPage";
import { Role } from "@/constants/connect4";
import closeModal from "@/utils/closeModal";

/**
 * Connect4ゲームの盤面全体を表示するメインコンポーネントです。
 * ボード、結果モーダル、ターン表示ディスクを含みます。
 * 
 * @param props - コンポーネントのProps
 * @param props.board - 現在の盤面の状態
 * @param props.onCellClick - セルをクリックした時のハンドラ関数
 * @param props.isWin - 勝敗が決定したかどうか
 * @param props.isDraw - 引き分けかどうか
 * @param props.setIsWin - 勝敗フラグを更新するセッター関数
 * @param props.onRestart - リスタートボタンがクリックされた時のハンドラ関数
 * @param props.currentRole - 現在のターンのプレイヤー
 * @param props.lastPosition - 最後に石が置かれた位置
 * 
 * @remarks
 * - 6行7列のConnect4ボードを表示します
 * - 最後に置かれた石は緑色のボーダーでハイライトされます
 * - ゲーム終了時に結果モーダルを表示します
 */
export default function Board({ board, onCellClick, isWin, isDraw, setIsWin, onRestart, currentRole, lastPosition }: BoardProps) {
    const gotoTopPage = useGotoTopPage();

	return (
		<div className="relative z-1">
			<Result isWin={isWin} isDraw={isDraw} onRestart={onRestart} handleCancel={() => closeModal(setIsWin)} onShowGames={() => gotoTopPage(setIsWin)} currentRole={currentRole} />
			<TurnDisc currentRole={currentRole} />
			<div className="pt-2 pl-2">
				<h2 className="text-2xl font-bold text-blue-800">Connect 4</h2>
			</div>
			<div className="flex flex-col items-center p-6">
				{/* 盤面 */}
				<div className="bg-blue-600 p-4 rounded-lg shadow-lg mt-2">
					<div className="grid grid-cols-7 gap-2">
						{board.map((row, rowIndex) =>
							row.map((cell, colIndex) => (
								<div
									key={`${rowIndex}-${colIndex}`}
									className={`w-12 h-12 rounded-full border-2 border-blue-800 flex items-center justify-center cursor-pointer transition-colors
										${cell === Role.RED
											? 'bg-red-500'
											: cell === Role.YELLOW
												? 'bg-yellow-500'
												: 'bg-white'
										}
										${lastPosition.row === rowIndex && lastPosition.col === colIndex
											? 'border-4 border-green-500'
											: ''
										}
										`}
									onClick={() => onCellClick(colIndex)}
								></div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
