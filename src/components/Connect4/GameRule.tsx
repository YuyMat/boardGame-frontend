"use client"

import { useState } from "react";
import { Modal, Button, Dropdown, Space, type MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FirstState, ShowFirstState, RuleSettingsProps } from "@/types/connect4";

export default function RuleSettings({ first, setFirst }: RuleSettingsProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [showFirst, setShowFirst] = useState<ShowFirstState>("ランダム");

	const keyToShowLabel: Record<FirstState, ShowFirstState> = {
		random: "ランダム",
		r: "赤",
		y: "黄",
	};

	const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
		const selected = String(key) as FirstState;
		setFirst(selected);
		setShowFirst(keyToShowLabel[selected]);
	};

	const items = [
		{
			label: "ランダム(デフォルト)",
			key: "random",
		},
		{
			label: "赤",
			key: "r",
		},
		{
			label: "黄",
			key: "y",
		},
	]

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
					<span className="text-sm font-bold">※あなたの色は<span className="text-red-500">赤</span>です</span>
				</div>
				<div className="flex justify-center gap-2 mb-4">
					先攻：
					<Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
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
