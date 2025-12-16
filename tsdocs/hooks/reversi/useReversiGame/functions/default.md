[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [hooks/reversi/useReversiGame](../README.md) / default

# Function: default()

> **default**(`props`): `object`

Defined in: [hooks/reversi/useReversiGame.ts:43](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/hooks/reversi/useReversiGame.ts#L43)

オセロゲームのゲームロジックとリアルタイム同期を管理するカスタムフックです。
ボードの状態管理、合法手のハイライト、勝敗判定、Socket.IOを使った盤面同期を行います。

## Parameters

### props

[`UseReversiGameProps`](../../../../types/reversi/interfaces/UseReversiGameProps.md)

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
- `blackCount`: 黒石の数を保持するRefオブジェクト
- `whiteCount`: 白石の数を保持するRefオブジェクト
- `isSkipTurn`: スキップターンが発生したかどうか
- `highlightedCells`: 合法手がハイライトされているセルの配列

### board

> **board**: [`BoardState`](../../../../types/reversi/type-aliases/BoardState.md)

### isWin

> **isWin**: `boolean`

### setIsWin

> **setIsWin**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

### onCellClick()

> **onCellClick**: (`rowIndex`, `colIndex`) => `void` = `handleCellClick`

#### Parameters

##### rowIndex

`number`

##### colIndex

`number`

#### Returns

`void`

### lastPosition

> **lastPosition**: [`LastPositionState`](../../../../types/reversi/type-aliases/LastPositionState.md)

### canPlay

> **canPlay**: `boolean`

### blackCount

> **blackCount**: `RefObject`\<`number`\>

### whiteCount

> **whiteCount**: `RefObject`\<`number`\>

### isSkipTurn

> **isSkipTurn**: `boolean`

### highlightedCells

> **highlightedCells**: [`HighlightedBoardState`](../../../../types/reversi/type-aliases/HighlightedBoardState.md)

## Remarks

- Socket.IOを使用してリアルタイムで盤面を同期します
- 自分のターンかつ合法手のみ石を置くことができます
- スキップターン（パス）の判定も自動的に行われます
