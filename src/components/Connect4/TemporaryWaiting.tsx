"use client"

import { Modal, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import useGotoTopPage from "@/hooks/utils/useGotoTopPage";

/**
 * Connect4のオンライン対戦で対戦相手の参加を待つ待機モーダルコンポーネントです。
 * メンバー数が2人未満の場合に自動的に表示されます。
 * 
 * @param props - コンポーネントのProps
 * @param props.members - 現在のルームメンバー数
 * 
 * @remarks
 * - メンバー数が2人未満の場合にモーダルが表示されます
 * - ローディングスピナーで待機中であることを視覚的に示します
 * - 退出ボタンからトップページに戻ることができます
 * - 2人目が参加すると自動的にモーダルが閉じます
 */
export default function TemporaryWaiting({ members }: { members: number }) {
	const [isOpen, setIsOpen] = useState(false);
	const gotoTopPage = useGotoTopPage();

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
				<Button key="root" type="primary" onClick={() => gotoTopPage(setIsOpen)}>
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
