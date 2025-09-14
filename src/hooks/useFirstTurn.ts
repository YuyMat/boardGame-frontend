"use client"

import { useState } from "react";
import { FirstState } from "@/types/connect4";

export default function useFirstTurn() {
	const [firstTurn, setFirstTurn] = useState<FirstState>("random");

	return {
		firstTurn,
		setFirstTurn,
	};
}
