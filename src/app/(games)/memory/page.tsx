"use client"

import { useState } from "react";
import { CardBoard, CardStateBoard, RoleState, Settings } from "@/types/memory";
import { Board } from "@/components/Memory";
import { CardState, Role } from "@/constants/memory";
import { createInitialCardBoard } from "@/libs/memory/createInitialBoards";
import { createInitialCardStateBoard } from "@/libs/memory/createInitialBoards";

export default function page() {
	const [settings, setSettings] = useState<Settings>({ cards: 20, firstRole: Role.BLUE });
	const [cardBoard, setCardBoard] = useState<CardBoard>(createInitialCardBoard(settings.cards));
	const [cardStateBoard, setCardStateBoard] = useState<CardStateBoard>(createInitialCardStateBoard(settings.cards));
	const [currentRole, setCurrentRole] = useState<RoleState>(settings.firstRole);

	const onCardClick = (rowIndex: number, colIndex: number) => {
		setCardStateBoard((prev) => {
			const next = prev.map((row) => [...row]);
			next[rowIndex][colIndex] = CardState.OPENED;
			return next;
		});
	}

	return (
		<Board cardBoard={cardBoard} cardStateBoard={cardStateBoard} onCardClick={onCardClick} currentRole={currentRole} cards={settings.cards} />
	)
}
