import styles from "./Loading.module.scss";

/**
 * ウェーブアニメーション付きのローディングテキストコンポーネントです。
 * テキストの各文字が順番に波打つようにアニメーションします。
 * 
 * @param props - コンポーネントのProps
 * @param props.text - 表示するローディングテキスト
 * 
 * @remarks
 * - テキストの各文字に順次遅延を適用してウェーブアニメーションを実現します
 * - マッチング待機中などに使用されます
 * - レスポンシブデザインに対応しています
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
