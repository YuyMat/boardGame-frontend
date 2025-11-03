"use client"
import { useRouter } from "next/navigation";
import closeModal from "@/utils/closeModal";

export default function useGotoTopPage() {
	const router = useRouter();
	return (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
		closeModal(setIsOpen);
		router.push("/");
	};
}
