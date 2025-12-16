[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/memory/findOpenedCards](../README.md) / findOpenedCards

# Function: findOpenedCards()

> **findOpenedCards**(`cardStateBoard`, `cardBoard`): [`OpenedCard`](../../../../types/memory/interfaces/OpenedCard.md)[]

Defined in: [libs/memory/findOpenedCards.ts:11](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/libs/memory/findOpenedCards.ts#L11)

現在ボード上でOPENED（表向き）状態になっているカードを検索して返します。

## Parameters

### cardStateBoard

[`CardStateBoard`](../../../../types/memory/type-aliases/CardStateBoard.md)

現在のカード状態ボード

### cardBoard

[`CardBoard`](../../../../types/memory/type-aliases/CardBoard.md)

カードの画像URLボード

## Returns

[`OpenedCard`](../../../../types/memory/interfaces/OpenedCard.md)[]

表向きになっているカードの情報（位置とURL）の配列
