"use client"

import { useState } from "react";
import { Modal, Button } from "antd";
import { RuleSettingsProps } from "@/types/utils";
import FirstRoleSelector from "@/components/Utils/FirstRoleSelector";
import { Role } from "@/constants/utils";

/**
 * ゲームのルール設定（先攻選択）を行うモーダルコンポーネントです。
 * ゲームの先攻を選択できます。
 * 
 * @param props - コンポーネントのProps
 * @param props.setFirst - 先攻設定を更新するセッター関数
 * @param props.keyToShowLabel - 先攻状態の値を表示用ラベルに変換するマップ（例: { random: "ランダム", 1: "赤", 2: "黄" }）
 * @param props.firstTurnItems - ドロップダウンに表示する先攻選択肢の配列
 * @param props.mainPlayerColorClass - メインプレイヤーの色を表すTailwind CSSクラス（例: "text-red-500", "text-gray-900"）
 * @param props.additionalSettings - 追加の設定コンポーネント（任意）。FirstRoleSelectorの後に表示されます。
 * 
 * @remarks
 * - モーダル内でドロップダウンから先攻プレイヤーを選択できます
 * - 選択肢：ランダム、または各ゲーム固有のプレイヤー（赤/黄、黒/白など）
 * - ゲーム開始前に先攻を決定するために使用されます
 * - 各ゲームで異なる色やラベルに対応できる汎用的な設計になっています
 * - メインプレイヤーの色表示は各ゲームのconstantsから渡されたCSSクラスで動的に変更されます
 */
export default function RuleSettings({ setFirst, keyToShowLabel, firstTurnItems, mainPlayerColorClass, additionalSettings }: RuleSettingsProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>ルールを設定</Button>
			<Modal
				open={isOpen}
				onCancel={() => setIsOpen(false)}
				footer={null}
			>
				<div className="flex justify-between items-center mt-4">
					<h2 className="text-2xl font-bold mb-4 text-blue-800">ルール</h2>
					<span className="text-sm font-bold">※あなたの色は<span className={`${mainPlayerColorClass} text-lg`}>{keyToShowLabel[Role.MAIN]}</span>です</span>
				</div>
				<FirstRoleSelector setFirst={setFirst} keyToShowLabel={keyToShowLabel} firstTurnItems={firstTurnItems} />
				{additionalSettings}
			</Modal >
		</>
	)
}
