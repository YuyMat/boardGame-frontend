import { SkipTurnProps } from "@/types/reversi";
import { Role } from "@/constants/reversi";

export default function SkipTurn({ isSkipTurn, currentRole }: SkipTurnProps) {
	if (isSkipTurn) {
		return (
			<div className="absolute top-8 left-1/2 -translate-x-1/2 text-center text-2xl font-bold">
				{`${currentRole === Role.BLACK ? '白' : '黒'}は置けないため、${currentRole === Role.BLACK ? '黒' : '白'}のターンです。`}
			</div>
		)
	}
}
