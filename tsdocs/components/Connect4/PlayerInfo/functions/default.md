[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Connect4/PlayerInfo](../README.md) / default

# Function: default()

> **default**(`props`): `Element` \| `undefined`

Defined in: [components/Connect4/PlayerInfo.tsx:18](https://github.com/YuyMat/boardGame-frontend/blob/7dd50f5fe86bd0c3eeb130ed6337123e7f5495f9/src/components/Connect4/PlayerInfo.tsx#L18)

Connect4ゲームの現在のターン情報を表示するコンポーネントです。
プレイヤーのターン、相手のターン、観戦中の状態を表示します。

## Parameters

### props

[`ShowRoleProps`](../../../../types/connect4/interfaces/ShowRoleProps.md)

コンポーネントのProps

## Returns

`Element` \| `undefined`

## Remarks

- プレイヤーロールがnullの場合は「観戦中」と表示されます
- 自分のターン、相手のターンで異なるメッセージを表示します
- ゲーム終了後（`canPlay=false`）は何も表示しません
