[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/memory/checkFinished](../README.md) / checkFinished

# Function: checkFinished()

> **checkFinished**(`cardStateBoard`): `boolean`

Defined in: [libs/memory/checkFinished.ts:10](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/libs/memory/checkFinished.ts#L10)

全てのカードが取り除かれたかどうか（ゲーム終了）を判定します。

## Parameters

### cardStateBoard

[`CardStateBoard`](../../../../types/memory/type-aliases/CardStateBoard.md)

現在のカード状態ボード

## Returns

`boolean`

全てのカードがREMOVED状態であればtrue、そうでなければfalse
