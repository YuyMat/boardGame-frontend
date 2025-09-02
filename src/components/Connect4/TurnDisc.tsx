import { TurnState } from "@/types/connect4";

export default function TurnDisc({ currentTurn }: { currentTurn: TurnState }) {
	return (
		<div
			className={`absolute left-1/2 -translate-x-1/2 top-8 w-12 h-12 rounded-full flex items-center justify-center transition-colors -z-1 
			${currentTurn === 'r'
					? 'bg-red-500'
					: 'bg-yellow-500'
				}`}
		>
		</div >
	)
}
