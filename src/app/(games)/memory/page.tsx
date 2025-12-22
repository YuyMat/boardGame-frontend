"use client"

import { useState, useEffect, useRef } from "react";
import { CardBoard, CardStateBoard, RoleState, Settings, ScoresState } from "@/types/memory";
import { Board, Scores, MemoryRuleSettings } from "@/components/Memory";
import { Role, keyToShowLabel, mainPlayerColorClass, defaultTotalCards, BLUE_BG_COLOR, GREEN_BG_COLOR } from "@/constants/memory";
import { createInitialCardBoard, checkFinished, createInitialCardStateBoard, onRestart, onCardClick, checkPair } from "@/libs/memory";
import closeModal from "@/utils/closeModal";
import useGotoTopPage from "@/hooks/utils/useGotoTopPage";
import { ReShowResult, TurnInfo, Result, RuleSettings } from "@/components/Utils";
import { useBodyBackgroundColor } from "@/hooks/utils/useBodyBackgroundColor";

export default function Page() {
	const [settings, setSettings] = useState<Settings>({ cards: defaultTotalCards, firstRole: Role.BLUE, haveRuleSettings: false });
	const [cardBoard, setCardBoard] = useState<CardBoard>(createInitialCardBoard(settings.cards));
	const [cardStateBoard, setCardStateBoard] = useState<CardStateBoard>(createInitialCardStateBoard(settings.cards));
	const [currentRole, setCurrentRole] = useState<RoleState>(settings.firstRole);
	const [scores, setScores] = useState<ScoresState>({ [Role.BLUE]: 0, [Role.GREEN]: 0 });
	const [isChecking, setIsChecking] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [canPlay, setCanPlay] = useState(true);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const localPlayerRole = Role.BLUE;

	// bodyの背景色を動的に変更
	const color = currentRole === Role.BLUE ? BLUE_BG_COLOR : GREEN_BG_COLOR;
	useBodyBackgroundColor(color);

	const gotoTopPage = useGotoTopPage();

	// 判定処理
	useEffect(() => {
		checkPair({
			cardStateBoard,
			cardBoard,
			currentRole,
			timeoutRef,
			setIsChecking,
			setScores,
			setCardStateBoard,
			setCurrentRole,
		});

		let timer: NodeJS.Timeout;
		if (checkFinished(cardStateBoard)) {
			setCanPlay(false);
			timer = setTimeout(() => {
				setIsFinished(true);
			}, 200);
		}

		return () => {
			if (timer) clearTimeout(timer);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [cardStateBoard])

	// カードの初期化
	useEffect(() => {
		setCardBoard(createInitialCardBoard(settings.cards));
		setCardStateBoard(createInitialCardStateBoard(settings.cards));
	}, [settings.cards])

	if (!settings.haveRuleSettings) {
		return (
			<div className="flex justify-center items-center min-h-[calc(100svh-72px)]">
				<RuleSettings keyToShowLabel={keyToShowLabel} mainPlayerColorClass={mainPlayerColorClass} settingsComponents={<MemoryRuleSettings cards={settings.cards} setSettings={setSettings} />} />
			</div>
		)
	}
	
	return (
		<div className="relative">
			<Board
				cardBoard={cardBoard}
				cardStateBoard={cardStateBoard}
				onCardClick={(rowIndex, colIndex) => onCardClick({
					rowIndex,
					colIndex,
					cardStateBoard,
					setCardStateBoard,
					canPlay,
					isChecking
				})}
				cards={settings.cards}
			/>
			<Result
				playerRole={localPlayerRole}
				isOpen={isFinished}
				onRestart={() => onRestart({
					setCardBoard,
					setCardStateBoard,
					setCurrentRole,
					setScores,
					setIsFinished,
					setCanPlay,
					settings
				})}
				handleCancel={() => closeModal(setIsFinished)}
				onShowGames={() => gotoTopPage(setIsFinished)}
				mainScore={scores[Role.BLUE]}
				subScore={scores[Role.GREEN]}
				mainRole={'青'}
				subRole={'緑'}
			/>
			<ReShowResult openModal={isFinished} setOpenModal={setIsFinished} canPlay={canPlay} />
			<div className="flex flex-row items-center justify-center gap-10">
				<TurnInfo
					currentRole={currentRole}
					canPlay={canPlay}
					mainRole={'青'}
					subRole={'緑'}
					mainRoleColorClass={'text-blue-800'}
					subRoleColorClass={'text-green-800'}
				/>
				<Scores scores={scores} canPlay={canPlay} />
			</div>
		</div>
	)
}
