/**
 * バックエンドサーバーのヘルスチェックを行います
 *
 * @param url - バックエンドのベースURL
 * @returns サーバーが正常に応答した場合は true、それ以外は false
 */
export async function checkHealth(url: string): Promise<boolean> {
	try {
		const res = await fetch(`${url}/health`, {
			cache: "no-store",
			signal: AbortSignal.timeout(2000),
		});
		return res.ok;
	} catch {
		return false;
	}
}
