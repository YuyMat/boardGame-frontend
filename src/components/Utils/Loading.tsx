import styles from "./Loading.module.scss";

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
