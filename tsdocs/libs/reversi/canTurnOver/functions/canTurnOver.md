[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/reversi/canTurnOver](../README.md) / canTurnOver

# Function: canTurnOver()

> **canTurnOver**(`params`): `boolean`

Defined in: [libs/reversi/canTurnOver.ts:20](https://github.com/YuyMat/boardGame-frontend/blob/7dd50f5fe86bd0c3eeb130ed6337123e7f5495f9/src/libs/reversi/canTurnOver.ts#L20)

オセロで指定された位置に石を置いたときに、相手の石をひっくり返せるかをチェックします。
8方向すべてをチェックし、1つでもひっくり返せる方向があれば合法手と判定します。

## Parameters

### params

[`CanTurnOverProps`](../../../../types/reversi/interfaces/CanTurnOverProps.md)

ひっくり返し可能性をチェックするためのパラメータ

## Returns

`boolean`

ひっくり返せる石がある場合は`true`、ない場合は`false`

## Remarks

- 指定位置がすでに石で埋まっている場合は`false`を返します
- 相手の石を挟んで自分の石がある方向が1つでもあれば`true`を返します
