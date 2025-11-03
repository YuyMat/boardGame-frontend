"use client"

/**
 * Close a modal by setting its open state to false.
 *
 * @param setIsOpen - React state setter for the modal's open flag
 */
export default function closeModal(setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) {
	setIsOpen(false);
}