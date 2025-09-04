import { ShowTurnProps, TurnState } from "@/types/connect4";

export function ShowColor({ playerRole }: { playerRole: TurnState | null }) {
	if (playerRole === 'r') {
		return <div className="absolute top-10 left-1/2 translate-x-10 text-blue-800 font-bold">🔴 あなたは<span className="text-red-500">赤</span>です 🔴</div>
	}
	if (playerRole === 'y') {
		return <div className="absolute top-10 left-1/2 translate-x-10 text-blue-800 font-bold">🟡 あなたは<span className="text-yellow-700">黄色</span>です 🟡</div>
	}
	return null;
}

export function ShowTurn({ currentTurn, playerRole }: ShowTurnProps) {
	if (!playerRole) {
		return (
			<div className="absolute top-110 left-1/2 -translate-x-1/2 text-blue-800 text-2xl font-bold">👀 観戦中 👀</div>
		);
	}

	const isMyTurn = currentTurn === playerRole;
	const isRed = playerRole === 'r';

	return (
		<div className="absolute top-110 left-1/2 -translate-x-1/2 text-blue-800 text-2xl font-bold">
			{isMyTurn ? (
				isRed ? <p>🔴 あなたの番です 🔴</p> : <p>🟡 あなたの番です 🟡</p>
			) : (
				isRed ? <p>🟡 相手の番です 🟡</p> : <p>🔴 相手の番です 🔴</p>
			)}
		</div>
	);
}
