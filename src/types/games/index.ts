export type GameMeta = {
	id: string;
	name: string;
	description: string;
	imageSrc: string; // public/ 配下の相対パス（例: "/window.svg"）
	localPath?: string | null; // ローカル対戦ページ
	onlinePath?: string | null; // 新規ルーム作成 or マッチングページ
	isAvailable: boolean;
	tags?: string[];
};


