# 実装方法
基本的なリアルタイム通信はコネクト4やリバーシと一緒。Boardコンポーネントや、メタデータのBoardがやや特殊。

1. カードの枚数は[8, 12, 16, 20, 24]から選択(デフォルトは16)
2. そのカードの枚数の新規boardが生成される。
```ts
// 例
const board: number[][] = [
	[1, 6, 4, 8],
	[2, 6, 3, 5],
	[1, 7, 7, 8],
	[2, 3, 4, 5],
] // '1'から'(カード枚数)/2'までの数字が全て2枚ずつランダムに埋められる。
```

3. 数字に対応した図形の辞書を用意
```ts
// 例
const numberToFigure = {
	1: '🔸',
	2: '🔹',
	3: '▪️',
	4: '⭕️',
	5: '❌',
	6: '▶️',
	7: '🔻',
	8: '0️⃣',
}
```

4. 対応表の図形に変換されたfigureBoardを生成
```ts
// 例
const figureBoard = [
	['🔸', '▶️', '⭕️', '0️⃣'],
	['🔹', '▶️', '▪️', '❌'],
	['🔸', '🔻', '🔻', '0️⃣'],
	['🔹', '▪️', '⭕️', '❌'],
]
```

5. カードが表、裏、取得済みの3状態があるcardStateBoardを生成
```ts
// 例
const CardState = {
	CLOSED: 0,
	OPENED: 1,
	REMOVED: 2,
}

// 初期状態
const cardStateBoard = Array(4).fill(null).map(() => Array(8).fill(CardState.CLOSED));
```

6. ユーザーが押したカードの(row, col)をCardState.OPENEDにして図形を表示。
7. 2枚同時に同じ数字が開かれたらREMOVED状態にしてずっと表むき
	checkPairについて
	1. cardStateBoardを全て確認する。
	2. オープン一つ目 -> 座標と、URLのstringを保持
	3. オープン二つ目 -> 一つ目のURLと確認
		- 同じだったら
			- currentRoleのプレイヤーの点数を足す
			- 一つ目の座標と、二つ目の座標のcardStateBoardをREMOVEDにする。
		- 違かったら
			- 一つ目の座標と、二つ目の座標のcardStateBoardをCLOSEDにする。
			- currentRoleの変更

8. cardStateBoardの全てがREMOVEDになった時点で試合終了
