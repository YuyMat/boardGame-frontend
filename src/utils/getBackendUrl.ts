/**
 * バックエンドサーバーのURLを環境に応じて取得します
 * 
 * @returns バックエンドサーバーのURL
 * 
 * @remarks
 * - 環境変数`NEXT_PUBLIC_ENV`が`"local"`の場合はlocalhost:4000を返します
 * - それ以外の場合は`NEXT_PUBLIC_BACKEND_URL`または デフォルトのRender URLを返します
 */
export function getBackendUrl(): string {
	const env = process.env.NEXT_PUBLIC_ENV;

	return env === "local"
		? "http://localhost:4000"
		: "https://boardgame-backend-v1ew.onrender.com";
}
