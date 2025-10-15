'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GAMES } from '@/constants/games';

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="absolute top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					{/* ロゴとサイト名 */}
					<div className="flex items-center">
						<Link href="/" className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
								<Image src="/BGLogo.PNG" alt="Board Games Logo" width={40} height={40} className="object-contain" />
							</div>
							<h1 className="text-2xl font-bold text-white">
								Board Games
							</h1>
						</Link>
					</div>

					{/* モバイルメニューボタン */}
					<div>
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="text-white focus:outline-none focus:text-gray-200"
						>
							<svg
								className="h-6 w-6"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{isMenuOpen ? (
									<path d="M6 18L18 6M6 6l12 12" />
								) : (
									<path d="M4 6h16M4 12h16M4 18h16" />
								)}
							</svg>
						</button>
					</div>
				</div>

				{/* モバイルメニュー */}
				{isMenuOpen && (
					<div>
						<div className="px-2 pt-2 pb-3 space-y-1 bg-purple-700 rounded-lg mb-4">
							{GAMES.map((game) => (
								game.localPath && game.isAvailable ? (
									<Link
										key={game.id}
										href={game.localPath}
										className="block px-3 py-2 text-white hover:bg-purple-600 rounded-md transition-colors duration-200 text-center"
										onClick={() => setIsMenuOpen(false)}
									>
										{game.name}
									</Link>
								) : ''
							))}
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
