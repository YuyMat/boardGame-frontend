"use client"

import { useState } from "react";
import { Modal, Button, Dropdown, Space, type MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FirstState, RoleState, RuleSettingsProps } from "@/types/utils";
import { Role } from "@/constants/utils";

/**
 * ゲームのルール設定（先攻選択）を行うモーダルコンポーネントです。
 * ゲームの先攻を選択できます。
 * 
 * @param props - コンポーネントのProps
 * @param props.setFirst - 先攻設定を更新するセッター関数
 * @param props.keyToShowLabel - FirstStateの値を表示用ラベルに変換するマップ（例: { random: "ランダム", 1: "赤", 2: "黄" }）
 * @param props.firstTurnItems - ドロップダウンに表示する先攻選択肢の配列
 * 
 * @remarks
 * - モーダル内でドロップダウンから先攻プレイヤーを選択できます
 * - 選択肢：ランダム、または各ゲーム固有のプレイヤー（赤/黄、黒/白など）
 * - ゲーム開始前に先攻を決定するために使用されます
 * - 各ゲームで異なる色やラベルに対応できる汎用的な設計になっています
 */
export default function RuleSettings({ setFirst, keyToShowLabel, firstTurnItems, mainPlayerColorClass }: RuleSettingsProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [showFirst, setShowFirst] = useState<RuleSettingsProps['keyToShowLabel'][FirstState]>("ランダム");

	const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
		const selected =
			key === 'random'
				? 'random'
				: (Number(key) as RoleState);
		setFirst(selected);
		setShowFirst(keyToShowLabel[selected]);
	};

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
				<div className="flex justify-center gap-2 mb-4">
					先攻：
					<Dropdown menu={{ items: firstTurnItems, onClick: handleMenuClick }} trigger={['click']}>
						<a onClick={(e) => e.preventDefault()}>
							<Space>
								{showFirst}
								<DownOutlined />
							</Space>
						</a>
					</Dropdown>
				</div>
			</Modal >
		</>
	)
}
