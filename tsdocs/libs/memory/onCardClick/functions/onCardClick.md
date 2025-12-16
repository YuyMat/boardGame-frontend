[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/memory/onCardClick](../README.md) / onCardClick

# Function: onCardClick()

> **onCardClick**(`props`): `void`

Defined in: [libs/memory/onCardClick.ts:17](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/libs/memory/onCardClick.ts#L17)

カードがクリックされた時の処理を実行します。
クリックが有効な場合（プレイ可能、チェック中でない、カードが裏向き）、
そのカードをOPENED（表向き）状態に変更します。

## Parameters

### props

[`OnCardClickProps`](../../../../types/memory/interfaces/OnCardClickProps.md)

クリック処理に必要なパラメータ

## Returns

`void`
