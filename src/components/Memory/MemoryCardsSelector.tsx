"use client"

import { Space, type MenuProps, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { MemoryCardsSelectorProps } from "@/types/memory";
import { Cards } from "@/types/memory";
import { totalCards } from "@/constants/memory";

export default function MemoryCardsSelector({ cards, setCards }: MemoryCardsSelectorProps) {
	const cardItems: MenuProps['items'] = totalCards.map((num) => ({
		label: `${num}枚`,
		key: String(num),
	}));

	const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
		setCards(Number(key) as Cards);
	};

	return (
		<div className="flex justify-center items-center gap-2 mb-4">
			<div className="text-lg">カードの枚数：</div>
			<Dropdown menu={{ items: cardItems, onClick: handleMenuClick }} trigger={['click']}>
				<a onClick={(e) => e.preventDefault()}>
					<Space>
						<Button>
							{cards}
							<DownOutlined />
						</Button>
					</Space>
				</a>
			</Dropdown>
		</div>
	)
}
