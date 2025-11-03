"use client"

import { useState } from "react";
import { FirstState } from "@/types/reversi";

export default function useFirstRole() {
	const [firstRole, setFirstRole] = useState<FirstState>("random");

	return {
		firstRole,
		setFirstRole,
	};
}
