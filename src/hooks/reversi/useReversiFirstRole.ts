"use client"

import { useState } from "react";
import { FirstState } from "@/types/reversi";

/**
 * Manage the selection state for the game's initial (first) player.
 *
 * @returns An object with:
 * - `firstRole` — the current first-player setting: `'random' | Role.BLACK | Role.WHITE'`.
 * - `setFirstRole` — a setter function to update the first-player setting.
 *
 * @remarks
 * The initial value is `'random'`, which indicates the first player will be chosen randomly.
 */
export default function useFirstRole() {
	const [firstRole, setFirstRole] = useState<FirstState>("random");

	return {
		firstRole,
		setFirstRole,
	};
}