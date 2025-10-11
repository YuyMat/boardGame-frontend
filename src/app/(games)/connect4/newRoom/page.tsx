"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Connect4";

export default function Page() {
	const router = useRouter();

    useEffect(() => {
        const create = async () => {
            try {
                const res = await fetch("/api/rooms/new", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to create room");
                const data = await res.json();
                const roomId = data.roomId;
                router.replace(`/connect4/${roomId}`);
            } catch (e) {
				router.replace("/");
            }
        };
        create();
    }, [router]);

	return (
		<div className="flex justify-center items-center min-h-[calc(100vh-72px)]">
			<Loading text="部屋を作成しています..." />
		</div>
	);
}
