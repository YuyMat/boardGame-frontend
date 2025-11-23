[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Reversi/showTurn](../README.md) / default

# Function: default()

> **default**(`props`): `Element` \| `undefined`

Defined in: [components/Reversi/showTurn.tsx:19](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/components/Reversi/showTurn.tsx#L19)

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
