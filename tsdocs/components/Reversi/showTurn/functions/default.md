[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Reversi/ShowTurn](../README.md) / default

# Function: default()

> **default**(`props`): `Element` \| `undefined`

Defined in: [components/Reversi/ShowTurn.tsx:19](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/components/Reversi/ShowTurn.tsx#L19)

リバーシゲームの現在のターン情報を表示するコンポーネントです。（オンライン対戦用）
プレイヤーのターン、相手のターン状態を表示します。

## Parameters

### props

[`ShowRoleProps`](../../../../types/utils/interfaces/ShowRoleProps.md)\<[`RoleState`](../../../../types/reversi/type-aliases/RoleState.md)\>

コンポーネントのProps

## Returns

`Element` \| `undefined`

## Remarks

- 自分のターン、相手のターンで異なるメッセージを表示します
- ゲーム終了後（`canPlay=false`）は何も表示しません
- ローカル対戦用には `TurnInfo` コンポーネントが使用されます
