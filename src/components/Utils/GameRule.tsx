"use client"

import { useState } from "react";
import { Modal, Button, Dropdown, Space, type MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FirstState, ShowFirstState } from "@/types/connect4";
import { keyToShowLabel, firstTurnItems } from "@/constants/connect4";

/**
 * Modal component for selecting which player goes first in a Connect4 game.
 *
 * @param props.setFirst - Setter that updates the parent first-turn state; accepts `"random"`, `1` (red), or `2` (yellow).
 *
 * @remarks
 * Displays a dropdown with the choices "random", red, and yellow and propagates the selected value to the parent via `setFirst`.
 */
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