[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/connect4/checkDraw](../README.md) / checkDraw

# Function: checkDraw()

> **checkDraw**(`board`): `boolean`

Defined in: [libs/connect4/checkDraw.ts:17](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/libs/connect4/checkDraw.ts#L17)

Connect4ゲームで引き分け状態（盤面が完全に埋まった状態）かどうかをチェックします。
最上段のすべてのセルが埋まっているかを判定します。

## Parameters

### board

[`BoardState`](../../../../types/connect4/type-aliases/BoardState.md)

現在のゲーム盤面の状態

## Returns

`boolean`

すべての列が埋まっている場合は`true`、空きがある場合は`false`

## Remarks

- Connect4では最上段（0行目）が埋まれば、その列は完全に埋まっています
- 1列でも空きがあれば、まだゲームを続けられます
- この判定は勝敗判定の後に実行されます
