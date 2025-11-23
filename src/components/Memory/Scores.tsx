import { ScoresProps } from "@/types/memory";
import { Role } from "@/constants/memory";

export default function Scores({ scores, canPlay }: ScoresProps) {
	if (!canPlay) return;
	
	return (
		<div>
			<span className="text-2xl font-bold text-blue-800">{scores[Role.BLUE]}</span>
			<span className="text-2xl font-bold"> - </span>
			<span className="text-2xl font-bold text-green-800">{scores[Role.GREEN]}</span>
		</div>
	)
}
