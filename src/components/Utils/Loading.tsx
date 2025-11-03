import styles from "./Loading.module.scss";

/**
 * Render a loading text where each character plays a staggered wave animation.
 *
 * @param text - The loading text to display; each character animates with an increasing delay.
 * @returns The element containing the loading text with per-character staggered wave animation.
 *
 * @remarks
 * Each character's animation delay is set to `index * 0.08s`.
 */
export default function Loading({ text }: { text: string }) {
	return (
		<div className="flex flex-wrap justify-center items-center break-all text-center w-full px-4 sm:px-6 md:px-8">
			{Array.from(text).map((char, index) => (
				<span
					key={`${char}-${index}`}
					className={`text-2xl font-bold ${styles.waitingWave}`}
					style={{ animationDelay: `${index * 0.08}s` }}
				>
					{char}
				</span>
			))}
		</div>
	)
}