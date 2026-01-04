import { Role } from "@/constants/reversi";
import { ReversiScoreBoardProps } from "@/types/reversi";

/**
 * リバーシのスコアボードを表示するコンポーネント
 * 
 * 黒と白の現在の石の数を表示し、現在の手番のプレイヤーを強調表示します。
 * 
 * @param props - コンポーネントのProps
 * @param props.blackCount - 黒の石の数
 * @param props.whiteCount - 白の石の数
 * @param props.currentRole - 現在の手番のプレイヤー
 * @param props.playerRole - プレイヤーのロール
 */
export default function ReversiScoreBoard({ blackCount, whiteCount, currentRole, playerRole }: ReversiScoreBoardProps) {
	return (
		<div className="flex justify-center gap-2 w-full max-w-[450px] mx-auto mt-30 px-10">
			{/* Black Player */}
			<div
				className={`flex-1 bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm transition-all duration-300 border-[3px] ${
					currentRole === Role.BLACK ? "border-blue-400 scale-105" : "border-transparent opacity-90"
				}`}
			>
				<div className="flex items-center gap-3">
					<div className="w-7 h-7 rounded-full bg-linear-to-br from-slate-700 via-slate-900 to-black shadow-[0_8px_32px_rgba(0,0,0,0.8),inset_0_2px_8px_rgba(255,255,255,0.1)] border border-white/10">
					</div>
					<span className="text-2xl font-bold text-gray-800 leading-none mt-1">{blackCount}</span>
					{playerRole === Role.BLACK && <div className="ml-5 text-gray-500">あなた</div>}
				</div>
				{currentRole === Role.BLACK && (
					<div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse mr-1" />
				)}
			</div>

			{/* White Player */}
			<div
				className={`flex-1 bg-white rounded-2xl p-3 flex items-center shadow-sm transition-all duration-300 border-[3px] ${
					currentRole === Role.WHITE ? "border-blue-400 scale-105" : "border-transparent opacity-90"
				}
				${currentRole === Role.WHITE ? "justify-between" : "justify-end"}
				`}
			>
				{currentRole === Role.WHITE && (
					<div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-400 animate-pulse ml-1" />
				)}
				<div className="flex items-center gap-3">
					{playerRole === Role.WHITE && <div className="mr-5 text-gray-500">あなた</div>}
					<span className="text-2xl font-bold text-gray-800 leading-none mt-1">{whiteCount}</span>
					<div className="w-7 h-7 rounded-full bg-linear-to-br from-white via-gray-100 to-gray-200 shadow-[0_8px_32px_rgba(255,255,255,0.4),inset_0_-2px_8px_rgba(0,0,0,0.1)] border border-white/30">
					</div>
				</div>
			</div>
		</div>
	);
}
