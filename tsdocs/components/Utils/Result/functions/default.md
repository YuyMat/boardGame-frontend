[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/Result](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Utils/Result.tsx:21](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/components/Utils/Result.tsx#L21)

オセロゲームの結果を表示するモーダルコンポーネントです。
黒石と白石の数を表示し、勝者を発表します。

## Parameters

### props

[`ResultProps`](../../../../types/utils/interfaces/ResultProps.md)

コンポーネントのProps

## Returns

`Element`

## Remarks

- 石の数が同じ場合は引き分けと表示されます
- 石の数が多い方が勝者として表示されます
- 3つのアクション（戻る、ゲーム一覧、リスタート）を提供します
