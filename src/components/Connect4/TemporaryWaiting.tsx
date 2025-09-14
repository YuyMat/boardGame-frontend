"use client"

import { Modal, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TemporaryWaiting({ members }: { members: number }) {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const onShowGames = () => {
		setIsOpen(false);
		router.push("/");
	};

	useEffect(() => {
		if (members < 2)
			setIsOpen(true);
		else
			setIsOpen(false);
	}, [members]);

	return (
		<Modal
			open={isOpen}
			title="対戦相手を待っています..."
			onCancel={() => setIsOpen(false)}
			footer={[
				<Button key="root" type="primary" onClick={onShowGames}>
					退出する
				</Button>,
			]}
		>
			<div className="flex justify-center items-center my-4">
				<Spin indicator={<LoadingOutlined spin />} size="large" />
			</div>
		</Modal>
	)
}
