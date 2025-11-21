import { BoardProps } from "@/types/memory";
import { CardState, Role } from "@/constants/memory";
import Image from "next/image";

export default function Board({ cardBoard, cardStateBoard, onCardClick, currentRole, cards }: BoardProps) {
	return (
		<div className={`${currentRole === Role.BLUE ? 'bg-blue-200' : 'bg-green-200'} min-h-[calc(100vh-72px)] transition-colors duration-300 relative z-1`}>
			<div className="flex flex-col items-center justify-center p-4 rounded-xl shadow-inner">
				<div
					className={`grid gap-4 grid-cols-4 ${cards <= 16 ? 'sm:grid-cols-4' : cards === 20 ? 'sm:grid-cols-5' : 'sm:grid-cols-6'}`}
				>
					{cardBoard.map((row, rowIndex) => (
						row.map((card, colIndex) => {
							const state = cardStateBoard[rowIndex][colIndex];
							const isClosed = state === CardState.CLOSED;
							const isRemoved = state === CardState.REMOVED;

							return (
								<div
									key={`${rowIndex}-${colIndex}`}
									onClick={() => onCardClick(rowIndex, colIndex)}
									className={`
								w-16 sm:w-20 flex items-center justify-center text-3xl sm:text-4xl
								rounded-lg shadow-md transition-all duration-300 cursor-pointer select-none
								${cards >= 20 ? 'h-[90px] sm:h-24' : 'h-24 sm:h-28'}
								${isClosed
											? 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 transform hover:-translate-y-1'
											: isRemoved
												? 'bg-gray-200 opacity-40 cursor-default shadow-none'
												: 'bg-white border-2 border-blue-400'}
							`}
								>
									<span className={`transition-opacity duration-300 ${isClosed ? 'opacity-0' : 'opacity-100'}`}>
										{!isClosed && <Image src={card} alt="card" width={cards === 24 ? 65 : 100} height={cards === 24 ? 65 : 100} />}
									</span>
								</div>
							);
						})
					))}
				</div>
			</div>
		</div>
	);
}
