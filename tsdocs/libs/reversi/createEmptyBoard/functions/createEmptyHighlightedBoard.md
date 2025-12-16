[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/reversi/createEmptyBoard](../README.md) / createEmptyHighlightedBoard

# Function: createEmptyHighlightedBoard()

> **createEmptyHighlightedBoard**(): [`HighlightedBoardState`](../../../../types/reversi/type-aliases/HighlightedBoardState.md)

Defined in: [libs/reversi/createEmptyBoard.ts:40](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/libs/reversi/createEmptyBoard.ts#L40)

オセロゲーム用の空のハイライト用ボードを作成します。
8x8のすべてのセルが`false`で初期化されたブール値配列を返します。

## Returns

[`HighlightedBoardState`](../../../../types/reversi/type-aliases/HighlightedBoardState.md)

8x8のすべてのセルが`false`のブール値配列

## Remarks

合法手の位置をハイライト表示するために使用されます。
`computeHighlights`関数で合法手の位置を計算する際に利用されます。
