import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
	title: {
		default: "Board Games | オンラインで遊べる2人用ボードゲーム",
		template: "%s | Board Games",
	},
	description:
		"コネクト4やリバーシなどの2人用ボードゲームをブラウザから無料で遊べるサイトです。友達とオンライン対戦もできます。",
	keywords: [
		"ボードゲーム",
		"オンライン対戦",
		"コネクト4",
		"リバーシ",
		"オセロ",
		"2人用ゲーム",
		"ブラウザゲーム",
	],
	openGraph: {
		title: "Board Games | オンラインで遊べる2人用ボードゲーム",
		description:
			"コネクト4やリバーシなどの2人用ボードゲームをブラウザから無料で遊べるサイトです。友達とオンライン対戦もできます。",
		type: "website",
		url: "/",
		siteName: "Board Games",
		locale: "ja_JP",
		images: [
			{
				url: "/BGLogo.PNG",
				width: 1200,
				height: 630,
				alt: "Board Games のロゴ画像",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Board Games | オンラインで遊べる2人用ボードゲーム",
		description:
			"コネクト4やリバーシなどの2人用ボードゲームをブラウザから無料で遊べるサイトです。友達とオンライン対戦もできます。",
		images: ["/BGLogo.PNG"],
	},
	robots: {
		index: true,
		follow: true,
	},
	alternates: {
		canonical: "/",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body>
				<Header />
				{children}
				<SpeedInsights />
			</body>
		</html>
	);
}
