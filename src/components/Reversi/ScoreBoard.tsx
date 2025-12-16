import { Role } from "@/constants/reversi";
import { RoleState } from "@/types/reversi";

type Props = {
	blackCount: number;
	whiteCount: number;
	currentRole: RoleState;
};

export default function ScoreBoard({ blackCount, whiteCount, currentRole }: Props) {
	return (
		<div className="flex justify-center gap-2 w-full max-w-[600px] mx-auto mb-6 px-4">
			{/* Black Player */}
			<div
				className={`flex-1 bg-white rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-lg transition-all duration-300 border-[3px] ${
					currentRole === Role.BLACK ? "border-blue-400 scale-105" : "border-transparent opacity-90"
				}`}
			>
				<div className="flex items-center gap-3 sm:gap-4">
					<div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black shadow-sm border border-gray-700 relative flex-shrink-0">
						<div className="absolute inset-0 rounded-full shadow-inner opacity-50"></div>
					</div>
					<span className="text-2xl sm:text-4xl font-bold text-gray-800 leading-none mt-1">{blackCount}</span>
				</div>
				{currentRole === Role.BLACK && (
					<div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-400 animate-pulse mr-1" />
				)}
			</div>

			{/* White Player */}
			<div
				className={`flex-1 bg-white rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-lg transition-all duration-300 border-[3px] ${
					currentRole === Role.WHITE ? "border-blue-400 scale-105" : "border-transparent opacity-90"
				}`}
			>
				<div className="flex items-center gap-3 sm:gap-4">
					<div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gray-50 shadow-sm border border-gray-200 relative flex-shrink-0">
						<div className="absolute inset-0 rounded-full shadow-inner opacity-20 bg-gray-200"></div>
					</div>
					<span className="text-2xl sm:text-4xl font-bold text-gray-800 leading-none mt-1">{whiteCount}</span>
				</div>
				{currentRole === Role.WHITE && (
					<div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-400 animate-pulse mr-1" />
				)}
			</div>
		</div>
	);
}
