[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/reversi/onCellClick](../README.md) / onCellClick

# Function: onCellClick()

> **onCellClick**(`params`): `void`

Defined in: [libs/reversi/onCellClick.ts:25](https://github.com/YuyMat/boardGame-frontend/blob/7dd50f5fe86bd0c3eeb130ed6337123e7f5495f9/src/libs/reversi/onCellClick.ts#L25)

オセロゲームでセルがクリックされたときの処理を実行します。
指定された位置に石を置き、挟まれた相手の石をひっくり返し、ターンを切り替えます。

## Parameters

### params

[`OnCellClickProps`](../../../../types/reversi/interfaces/OnCellClickProps.md)

セルクリック処理に必要なパラメータ

## Returns

`void`

## Remarks

- ハイライトされていない位置（合法手でない位置）はクリックしても何も起こりません
- プレイ不可能な状態（`canPlay=false`）の場合は何もしません
- 石を置いた後、相手の石を自動的にひっくり返し、ターンが切り替わります
