import { Button, notification } from "antd";

/**
 * Renders a button that copies an invitation message containing the current page URL and the game name to the clipboard and shows a success notification.
 *
 * @param gameName - The game's name to include in the copied invitation message
 */
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