import { ShowRoleProps } from "@/types/connect4";
import { Role } from "@/constants/connect4";

/**
 * Display the current turn status for a Connect4 game to the player or a spectator.
 *
 * Shows a spectator message when `playerRole` is null, a "your turn" or "opponent's turn"
 * message when `canPlay` is true, and renders nothing when `canPlay` is false.
 *
 * @param props.currentRole - The role whose turn it currently is (`Role.RED` or `Role.YELLOW`)
 * @param props.playerRole - This player's role; `null` when spectating
 * @param props.canPlay - Whether the game is in a playable state
 *
 * @returns The JSX element displaying the turn or spectator message, or `undefined` when nothing should be shown
 */
export default function ShowTurn({ currentRole, playerRole, canPlay }: ShowRoleProps) {
	if (!playerRole) {
		return (
			<div className="absolute top-110 left-1/2 -translate-x-1/2 text-blue-800 font-bold whitespace-nowrap text-base sm:text-xl md:text-2xl">👀 観戦中 👀</div>
		);
	}

	const isMyTurn = currentRole === playerRole;
	const isRed = playerRole === Role.RED;

	if (canPlay) {
		return (
			<div className="absolute top-110 left-1/2 -translate-x-1/2 text-blue-800 font-bold whitespace-nowrap text-base sm:text-xl md:text-2xl">
				{isMyTurn ? (
					isRed ? <p>🔴 あなたの番です 🔴</p> : <p>🟡 あなたの番です 🟡</p>
				) : (
					isRed ? <p>🟡 相手の番です 🟡</p> : <p>🔴 相手の番です 🔴</p>
				)}
			</div>
		);
	}
}