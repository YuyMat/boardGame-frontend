[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/reversi/reverseStones](../README.md) / reverseStones

# Function: reverseStones()

> **reverseStones**(`params`): `void`

Defined in: [libs/reversi/reverseStones.ts:18](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/libs/reversi/reverseStones.ts#L18)

オセロで石を置いた後、挟まれた相手の石をひっくり返す処理を実行します。
8方向すべてをチェックし、挟んだ石を自分の色に変更します。

## Parameters

### params

[`HandleGameStateUpdatedProps`](../../../../types/reversi/interfaces/HandleGameStateUpdatedProps.md)

石をひっくり返すために必要なパラメータ

## Returns

`void`

## Remarks

- この関数は盤面を直接変更します（mutable）
- 8方向（上下左右＋斜め4方向）すべてをチェックします
- 各方向で相手の石を挟んでいる場合のみ、その方向の石をひっくり返します
