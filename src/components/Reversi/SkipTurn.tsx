import { SkipTurnProps } from "@/types/reversi";

export default function SkipTurn({ isSkipTurn, currentTurn }: SkipTurnProps) {
	if (isSkipTurn) {
		return (
			<div className="absolute top-8 left-1/2 -translate-x-1/2 text-center text-2xl font-bold">
				{`${currentTurn === 'b' ? '白' : '黒'}は置けないため、${currentTurn === 'b' ? '黒' : '白'}のターンです。`}
			</div>
		)
	}
}
