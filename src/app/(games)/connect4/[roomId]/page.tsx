"use client"

import { use } from "react";
import { Board, ShowTurn, TemporaryWaiting, ReShowResult } from "@/components/Connect4";
import { Loading, RuleSettings, CopyUrl } from "@/components/Utils";
import { keyToShowLabel, firstTurnItems, Role, mainPlayerColorClass } from "@/constants/connect4";
import styles from "@/styles/Utils.module.scss";

// カスタムフック
import useConnect4Room from "@/hooks/connect4/useConnect4Room";
import useConnect4Game from "@/hooks/connect4/useConnect4Game";
import useFirstRole from "@/hooks/connect4/useConnect4FirstRole";

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
	} = useConnect4Room(roomId, setFirstRole, firstRole);

	// 盤面・手番・勝敗・同期
	const {
		board,
		isWin,
		setIsWin,
		onCellClick,
		lastPosition,
		canPlay,
	} = useConnect4Game({
		socketRef,
		matchState,
		playerRole,
		roomId,
		membersRef,
		setMatchState,
		currentRole,
		setCurrentRole,
	});

	if (matchState === "waiting") {
		return (
			<>
				<div className="flex flex-col justify-center items-center min-h-[calc(100vh-72px)]">
					<Loading text="対戦相手を待っています…" />
					<div className="flex flex-row gap-2 mt-7">
						<RuleSettings setFirst={setFirstRole} keyToShowLabel={keyToShowLabel} firstTurnItems={firstTurnItems} mainPlayerColorClass={mainPlayerColorClass} />
						<CopyUrl gameName="コネクト４" />
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
		<div className={`${currentRole === Role.RED ? 'bg-red-200' : 'bg-yellow-200'} min-h-[calc(100vh-72px)] transition-colors duration-300 relative z-1 ${styles.fadeIn}`}>
			<Board
				board={board}
				currentRole={currentRole}
				isWin={isWin}
				setIsWin={setIsWin}
				onCellClick={onCellClick}
				onRestart={emitRestart}
				lastPosition={lastPosition}
			/>
			<ShowTurn currentRole={currentRole} playerRole={playerRole} canPlay={canPlay} />
			<TemporaryWaiting members={members} />
			<ReShowResult isWin={isWin} setIsWin={setIsWin} canPlay={canPlay} />
		</div>
	);
}
