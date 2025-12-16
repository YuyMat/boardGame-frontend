[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/CopyUrl](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Utils/CopyUrl.tsx:15](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/components/Utils/CopyUrl.tsx#L15)

ゲームの招待URLをクリップボードにコピーするボタンコンポーネントです。
コピー成功時に通知を表示します。

## Parameters

### props

コンポーネントのProps

#### gameName

`string`

ゲームの名前（コピーメッセージに含まれます）

## Returns

`Element`

## Remarks

- クリップボードにゲーム名と現在のURLを含むメッセージをコピーします
- コピー成功時にAnt Designの通知コンポーネントを使用して通知を表示します
- オンライン対戦時に友達を招待する際に使用されます
