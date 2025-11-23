[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/connect4/checkWin](../README.md) / checkWin

# Function: checkWin()

> **checkWin**(`params`): `boolean`

Defined in: [libs/connect4/checkWin.ts:19](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/libs/connect4/checkWin.ts#L19)

Connect4ゲームで勝利条件を満たしているかをチェックします。
縦、横、斜め（2方向）のすべての方向で4つ連続しているかを判定します。

## Parameters

### params

[`CheckWinProps`](../../../../types/connect4/interfaces/CheckWinProps.md)

勝利判定に必要なパラメータ

## Returns

`boolean`

勝利条件を満たしている場合は`true`、そうでない場合は`false`

## Remarks

- 最後に置かれた石を基準に判定を行います
- チェック対象は直前のプレイヤー（currentRoleの反対色）の石です
