import { ShowRoleProps } from "@/types/connect4";
import { Role } from "@/constants/connect4";

export default function ShowTurn({ currentRole, playerRole }: ShowRoleProps) {
	if (!playerRole) {
		return (
			<div className="absolute top-110 left-1/2 -translate-x-1/2 text-blue-800 font-bold whitespace-nowrap text-base sm:text-xl md:text-2xl">👀 観戦中 👀</div>
		);
	}

	const isMyTurn = currentRole === playerRole;
	const isRed = playerRole === Role.RED;

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
