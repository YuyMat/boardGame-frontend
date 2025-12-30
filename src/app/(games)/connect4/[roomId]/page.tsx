"use client"

import { use } from "react";
import { Board, ShowTurn, Connect4RuleSettings } from "@/components/Connect4";
import { Loading, RuleSettings, CopyUrl, NewRoom, TemporaryWaiting, ReShowResult, PlayerCard, StartGame } from "@/components/Utils";
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
	const color = currentRole === Role.RED ? RED_BG_COLOR : YELLOW_BG_COLOR;
	useBodyBackgroundColor(color, matchState);

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

	if (matchState === "waiting" || matchState === "matched") {
		// ルームが満員の場合
		if (members > MAX_PLAYERS) {
			return (
				<>
					<div className="flex flex-col justify-center items-center h-[calc(100svh-72px)]">
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
				<div className="flex flex-col justify-center items-center h-[calc(100svh-72px)]">
					<div className="w-full max-w-md space-y-4 px-4">
						<PlayerCard
							playerRole={playerRole}
							cardRole={Role.RED}
							members={members}
							mainAvatarBGcolor={RED_BG_COLOR}
							subAvatarBGcolor={YELLOW_BG_COLOR}
						/>
						<PlayerCard
							playerRole={playerRole}
							cardRole={Role.YELLOW}
							members={members}
							mainAvatarBGcolor={RED_BG_COLOR}
							subAvatarBGcolor={YELLOW_BG_COLOR}
						/>
					</div>

					<div className="flex flex-col items-center">
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
								playerRole={playerRole}
							/>
							<CopyUrl gameName="コネクト４" />
						</div>
					</div>

					<div className="mt-2">
						<StartGame matchState={matchState} setMatchState={setMatchState} playerRole={playerRole} />
					</div>
				</div>
			</>
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
			<TemporaryWaiting matchState={matchState} members={members} />
			<ReShowResult openModal={isWin} setOpenModal={setIsWin} canPlay={canPlay} />
		</div>
	);
}
