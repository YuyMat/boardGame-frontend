import { useEffect } from 'react';

/**
 * bodyの背景色を動的に変更するカスタムフック
 * @param color 適用したい背景色（CSSの色コードまたはカラーネーム）
 */
export const useBodyBackgroundColor = (color: string) => {
	useEffect(() => {
		// マウント時にtransitionを設定
		document.body.style.transition = 'background-color 300ms';
		
		// アンマウント時のクリーンアップ
		return () => {
			document.body.style.transition = '';
			document.body.style.backgroundColor = '';
		};
	}, []);

	useEffect(() => {
		// 指定された色が変更されたら背景色を更新
		document.body.style.backgroundColor = color;
	}, [color]);
};
