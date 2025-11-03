"use client"

import { useState } from "react";
import { FirstState } from "@/types/connect4";

/**
 * Manage the selection state for the first player in a Connect4 game.
 *
 * @returns An object containing the current first-player setting and its setter:
 * - `firstRole`: the current first-player setting — either `'random'`, `Role.RED`, or `Role.YELLOW`.
 * - `setFirstRole`: a setter function to update `firstRole`.
 *
 * @remarks
 * The initial value of `firstRole` is `'random'`.
 */
export default function useFirstRole() {
	const [firstRole, setFirstRole] = useState<FirstState>("random");

	return {
		firstRole,
		setFirstRole,
	};
}