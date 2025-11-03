"use client"

/**
 * モーダルを閉じる処理を実行します。
 * 
 * @param setIsOpen - モーダルの開閉状態を管理するセッター関数
 * 
 * @remarks
 * シンプルにモーダルの状態を`false`に設定します。
 */
export default function closeModal(setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) {
	setIsOpen(false);
}
