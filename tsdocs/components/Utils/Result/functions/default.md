[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/Result](../README.md) / default

# Function: default()

> **default**(`props`): `Element` \| `undefined`

Defined in: [components/Utils/Result.tsx:25](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/components/Utils/Result.tsx#L25)

オセロゲームの結果を表示するモーダルコンポーネントです。
黒石と白石の数を表示し、勝者を発表します。

## Parameters

### props

[`ResultProps`](../../../../types/utils/interfaces/ResultProps.md)

コンポーネントのProps

## Returns

`Element` \| `undefined`

## Remarks

- 石の数が同じ場合は引き分けと表示されます
- 石の数が多い方が勝者として表示されます
- 3つのアクション（戻る、ゲーム一覧、リスタート）を提供します
