[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/reversi/computeHighlights](../README.md) / computeHighlights

# Function: computeHighlights()

> **computeHighlights**(`board`, `role`): `object`

Defined in: [libs/reversi/computeHighlights.ts:19](https://github.com/YuyMat/boardGame-frontend/blob/7dd50f5fe86bd0c3eeb130ed6337123e7f5495f9/src/libs/reversi/computeHighlights.ts#L19)

オセロの盤面上で現在のプレイヤーが石を置ける位置（合法手）を計算します。
すべてのセルをチェックし、石を置ける位置をハイライト配列として返します。

## Parameters

### board

[`BoardState`](../../../../types/reversi/type-aliases/BoardState.md)

現在のゲーム盤面の状態

### role

[`RoleState`](../../../../types/reversi/type-aliases/RoleState.md)

チェック対象のプレイヤーの色（黒または白）

## Returns

`object`

ハイライト情報を含むオブジェクト
- `highlights`: 8x8のブール値配列。合法手の位置が`true`になっている
- `any`: 少なくとも1つでも合法手が存在する場合は`true`、ない場合は`false`

### highlights

> **highlights**: [`HighlightedBoardState`](../../../../types/reversi/type-aliases/HighlightedBoardState.md)

### any

> **any**: `boolean`

## Remarks

この関数は盤面の状態を変更しません（純粋関数）。
