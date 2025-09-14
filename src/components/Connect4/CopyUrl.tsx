import { Button } from "antd";

export default function CopyUrl() {
	const copyUrl = () => {
		navigator.clipboard.writeText(`URLを押して、コネクト４を一緒にプレイしよう！🎉\n\n${window.location.href}`);
	}
	
	return (
		<div>
			<Button type="primary" onClick={() => copyUrl()}>
				招待URLをコピー
			</Button>
		</div>
	)
}
