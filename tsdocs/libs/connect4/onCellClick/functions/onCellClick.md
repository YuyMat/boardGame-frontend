[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/connect4/onCellClick](../README.md) / onCellClick

# Function: onCellClick()

> **onCellClick**(`params`): `void`

Defined in: [libs/connect4/onCellClick.ts:21](https://github.com/YuyMat/boardGame-frontend/blob/7dd50f5fe86bd0c3eeb130ed6337123e7f5495f9/src/libs/connect4/onCellClick.ts#L21)

Connect4ゲームで列がクリックされたときの処理を実行します。
指定された列の最下段の空きセルに石を落とし、ターンを切り替えます。

## Parameters

### params

[`OnCellClickProps`](../../../../types/connect4/interfaces/OnCellClickProps.md)

セルクリック処理に必要なパラメータ

## Returns

`void`

## Remarks

- 列がすでに満杯の場合は何もしません
- プレイ不可能な状態（`canPlay=false`）の場合は何もしません
- 石を置いた後、自動的にターンが切り替わります
