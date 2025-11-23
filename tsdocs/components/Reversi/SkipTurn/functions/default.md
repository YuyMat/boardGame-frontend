[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Reversi/SkipTurn](../README.md) / default

# Function: default()

> **default**(`props`): `Element` \| `undefined`

Defined in: [components/Reversi/SkipTurn.tsx:17](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/components/Reversi/SkipTurn.tsx#L17)

オセロゲームでスキップターン（パス）が発生した時に表示するメッセージコンポーネントです。
どちらのプレイヤーが置けなかったかを表示します。

## Parameters

### props

[`SkipTurnProps`](../../../../types/reversi/interfaces/SkipTurnProps.md)

コンポーネントのProps

## Returns

`Element` \| `undefined`

## Remarks

- スキップターンが発生していない場合は何も表示しません
- 「○○は置けないため、××のターンです」というメッセージを表示します
- オセロのルールに従って、置ける場所がない場合に自動的にターンがスキップされます
