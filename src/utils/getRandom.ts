/**
 * 指定された範囲内のランダムな整数を生成します。
 * 
 * @param min - 最小値（この値を含む）
 * @param max - 最大値（この値は含まない）
 * 
 * @returns `min`以上`max`未満のランダムな整数
 * 
 * @throws `max`が`min`以下の場合はエラーをスロー
 * 
 * @example
 * ```typescript
 * getRandomInt(1, 10); // 1〜9のいずれかの整数を返す
 * getRandomInt(0, 2);  // 0または1を返す
 * ```
 */
export function getRandomInt(min: number, max: number): number {
	if (max <= min) throw new Error("max must be greater than min");
	return Math.floor(Math.random() * (max - min)) + min;
}
