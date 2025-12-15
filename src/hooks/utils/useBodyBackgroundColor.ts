import { useEffect } from 'react';

/**
 * bodyの背景色を動的に変更するカスタムフック
 *
 * CSS変数 --body-bg-color を操作して背景色を変更します。
 * グローバルCSSで transition が設定されているため、スムーズに色が変化します。
 *
 * @param color 適用したい背景色（CSSの色コードまたはカラーネーム）
 */
export const useBodyBackgroundColor = (color: string) => {
	useEffect(() => {
		if (typeof window === 'undefined') return;

		document.body.style.setProperty('--body-bg-color', color);

		return () => {
			document.body.style.removeProperty('--body-bg-color');
		};
	}, [color]);
};
