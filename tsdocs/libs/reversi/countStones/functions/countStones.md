[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/reversi/countStones](../README.md) / countStones

# Function: countStones()

> **countStones**(`board`): `object`

Defined in: [libs/reversi/countStones.ts:17](https://github.com/YuyMat/boardGame-frontend/blob/7dd50f5fe86bd0c3eeb130ed6337123e7f5495f9/src/libs/reversi/countStones.ts#L17)

オセロの盤面上にある黒石と白石の数をカウントします。

## Parameters

### board

[`BoardState`](../../../../types/reversi/type-aliases/BoardState.md)

現在のゲーム盤面の状態

## Returns

`object`

石の数を含むオブジェクト
- `blackCount`: 盤面上の黒石の数
- `whiteCount`: 盤面上の白石の数

### blackCount

> **blackCount**: `number`

### whiteCount

> **whiteCount**: `number`

## Remarks

この関数は盤面の状態を変更しません（純粋関数）。
ゲーム終了時の勝敗判定や、ゲーム中の状況表示に使用されます。
