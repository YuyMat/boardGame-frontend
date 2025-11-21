/**
 * 指定された範囲内のランダムな整数を生成します。
 *
 * @param min - 範囲の最小値 (これを含む)
 * @param max - 範囲の最大値 (これを含まない)
 * @returns min以上max未満のランダムな整数
 *
 * @example
 * // 0から9までのランダムな整数を返す
 * getRandomNumber(0, 10);
 */
export const getRandomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min)) + min;
};
