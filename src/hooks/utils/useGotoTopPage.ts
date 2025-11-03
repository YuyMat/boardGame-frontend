"use client"
import { useRouter } from "next/navigation";
import closeModal from "@/utils/closeModal";

/**
 * Create a handler that closes a modal and navigates to the top page ("/").
 *
 * @returns A function that accepts a React boolean state setter; it closes the modal and then navigates to the root path ("/").
 */
export default function useGotoTopPage() {
	const router = useRouter();
	return (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
		closeModal(setIsOpen);
		router.push("/");
	};
}