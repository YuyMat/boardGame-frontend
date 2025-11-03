"use client";

import Image from "next/image";
import Link from "next/link";
import type { GameMeta } from "@/types/games";

type GameCardProps = {
	game: GameMeta;
};

/**
 * Render a card showing a game's thumbnail, title, description, and play actions.
 *
 * Displays "Local Play" and "Online Play" controls:
 * - "Local Play" is enabled when `game.localPath` is provided; otherwise shown disabled.
 * - "Online Play" is enabled when `game.onlinePath` is provided; availability also respects the `NEXT_PUBLIC_ENV="local"` development flag.
 *
 * @param game - Game metadata used to populate the card (thumbnail, name, description, and play paths)
 * @returns The rendered React element for the game card
 */
export default function GameCard({ game }: GameCardProps) {
	const env = process.env.NEXT_PUBLIC_ENV;
	const isDev = env === "local";

	return (
		<div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
			<div className="relative w-full h-40 bg-gray-50">
				<Image src={game.imageSrc} alt={game.name} fill className="object-cover p-4" />
			</div>
			<div className="p-4 flex-1 flex flex-col gap-3">
				<h3 className="text-lg font-semibold">{game.name}</h3>
				<p className="text-sm text-gray-600 flex-1">{game.description}</p>
				<div className="flex gap-2 pt-2 justify-center">
					{game.localPath ? (
						<Link href={game.localPath} className="px-3 py-2 text-sm rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors">
							ローカルプレイ
						</Link>
					) : (
						<button className="px-3 py-2 text-sm rounded-md bg-gray-300 text-gray-500 cursor-not-allowed" disabled>
							ローカルプレイ
						</button>
					)}
					{(game.onlinePath && !game.isDev) || (game.onlinePath && isDev) ? (
						<Link href={game.onlinePath} className="px-3 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-colors">
							オンライン対戦
						</Link>
					) : (
						<button className="px-3 py-2 text-sm rounded-md bg-gray-300 text-gray-500 cursor-not-allowed" disabled>
							オンライン対戦
						</button>
					)}
				</div>
			</div>
		</div>
	);
}