[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [hooks/utils/useBodyBackgroundColor](../README.md) / useBodyBackgroundColor

# Function: useBodyBackgroundColor()

> **useBodyBackgroundColor**(`color`, `matchState?`): `void`

Defined in: [hooks/utils/useBodyBackgroundColor.ts:13](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/hooks/utils/useBodyBackgroundColor.ts#L13)

bodyの背景色を動的に変更するカスタムフック

CSS変数 --body-bg-color を操作して背景色を変更します。
グローバルCSSで transition が設定されているため、スムーズに色が変化します。

## Parameters

### color

`string`

適用したい背景色（CSSの色コードまたはカラーネーム）

### matchState?

[`MatchState`](../../../../types/utils/type-aliases/MatchState.md)

マッチング状態（waiting | matched | playing）

## Returns

`void`
