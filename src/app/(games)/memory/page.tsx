"use client"

import { useState, useEffect, useRef } from "react";
import { CardBoard, CardStateBoard, OpenedCard, RoleState, Settings } from "@/types/memory";
import { Board, Result } from "@/components/Memory";
import { CardState, Role } from "@/constants/memory";
import { createInitialCardBoard } from "@/libs/memory/createInitialBoards";
import { createInitialCardStateBoard } from "@/libs/memory/createInitialBoards";
import closeModal from "@/utils/closeModal";
import useGotoTopPage from "@/hooks/utils/useGotoTopPage";
import { ReShowResult } from "@/components/Utils";

export default function Page() {
	const [settings, setSettings] = useState<Settings>({ cards: 8, firstRole: Role.BLUE });
	const [cardBoard, setCardBoard] = useState<CardBoard>(createInitialCardBoard(settings.cards));
	const [cardStateBoard, setCardStateBoard] = useState<CardStateBoard>(createInitialCardStateBoard(settings.cards));
	const [currentRole, setCurrentRole] = useState<RoleState>(settings.firstRole);
	const [scores, setScores] = useState({ [Role.BLUE]: 0, [Role.GREEN]: 0 });
	const [isChecking, setIsChecking] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [canPlay, setCanPlay] = useState(true);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const gotoTopPage = useGotoTopPage();

	const onCardClick = (rowIndex: number, colIndex: number) => {
		if (cardStateBoard[rowIndex][colIndex] === CardState.OPENED) return;
		if (cardStateBoard[rowIndex][colIndex] === CardState.REMOVED) return;
		if (!canPlay) return;
		if (isChecking) return;

		setCardStateBoard((prev) => {
			const next = prev.map((row) => [...row]);
			next[rowIndex][colIndex] = CardState.OPENED;
			return next;
		});
	}

	const findOpenedCards = () => {
		const opened: OpenedCard[] = [];
		cardStateBoard.forEach((row, rowIndex) => {
			row.forEach((state, colIndex) => {
				if (state === CardState.OPENED) {
					opened.push({ position: { row: rowIndex, col: colIndex }, url: cardBoard[rowIndex][colIndex] });
				}
			});
		});
		return opened;
	};

	const handleMatch = (first: OpenedCard, second: OpenedCard) => {
		setScores((prev) => ({ ...prev, [currentRole]: prev[currentRole] + 1 }));
		timeoutRef.current = setTimeout(() => {
			setCardStateBoard((prev) => {
				const next = prev.map((row) => [...row]);
				next[first.position.row][first.position.col] = CardState.REMOVED;
				next[second.position.row][second.position.col] = CardState.REMOVED;
				return next;
			});
			setIsChecking(false);
		}, 500);
	};

	const handleMismatch = (first: OpenedCard, second: OpenedCard) => {
		timeoutRef.current = setTimeout(() => {
			setCardStateBoard((prev) => {
				const next = prev.map((row) => [...row]);
				next[first.position.row][first.position.col] = CardState.CLOSED;
				next[second.position.row][second.position.col] = CardState.CLOSED;
				return next;
			});
			setCurrentRole((prev) => (prev === Role.BLUE ? Role.GREEN : Role.BLUE));
			setIsChecking(false);
		}, 1000);
	};

	const checkPair = () => {
		const openedCards = findOpenedCards();
		if (openedCards.length !== 2) return;

		setIsChecking(true);

		const [first, second] = openedCards;
		if (first.url === second.url) {
			handleMatch(first, second);
		} else {
			handleMismatch(first, second);
		}
	}

	const checkFinished = () => {
		return cardStateBoard.flat().every((state) => state === CardState.REMOVED);
	}

	useEffect(() => {
		checkPair();

		let timer: NodeJS.Timeout;
		if (checkFinished()) {
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

	const onRestart = () => {
		setCardBoard(createInitialCardBoard(settings.cards));
		setCardStateBoard(createInitialCardStateBoard(settings.cards));
		setCurrentRole(settings.firstRole);
		setScores({ [Role.BLUE]: 0, [Role.GREEN]: 0 });
		setIsFinished(false);
		setCanPlay(true);
	}

	return (
		<div className={`${currentRole === Role.BLUE ? 'bg-blue-200' : 'bg-green-200'} min-h-[calc(100vh-72px)] transition-colors duration-300 relative z-1`}>
			<Board cardBoard={cardBoard} cardStateBoard={cardStateBoard} onCardClick={onCardClick} cards={settings.cards} />
			<Result isFinished={isFinished} onRestart={onRestart} handleCancel={() => closeModal(setIsFinished)} onShowGames={() => gotoTopPage(setIsFinished)} scores={scores} />
			<ReShowResult openModal={isFinished} setOpenModal={setIsFinished} canPlay={canPlay} />
		</div>
	)
}
