'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Drawer } from 'antd';
import closeModal from '@/utils/closeModal';
import { GAMES } from '@/constants/games';

/**
 * サイト全体で使用されるグローバルヘッダーコンポーネントです。
 * ロゴ、サイト名、モバイルメニューを表示します。
 * 
 * @remarks
 * - レスポンシブデザインに対応しています
 * - モバイル表示時はハンバーガーメニューが表示されます
 * - メニューには利用可能なゲームへのリンクが含まれます
 * - ロゴをクリックするとトップページに遷移します
 */
const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 w-full bg-linear-to-r from-purple-600 to-blue-600 shadow-lg z-50">
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
							className="text-white focus:outline-none focus:text-gray-200 cursor-pointer"
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
				<Drawer
					open={isMenuOpen}
					onClose={() => closeModal(setIsMenuOpen)}
					placement="top"
					title="ゲーム一覧"
					rootClassName="[&_.ant-drawer-close]:order-1 [&_.ant-drawer-close]:mr-0 [&_.ant-drawer-close]:ml-3"
				>
					<div className="py-2">
						<div className="grid grid-cols-1 gap-3">
							{GAMES.map((game) => (
								game.localPath && game.isAvailable ? (
									<div
										key={game.id}
										className="group relative flex flex-col p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300"
									>
										<div className="flex items-center justify-between mb-2">
											<span className="font-bold text-gray-800 text-lg">
												{game.name}
											</span>
											{game.isDev && (
												<span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
													BETA
												</span>
											)}
										</div>

										<p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
											{game.description}
										</p>

										<div className="grid grid-cols-2 gap-2 mt-auto">
											<Link
												href={game.localPath}
												onClick={() => setIsMenuOpen(false)}
												className="flex items-center justify-center px-3 py-2 text-xs font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors shadow-sm active:transform active:scale-95"
											>
												<svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
												</svg>
												ローカル
											</Link>
											{game.isDev ? (
												<div className="flex items-center justify-center px-3 py-2 text-xs font-bold text-gray-400 bg-gray-100 rounded-lg border border-gray-200 cursor-not-allowed select-none">
													Coming Soon
												</div>
											) : game.onlinePath ? (
												<Link
													href={game.onlinePath}
													onClick={() => setIsMenuOpen(false)}
													className="flex items-center justify-center px-3 py-2 text-xs font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors shadow-sm active:transform active:scale-95"
												>
													<svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
													オンライン
												</Link>
											) : (
												<div className="flex items-center justify-center px-3 py-2 text-xs font-bold text-gray-400 bg-gray-100 rounded-lg border border-gray-200 cursor-not-allowed select-none">
													オンライン
												</div>
											)}
										</div>
									</div>
								) : null
							))}
						</div>
					</div>
				</Drawer>
			</div>
		</header>
	);
};

export default Header;
