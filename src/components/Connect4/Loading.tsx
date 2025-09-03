import styles from "./Loading.module.scss";

export default function Loading({ text }: { text: string }) {
	return (
		<div className="flex justify-center items-center h-screen">
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