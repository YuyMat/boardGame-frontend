import { Button, notification } from "antd";

/**
 * ゲームの招待URLをクリップボードにコピーするボタンコンポーネントです。
 * コピー成功時に通知を表示します。
 * 
 * @param props - コンポーネントのProps
 * @param props.gameName - ゲームの名前（コピーメッセージに含まれます）
 * 
 * @remarks
 * - クリップボードにゲーム名と現在のURLを含むメッセージをコピーします
 * - コピー成功時にAnt Designの通知コンポーネントを使用して通知を表示します
 * - オンライン対戦時に友達を招待する際に使用されます
 */
export default function CopyUrl({ gameName }: { gameName: string }) {
	const [api, contextHolder] = notification.useNotification();

	const copyUrl = async () => {
		await navigator.clipboard.writeText(`URLを押して、${gameName}を一緒にプレイしよう！🎉\n\n${window.location.href}`);
		api.success({
			title: "コピーしました",
			description: "招待URLをクリップボードにコピーしました。",
			placement: "top",
			duration: 2,
		});
	}

	return (
		<>
			{contextHolder}
			<div>
				<Button onClick={copyUrl}>
					招待URLをコピー
				</Button>
			</div>
		</>
	)
}
