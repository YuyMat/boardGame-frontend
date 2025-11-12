"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";

/**
 * 新規ルーム作成用のコンポーネント
 * 
 * @description
 * 指定されたゲームの新規ルーム作成ページへ遷移するボタンを表示します。
 * ボタンをクリックすると、`/{gameName}/newRoom` のパスへナビゲートします。
 * 
 * @param props - コンポーネントのプロパティ
 * @param props.gameName - ゲームの名前（例: "reversi", "connect4"）
 * 
 * @returns 新規ルーム作成ボタンを含むReact要素
 * 
 * @example
 * ```tsx
 * <NewRoom gameName="reversi" />
 * ```
 */
export default function NewRoom({ gameName }: { gameName: string }) {
	const router = useRouter();

	return (
		<>
			<div>
				<Button type="primary" onClick={() => router.push(`/${gameName}/newRoom`)}>
					新規ルームを作成
				</Button>
			</div>
		</>
	)
}
