[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [hooks/connect4/useConnect4Game](../README.md) / default

# Function: default()

> **default**(`props`): `object`

Defined in: [hooks/connect4/useConnect4Game.ts:40](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/hooks/connect4/useConnect4Game.ts#L40)

Connect4ゲームのゲームロジックとリアルタイム同期を管理するカスタムフックです。
ボードの状態管理、勝敗判定、Socket.IOを使った盤面同期を行います。

## Parameters

### props

[`UseConnect4GameProps`](../../../../types/connect4/interfaces/UseConnect4GameProps.md)

ゲーム管理に必要なパラメータ

## Returns

`object`

ゲーム状態と操作関数を含むオブジェクト
- `board`: 現在の盤面の状態
- `currentRole`: 現在のターンのプレイヤー
- `isWin`: 勝敗が決定したかどうか
- `setIsWin`: 勝敗フラグを更新するセッター関数
- `onCellClick`: セルをクリックした時のハンドラ関数
- `lastPosition`: 最後に石が置かれた位置
- `canPlay`: プレイ可能かどうか
- `isDraw`: 引き分けかどうか

### board

> **board**: [`BoardState`](../../../../types/connect4/type-aliases/BoardState.md)

### currentRole

> **currentRole**: [`RoleState`](../../../../types/connect4/type-aliases/RoleState.md)

### isWin

> **isWin**: `boolean`

### setIsWin

> **setIsWin**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

### onCellClick()

> **onCellClick**: (`colIndex`) => `void` = `handleCellClick`

#### Parameters

##### colIndex

`number`

#### Returns

`void`

### lastPosition

> **lastPosition**: [`lastPositionState`](../../../../types/connect4/type-aliases/lastPositionState.md)

### canPlay

> **canPlay**: `boolean`

### isDraw

> **isDraw**: `boolean`

## Remarks

- Socket.IOを使用してリアルタイムで盤面を同期します
- 自分のターンのみ石を置くことができます
- 勝敗判定は自動的に行われます
