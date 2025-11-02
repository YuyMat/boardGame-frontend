import { Button, notification } from "antd";

export default function CopyUrl({ gameName }: { gameName: string }) {
	const [api, contextHolder] = notification.useNotification();

	const copyUrl = async () => {
		await navigator.clipboard.writeText(`URLを押して、${gameName}を一緒にプレイしよう！🎉\n\n${window.location.href}`);
		api.success({
			message: "コピーしました",
			description: "招待URLをクリップボードにコピーしました。",
			placement: "top",
			duration: 2,
		});
	}

	return (
		<>
			{contextHolder}
			<div>
				<Button type="primary" onClick={() => copyUrl()}>
					招待URLをコピー
				</Button>
			</div>
		</>
	)
}
