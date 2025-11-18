import { Role } from "@/constants/reversi";
import { RoleState } from "@/types/reversi";

interface TurnInfoProps {
	currentRole: RoleState;
}

export default function TurnInfo({ currentRole }: TurnInfoProps) {
	return (
		<div className="text-center">
			<p className="text-xl font-bold">
				現在のターン: <span className="font-bold">
					{currentRole === Role.BLACK ? '⚫️' : '⚪️'}
				</span>
			</p>
		</div>
	);
}
