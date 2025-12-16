[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/NewRoom](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Utils/NewRoom.tsx:22](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/components/Utils/NewRoom.tsx#L22)

新規ルーム作成用のコンポーネント

指定されたゲームの新規ルーム作成ページへ遷移するボタンを表示します。
ボタンをクリックすると、`/{gameName}/newRoom` のパスへナビゲートします。

## Parameters

### props

コンポーネントのプロパティ

#### gameName

`string`

ゲームの名前（例: "reversi", "connect4"）

## Returns

`Element`

新規ルーム作成ボタンを含むReact要素

## Example

```tsx
<NewRoom gameName="reversi" />
```
