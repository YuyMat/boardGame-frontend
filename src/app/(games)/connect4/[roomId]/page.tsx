"use client"

import { use } from "react";
import { Board, Loading, ShowTurn, RuleSettings, TemporaryWaiting } from "@/components/Connect4";
import styles from "@/styles/Utils.module.scss";

// カスタムフック
import useConnect4Room from "@/hooks/useConnect4Room";
import useConnect4Game from "@/hooks/useConnect4Game";
import useFirstTurn from "@/hooks/useFirstTurn";

export default function Page({ params }: { params: Promise<{ roomId: string }> }) {
	const { roomId } = use(params);

	// 先手設定
	const { firstTurn, setFirstTurn } = useFirstTurn();

	// ルーム接続・メンバー/ロール・マッチ状態管理
	const {
		socketRef,
		members,
		playerRole,
		matchState,
		setMatchState,
		membersRef,
		emitRestart,
	} = useConnect4Room(roomId);

	// 盤面・手番・勝敗・同期
	const {
		board,
		currentTurn,
		isWin,
		setIsWin,
		onCellClick,
		onRestart,
	} = useConnect4Game({
		socketRef,
		matchState,
		playerRole,
		firstTurn,
		roomId,
		membersRef,
		setMatchState,
	});

	if (matchState === "waiting") {
		return (
			<>
				<div className="flex flex-col justify-center items-center min-h-[calc(100vh-72px)]">
					<Loading text="対線相手を待っています…" />
					<div className="mt-7">
						<RuleSettings setFirst={setFirstTurn} />
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
		<div className={`${currentTurn === 'r' ? 'bg-red-200' : 'bg-yellow-200'} min-h-[calc(100vh-72px)] transition-colors duration-300 relative z-1 ${styles.fadeIn}`}>
			<Board
				board={board}
				currentTurn={currentTurn}
				isWin={isWin}
				setIsWin={setIsWin}
				onCellClick={onCellClick}
				onRestart={() => {
					onRestart();
					emitRestart();
				}}
			/>
			<ShowTurn currentTurn={currentTurn} playerRole={playerRole} />
			<TemporaryWaiting members={members} />
		</div>
	);
}
