import GameCard from "@/components/GameCard";
import { GAMES } from "@/constants/games";

export default function Home() {
	return (
		<main className="min-h-screen bg-gray-50">
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<h2 className="text-2xl font-bold mb-6">ゲーム一覧</h2>
				<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					{GAMES.filter((game) => game.isAvailable).map((game) => (
						<GameCard key={game.id} game={game} />
					))}
				</div>
			</section>
		</main>
	);
}
