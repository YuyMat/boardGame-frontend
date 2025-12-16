[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Connect4/showTurn](../README.md) / default

# Function: default()

> **default**(`props`): `Element` \| `undefined`

Defined in: [components/Connect4/showTurn.tsx:18](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/components/Connect4/showTurn.tsx#L18)

Connect4ゲームの現在のターン情報を表示するコンポーネントです。
プレイヤーのターン、相手のターンを表示します。

## Parameters

### props

[`ShowRoleProps`](../../../../types/utils/interfaces/ShowRoleProps.md)\<[`RoleState`](../../../../types/connect4/type-aliases/RoleState.md)\>

コンポーネントのProps

## Returns

`Element` \| `undefined`

## Remarks

- 自分のターン、相手のターンで異なるメッセージを表示します
- ゲーム終了後（`canPlay=false`）は何も表示しません
