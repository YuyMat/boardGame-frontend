[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Games/GameCard](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Games/GameCard.tsx:19](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/components/Games/GameCard.tsx#L19)

ゲーム一覧に表示される個別のゲームカードコンポーネントです。
ゲームのサムネイル、タイトル、説明、プレイボタンを表示します。

## Parameters

### props

[`GameCardProps`](../../../../types/games/interfaces/GameCardProps.md)

コンポーネントのProps

## Returns

`Element`

## Remarks

- ローカルプレイとオンライン対戦の2つのボタンを提供します
- 開発環境（`NEXT_PUBLIC_ENV="local"`）では開発中のゲームも表示されます
- 利用不可のゲームモードはグレーアウトされたボタンで表示されます
