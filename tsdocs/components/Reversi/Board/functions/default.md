[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Reversi/Board](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Reversi/Board.tsx:23](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/components/Reversi/Board.tsx#L23)

リバーシゲームの盤面を表示するメインボードコンポーネントです。
8x8の盤面、石、合法手のハイライト、および直前に置かれた石の位置を表示します。

## Parameters

### props

[`BoardProps`](../../../../types/reversi/interfaces/BoardProps.md)

コンポーネントのProps

## Returns

`Element`

## Remarks

- 8x8のリバーシ盤面を表示します
- 合法手の位置は明るい緑色でハイライトされます
- 直前に石を置いたマスは枠線の色によって強調表示されます
- 黒石と白石が視覚的に区別されます
- 現在のターン情報も表示されます
