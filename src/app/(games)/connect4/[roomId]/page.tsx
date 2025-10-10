"use client"

import { use } from "react";
import { Board, Loading, ShowTurn, RuleSettings, TemporaryWaiting, CopyUrl } from "@/components/Connect4";
import { Role } from "@/constants/connect4";
import styles from "@/styles/Utils.module.scss";

// カスタムフック
import useConnect4Room from "@/hooks/useConnect4Room";
import useConnect4Game from "@/hooks/useConnect4Game";
import useFirstRole from "@/hooks/useFirstRole";

export default function Page({ params }: { params: Promise<{ roomId: string }> }) {
	const { roomId } = use(params);

	// 先手設定
	const { firstRole, setFirstRole } = useFirstRole(roomId);

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
	} = useConnect4Game({
		socketRef,
		matchState,
		playerRole,
		firstRole,
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
					<Loading text="対線相手を待っています…" />
					<div className="flex flex-row gap-2 mt-7">
						<RuleSettings setFirst={setFirstRole} />
						<CopyUrl />
					</div>
				</div>
			</>
		);
	}

	if (matchState === "matched") {
		return (
			<div className="flex justify-center items-center min-h-[calc(100vh-72px)]">
				<Loading text="対線相手とマッチしました！" />
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
				onRestart={() => {
					// onRestart();
					emitRestart();
				}}
			/>
			<ShowTurn currentRole={currentRole} playerRole={playerRole} />
			<TemporaryWaiting members={members} />
		</div>
	);
}
