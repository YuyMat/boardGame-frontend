import { SkipTurnProps } from "@/types/reversi";
import { Role } from "@/constants/reversi";

/**
 * Display a message indicating which player must pass when a skip (pass) occurs in Othello.
 *
 * @param isSkipTurn - Whether a skip (pass) has occurred
 * @param currentRole - The player whose turn it currently is (`Role.BLACK` or `Role.WHITE`)
 * @returns A div element stating which color cannot place a piece and whose turn it is next, or nothing when no skip has occurred
 */
export default function SkipTurn({ isSkipTurn, currentRole }: SkipTurnProps) {
	if (isSkipTurn) {
		return (
			<div className="absolute top-8 left-1/2 -translate-x-1/2 text-center text-2xl font-bold">
				{`${currentRole === Role.BLACK ? '白' : '黒'}は置けないため、${currentRole === Role.BLACK ? '黒' : '白'}のターンです。`}
			</div>
		)
	}
}