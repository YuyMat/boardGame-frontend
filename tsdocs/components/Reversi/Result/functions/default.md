[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Reversi/Result](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Reversi/Result.tsx:21](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/components/Reversi/Result.tsx#L21)

オセロゲームの結果を表示するモーダルコンポーネントです。
黒石と白石の数を表示し、勝者を発表します。

## Parameters

### props

[`ResultProps`](../../../../types/reversi/interfaces/ResultProps.md)

コンポーネントのProps

## Returns

`Element`

## Remarks

- 石の数が同じ場合は引き分けと表示されます
- 石の数が多い方が勝者として表示されます
- 3つのアクション（戻る、ゲーム一覧、リスタート）を提供します
