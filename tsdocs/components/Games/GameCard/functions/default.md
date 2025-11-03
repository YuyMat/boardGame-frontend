[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Games/GameCard](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Games/GameCard.tsx:23](https://github.com/YuyMat/boardGame-frontend/blob/7dd50f5fe86bd0c3eeb130ed6337123e7f5495f9/src/components/Games/GameCard.tsx#L23)

ゲーム一覧に表示される個別のゲームカードコンポーネントです。
ゲームのサムネイル、タイトル、説明、プレイボタンを表示します。

## Parameters

### props

`GameCardProps`

コンポーネントのProps

## Returns

`Element`

## Remarks

- ローカルプレイとオンライン対戦の2つのボタンを提供します
- 開発環境（`NEXT_PUBLIC_ENV="local"`）では開発中のゲームも表示されます
- 利用不可のゲームモードはグレーアウトされたボタンで表示されます
