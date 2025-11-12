[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Reversi/Board](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Reversi/Board.tsx:22](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/components/Reversi/Board.tsx#L22)

オセロゲームの盤面を表示するメインボードコンポーネントです。
8x8の盤面、石、合法手のハイライトを表示します。

## Parameters

### props

[`BoardProps`](../../../../types/reversi/interfaces/BoardProps.md)

コンポーネントのProps

## Returns

`Element`

## Remarks

- 8x8のオセロ盤面を表示します
- 合法手の位置は明るい緑色でハイライトされます
- 黒石と白石が視覚的に区別されます
- 現在のターン情報も表示されます
