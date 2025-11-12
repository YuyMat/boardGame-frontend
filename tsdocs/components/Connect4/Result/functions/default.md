[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Connect4/Result](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Connect4/Result.tsx:22](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/components/Connect4/Result.tsx#L22)

Connect4ゲームの結果を表示するモーダルコンポーネントです。
勝者を発表し、リスタートやゲーム一覧への遷移オプションを提供します。

## Parameters

### props

[`ResultProps`](../../../../types/connect4/interfaces/ResultProps.md)

コンポーネントのProps

## Returns

`Element`

## Remarks

- 引き分けの場合は引き分けメッセージを表示します
- 勝者がいる場合は、currentRoleの逆のプレイヤーが勝者として表示されます
- 3つのアクション（戻る、ゲーム一覧、リスタート）を提供します
