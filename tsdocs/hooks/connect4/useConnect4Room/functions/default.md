[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [hooks/connect4/useConnect4Room](../README.md) / default

# Function: default()

> **default**(`roomId`, `setFirstRole`, `firstRole`): `object`

Defined in: [hooks/connect4/useConnect4Room.ts:35](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/hooks/connect4/useConnect4Room.ts#L35)

Connect4ゲームのルーム管理とマッチング機能を提供するカスタムフックです。
Socket.IOを使用してルームへの参加、プレイヤーのマッチング、先手設定の同期を行います。

## Parameters

### roomId

`string`

参加するルームのID

### setFirstRole

`Dispatch`\<`SetStateAction`\<[`FirstState`](../../../../types/connect4/type-aliases/FirstState.md)\>\>

先手設定を更新するセッター関数

### firstRole

[`FirstState`](../../../../types/connect4/type-aliases/FirstState.md)

現在の先手設定（'random' | Role.RED | Role.YELLOW）

## Returns

`object`

ルーム状態と操作関数を含むオブジェクト
- `socketRef`: Socket.IOクライアントのRefオブジェクト
- `members`: 現在のルームメンバー数
- `playerRole`: このプレイヤーに割り当てられたロール
- `matchState`: マッチング状態（waiting | matched | playing）
- `setMatchState`: マッチ状態を更新するセッター関数
- `membersRef`: メンバー数のRefオブジェクト
- `emitRestart`: ゲームをリスタートするイベントを送信する関数
- `currentRole`: 現在のターンのプレイヤー
- `setCurrentRole`: 現在のロールを更新するセッター関数

### socketRef

> **socketRef**: `RefObject`\<`Socket`\<`DefaultEventsMap`, `DefaultEventsMap`\> \| `null`\>

### members

> **members**: `number`

### playerRole

> **playerRole**: [`RoleState`](../../../../types/connect4/type-aliases/RoleState.md) \| `null`

### matchState

> **matchState**: [`MatchState`](../../../../types/utils/type-aliases/MatchState.md)

### setMatchState

> **setMatchState**: `Dispatch`\<`SetStateAction`\<[`MatchState`](../../../../types/utils/type-aliases/MatchState.md)\>\>

### membersRef

> **membersRef**: `RefObject`\<`number`\>

### emitRestart()

> **emitRestart**: () => `void`

#### Returns

`void`

### currentRole

> **currentRole**: [`RoleState`](../../../../types/connect4/type-aliases/RoleState.md)

### setCurrentRole

> **setCurrentRole**: `Dispatch`\<`SetStateAction`\<[`RoleState`](../../../../types/connect4/type-aliases/RoleState.md)\>\>

## Remarks

- マウント時に自動的にSocket.IO接続を確立し、ルームに参加します
- 2人のプレイヤーが揃うと自動的にマッチングされます
- アンマウント時に自動的にSocket.IOから切断します
