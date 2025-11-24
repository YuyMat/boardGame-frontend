"use client"

import { useState } from "react";
import { Space, type MenuProps, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { RoleState } from "@/types/utils";
import { FirstRoleSelectorProps } from "@/types/utils";


export default function FirstRoleSelector({ setFirst, keyToShowLabel, firstTurnItems }: FirstRoleSelectorProps) {
	const [showFirst, setShowFirst] = useState<string>("ランダム"); //表示用ラベル


	const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
		const selected =
			key === 'random'
				? 'random'
				: (Number(key) as RoleState);
		setFirst(selected);
		setShowFirst(keyToShowLabel[selected]);
	};

	return (
		<div className="flex justify-center items-center gap-2 mb-4">
			<div className="text-lg">先攻：</div>
			<Dropdown menu={{ items: firstTurnItems, onClick: handleMenuClick }} trigger={['click']}>
				<Button>
					{showFirst}
					<DownOutlined />
				</Button>
			</Dropdown>
		</div>
	)
}
