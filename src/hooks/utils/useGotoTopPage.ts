"use client"
import { useRouter } from "next/navigation";
import closeModal from "@/utils/closeModal";

/**
 * モーダルを閉じてトップページに遷移する関数を返すカスタムフックです。
 * 
 * @returns モーダルを閉じてトップページ（"/"）に遷移する関数
 * 
 * @remarks
 * このフックはリザルト画面などで「ゲーム一覧に戻る」機能を提供する際に使用されます。
 * 
 * @example
 * ```tsx
 * const gotoTopPage = useGotoTopPage();
 * // モーダルを閉じてトップページに遷移
 * gotoTopPage(setIsOpen);
 * ```
 */
export default function useGotoTopPage() {
	const router = useRouter();
	return (setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (setIsOpen)
			closeModal(setIsOpen);
		router.push("/");
	};
}
