[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Connect4/Connect4Result](../README.md) / default

# Function: default()

> **default**(`props`): `Element` \| `undefined`

Defined in: [components/Connect4/Connect4Result.tsx:23](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/components/Connect4/Connect4Result.tsx#L23)

Connect4ゲームの結果を表示するモーダルコンポーネントです。
勝者を発表し、リスタートやゲーム一覧への遷移オプションを提供します。

## Parameters

### props

[`Connect4ResultProps`](../../../../types/connect4/interfaces/Connect4ResultProps.md)

コンポーネントのProps

## Returns

`Element` \| `undefined`

## Remarks

- 引き分けの場合は引き分けメッセージを表示します
- 勝者がいる場合は、currentRoleの逆のプレイヤーが勝者として表示されます
- 3つのアクション（戻る、ゲーム一覧、リスタート）を提供します
