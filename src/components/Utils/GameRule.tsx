"use client"

import { useState } from "react";
import { Modal, Button, Dropdown, Space, type MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FirstState, ShowFirstState } from "@/types/connect4";
import { keyToShowLabel, firstTurnItems } from "@/constants/connect4";

export default function RuleSettings({ setFirst }: { setFirst: React.Dispatch<React.SetStateAction<FirstState>> }) {
	const [isOpen, setIsOpen] = useState(false);
	const [showFirst, setShowFirst] = useState<ShowFirstState>("ランダム");

	const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
		const selected =
			key === 'random'
				? 'random'
				: (Number(key) as 1 | 2);
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
					<span className="text-sm font-bold">※あなたの色は<span className="text-red-500">赤</span>です</span>
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
