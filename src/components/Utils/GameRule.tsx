"use client"

import { useState, useEffect } from "react";
import { Modal, Button, Tooltip } from "antd";
import { RuleSettingsProps } from "@/types/utils";
import { Role } from "@/constants/utils";

/**
 * ゲームのルール設定を表示するモーダルコンポーネントです。
 * 汎用的なルール設定の枠組みを提供し、具体的な設定項目は子コンポーネントとして受け取ります。
 * 
 * @param props - コンポーネントのProps
 * @param props.keyToShowLabel - Roleの値を表示用ラベルに変換するマップ（例: { [Role.MAIN]: "赤", [Role.CPU]: "黄" }）
 * @param props.mainPlayerColorClass - メインプレイヤーの色を表すTailwind CSSクラス（例: "text-red-500"）
 * @param props.settingsComponents - モーダル内に表示する設定項目のコンポーネント（先攻選択など）
 * @param props.playerRole - プレイヤーの役割（Role.SUBの場合、ルール設定ボタンが無効化されます）
 * 
 * @remarks
 * - モーダルを開くボタンを提供します
 * - モーダルヘッダー部分にプレイヤーの自分の色を表示します
 * - 具体的な設定内容は `settingsComponents` プロパティを通じて注入されます
 */
export default function RuleSettings({ keyToShowLabel, mainPlayerColorClass, settingsComponents, playerRole }: RuleSettingsProps) {
	const [isOpen, setIsOpen] = useState(true);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<>
			<Tooltip title={playerRole === Role.SUB ? "ルームホストのみルールを設定できます" : undefined}>
				<Button onClick={() => setIsOpen(true)} disabled={playerRole === Role.SUB}>ルールを設定</Button>
			</Tooltip>
			{isMounted && (
				<Modal
					open={isOpen}
					onCancel={() => setIsOpen(false)}
					footer={null}
				>
					<div className="flex justify-between items-center mt-4">
						<h2 className="text-2xl font-bold mb-4 text-blue-800">ルール</h2>
						<span className="text-sm font-bold">※あなたの色は<span className={`${mainPlayerColorClass} text-lg`}>{keyToShowLabel[Role.MAIN]}</span>です</span>
					</div>
					{settingsComponents}
				</Modal >
			)}
		</>
	)
}
