[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/CopyUrl](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Utils/CopyUrl.tsx:15](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/components/Utils/CopyUrl.tsx#L15)

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
