"use client"

import { use } from "react";
import { Loading, RuleSettings, CopyUrl, NewRoom, TemporaryWaiting, ReShowResult, Result } from "@/components/Utils";
import { keyToShowLabel, Role, mainPlayerColorClass, MAX_PLAYERS, firstTurnItems, BLACK_BG_COLOR, WHITE_BG_COLOR } from "@/constants/reversi";
import { Board, SkipTurn, ShowTurn, ReversiRuleSettings, ReversiScoreBoard } from "@/components/Reversi";
import closeModal from "@/utils/closeModal";
import { RoleState } from "@/types/reversi";

// カスタムフック
import useReversiRoom from "@/hooks/reversi/useReversiRoom";
import useReversiGame from "@/hooks/reversi/useReversiGame";
import useFirstRole from "@/hooks/utils/useFirstRole";
import useGotoTopPage from "@/hooks/utils/useGotoTopPage";
import { useBodyBackgroundColor } from "@/hooks/utils/useBodyBackgroundColor";

export default function Page({ params }: { params: Promise<{ roomId: string }> }) {
	const { roomId } = use(params);

	// 先手設定
	const { firstRole, setFirstRole } = useFirstRole<RoleState>() ;

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

	// bodyの背景色を動的に変更
	const color = currentRole === Role.BLACK ? BLACK_BG_COLOR : WHITE_BG_COLOR;
	useBodyBackgroundColor(color, matchState);

	// 盤面・手番・勝敗・同期
	const {
		board,
		isWin,
		setIsWin,
		onCellClick,
		lastPosition,
		blackCount,
		whiteCount,
		isSkipTurn,
		highlightedCells,
		canPlay,
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
						<RuleSettings
							keyToShowLabel={keyToShowLabel}
							mainPlayerColorClass={mainPlayerColorClass}
							settingsComponents={
								<ReversiRuleSettings
								setFirstRole={setFirstRole}
								keyToShowLabel={keyToShowLabel}
								firstTurnItems={firstTurnItems}
								/>
							}
						/>
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
		<div className="relative">
			<Result playerRole={playerRole} isOpen={isWin} onRestart={emitRestart} handleCancel={() => closeModal(setIsWin)} onShowGames={() => gotoTopPage(setIsWin)} mainScore={blackCount.current} subScore={whiteCount.current} mainRole={'黒'} subRole={'白'} />
			<ReversiScoreBoard blackCount={blackCount.current} whiteCount={whiteCount.current} currentRole={currentRole} />
			<Board
				board={board}
				highlightedCells={highlightedCells}
				onCellClick={onCellClick}
				lastPosition={lastPosition}
			/>
			<ShowTurn currentRole={currentRole} playerRole={playerRole} canPlay={canPlay} />
			<SkipTurn isSkipTurn={isSkipTurn} currentRole={currentRole} />
			<TemporaryWaiting members={members} />
			<ReShowResult openModal={isWin} setOpenModal={setIsWin} canPlay={canPlay} />
		</div>
	)
}
