"use client"

import { use } from "react";
import { Board, ShowTurn, Connect4RuleSettings } from "@/components/Connect4";
import { Loading, RuleSettings, CopyUrl, NewRoom, TemporaryWaiting, ReShowResult } from "@/components/Utils";
import { keyToShowLabel, firstTurnItems, Role, mainPlayerColorClass, MAX_PLAYERS, RED_BG_COLOR, YELLOW_BG_COLOR } from "@/constants/connect4";
import { RoleState } from "@/types/connect4";

// カスタムフック
import useConnect4Room from "@/hooks/connect4/useConnect4Room";
import useConnect4Game from "@/hooks/connect4/useConnect4Game";
import useFirstRole from "@/hooks/utils/useFirstRole";
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
	} = useConnect4Room(roomId, setFirstRole, firstRole);

	// bodyの背景色を動的に変更
	useBodyBackgroundColor(currentRole === Role.RED ? RED_BG_COLOR : YELLOW_BG_COLOR);

	// 盤面・手番・勝敗・同期
	const {
		board,
		isWin,
		setIsWin,
		onCellClick,
		lastPosition,
		canPlay,
		isDraw,
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
		// ルームが満員の場合
		if (members > MAX_PLAYERS) {
			return (
				<>
					<div className="flex flex-col justify-center items-center min-h-[calc(100vh-72px)]">
						<Loading text="ルームが満員です。再度ルームを作成してください。" />
						<div className="flex flex-row mt-7">
							<NewRoom gameName="connect4" />
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
								<Connect4RuleSettings
									setFirstRole={setFirstRole}
									keyToShowLabel={keyToShowLabel}
									firstTurnItems={firstTurnItems}
								/>
							}
						/>
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
		<div className="relative">
			<Board
				board={board}
				currentRole={currentRole}
				isWin={isWin}
				isDraw={isDraw}
				setIsWin={setIsWin}
				onCellClick={onCellClick}
				onRestart={emitRestart}
				lastPosition={lastPosition}
				playerRole={playerRole}
			/>
			<ShowTurn currentRole={currentRole} playerRole={playerRole} canPlay={canPlay} />
			<TemporaryWaiting members={members} />
			<ReShowResult openModal={isWin} setOpenModal={setIsWin} canPlay={canPlay} />
		</div>
	);
}
