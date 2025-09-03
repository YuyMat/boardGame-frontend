"use client"

import { useRouter } from "next/navigation";
import { BoardProps } from "@/types/connect4";
import Result from "./Result";
import TurnDisc from "./TurnDisc";

export default function Board({ board, onCellClick, isWin, setIsWin, onRestart, currentTurn }: BoardProps) {

	const router = useRouter();

	const handleCancel = () => {
		setIsWin(false);
	}

	const onShowGames = () => {
		setIsWin(false);
		router.push("/");
	};

	return (
		<div className="relative z-1">
			<Result isWin={isWin} onRestart={onRestart} handleCancel={handleCancel} onShowGames={onShowGames} currentTurn={currentTurn}/>

			<TurnDisc currentTurn={currentTurn} />
			<div className="flex flex-col items-center p-6">
				<div className="-translate-x-35">
					<h2 className="text-2xl font-bold mb-4 text-blue-800">Connect 4</h2>
				</div>
				{/* 盤面 */}
				<div className="bg-blue-600 p-4 rounded-lg shadow-lg">
					<div className="grid grid-cols-7 gap-2">
						{board.map((row, rowIndex) =>
							row.map((cell, colIndex) => (
								<div
									key={`${rowIndex}-${colIndex}`}
									className={`w-12 h-12 rounded-full border-2 border-blue-800 flex items-center justify-center cursor-pointer transition-colors ${cell === 'r' ? 'bg-red-500' :
										cell === 'y' ? 'bg-yellow-500' :
											'bg-white'
										}`}
									onClick={() => onCellClick(colIndex)}
								></div>
							))
						)}
					</div>
				</div>
				<div>
					{currentTurn === 'r' ? <p>🔴赤の番です🔴</p> : <p>🟡黄色の番です🟡</p>}
				</div>
			</div>
		</div>
	);
}
