[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/reversi/createEmptyBoard](../README.md) / createEmptyBoard

# Function: createEmptyBoard()

> **createEmptyBoard**(): [`BoardState`](../../../../types/reversi/type-aliases/BoardState.md)

Defined in: [libs/reversi/createEmptyBoard.ts:17](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/libs/reversi/createEmptyBoard.ts#L17)

オセロゲーム用の初期状態のボードを作成します。
8x8の盤面の中央4マスに、標準的なオセロの初期配置で石を配置します。

## Returns

[`BoardState`](../../../../types/reversi/type-aliases/BoardState.md)

初期配置された8x8のボード配列
- [3][3]: 白
- [3][4]: 黒
- [4][3]: 黒
- [4][4]: 白

## Remarks

オセロの標準的な初期配置に従って石を配置します。
