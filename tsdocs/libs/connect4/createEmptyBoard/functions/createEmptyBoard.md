[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/connect4/createEmptyBoard](../README.md) / createEmptyBoard

# Function: createEmptyBoard()

> **createEmptyBoard**(): [`BoardState`](../../../../types/connect4/type-aliases/BoardState.md)

Defined in: [libs/connect4/createEmptyBoard.ts:12](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/libs/connect4/createEmptyBoard.ts#L12)

Connect4ゲーム用の空のゲームボードを作成します。

## Returns

[`BoardState`](../../../../types/connect4/type-aliases/BoardState.md)

6行7列のすべてのセルが`null`で初期化されたボード配列

## Remarks

ボードのサイズは`Connect4.ROWS`（6行）× `Connect4.COLS`（7列）で定義されています。
