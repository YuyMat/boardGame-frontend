"use client"

import { use } from "react";
import { Loading, RuleSettings, CopyUrl, NewRoom } from "@/components/Utils";
import { keyToShowLabel, firstTurnItems, Role, mainPlayerColorClass, MAX_PLAYERS } from "@/constants/reversi";
import { Board, Result, SkipTurn } from "@/components/Reversi";
import closeModal from "@/utils/closeModal";
// カスタムフック
import useReversiRoom from "@/hooks/reversi/useReversiRoom";
import useReversiGame from "@/hooks/reversi/useReversiGame";
import useFirstRole from "@/hooks/reversi/useReversiFirstRole";
import useGotoTopPage from "@/hooks/utils/useGotoTopPage";

export default function Page({ params }: { params: Promise<{ roomId: string }> }) {
	const { roomId } = use(params);

	// 先手設定
	const { firstRole, setFirstRole } = useFirstRole();

	// ルーム接続・メンバー/ロール・マッチ状態管理
	const {
		socketRef,
		members,
		playerRole,
		matchState,
		setMatchState,
		membersRef,
		emitRestart,
		currentRole,
		setCurrentRole,
	} = useReversiRoom(roomId, setFirstRole, firstRole);

	// 盤面・手番・勝敗・同期
	const {
		board,
		isWin,
		setIsWin,
		onCellClick,
		lastPosition,
		canPlay,
		blackCount,
		whiteCount,
		isSkipTurn,
		highlightedCells,
	} = useReversiGame({
		socketRef,
		matchState,
		playerRole,
		roomId,
		membersRef,
		setMatchState,
		currentRole,
		setCurrentRole,
	});

	const gotoTopPage = useGotoTopPage();

	if (matchState === "waiting") {
		// ルームが満員の場合
		if (members > MAX_PLAYERS) {
			return (
				<>
					<div className="flex flex-col justify-center items-center min-h-[calc(100vh-72px)]">
						<Loading text="ルームが満員です。再度ルームを作成してください。" />
						<div className="flex flex-row mt-7">
							<NewRoom gameName="reversi" />
						</div>
					</div>
				</>
			);
		}
		// ルームが空いている場合
		return (
			<>
				<div className="flex flex-col justify-center items-center min-h-[calc(100vh-72px)]">
					<Loading text="対戦相手を待っています…" />
					<div className="flex flex-row gap-2 mt-7">
						<RuleSettings setFirst={setFirstRole} keyToShowLabel={keyToShowLabel} firstTurnItems={firstTurnItems} mainPlayerColorClass={mainPlayerColorClass} />
						<CopyUrl gameName="リバーシ" />
					</div>
				</div>
			</>
		);
	}

	if (matchState === "matched") {
		return (
			<div className="flex justify-center items-center min-h-[calc(100vh-72px)]">
				<Loading text="対戦相手とマッチしました！" />
			</div>
		);
	}

	// playing
	return (
		<div className={`${currentRole === Role.BLACK ? 'bg-gray-500' : 'bg-gray-100'} min-h-[calc(100vh-72px)] transition-colors duration-300 relative z-1`}>
			<Result isOpen={isWin} onRestart={emitRestart} handleCancel={() => closeModal(setIsWin)} onShowGames={() => gotoTopPage(setIsWin)} blackCount={blackCount.current} whiteCount={whiteCount.current} />
			<SkipTurn isSkipTurn={isSkipTurn} currentRole={currentRole} />
			<Board
				board={board}
				highlightedCells={highlightedCells}
				currentRole={currentRole}
				onCellClick={onCellClick}
			/>
		</div>
	)
}
