[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/reversi/checkWin](../README.md) / checkWin

# Function: checkWin()

> **checkWin**(`params`): `boolean`

Defined in: [libs/reversi/checkWin.ts:24](https://github.com/YuyMat/boardGame-frontend/blob/7dd50f5fe86bd0c3eeb130ed6337123e7f5495f9/src/libs/reversi/checkWin.ts#L24)

オセロゲームの終局判定とスキップターン処理を行います。
現在のプレイヤーが置ける場所があるか、相手にパスできるか、または終局かを判定します。

## Parameters

### params

[`CheckWinProps`](../../../../types/reversi/interfaces/CheckWinProps.md)

終局判定に必要なパラメータ

## Returns

`boolean`

ゲームが終了した場合は`true`、続行可能な場合は`false`

## Remarks

- 現在のプレイヤーが置ける場合：ハイライトを更新して続行
- 現在のプレイヤーが置けないが相手が置ける場合：スキップターンして続行
- 両者とも置けない場合：ゲーム終了
