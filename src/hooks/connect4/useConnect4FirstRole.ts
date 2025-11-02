"use client"

import { useState } from "react";
import { FirstState } from "@/types/connect4";

export default function useFirstRole() {
	const [firstRole, setFirstRole] = useState<FirstState>("random");

	return {
		firstRole,
		setFirstRole,
	};
}
