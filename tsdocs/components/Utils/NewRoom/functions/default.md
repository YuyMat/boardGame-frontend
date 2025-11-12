[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/NewRoom](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Utils/NewRoom.tsx:23](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/components/Utils/NewRoom.tsx#L23)

新規ルーム作成用のコンポーネント

## Parameters

### props

コンポーネントのプロパティ

#### gameName

`string`

ゲームの名前（例: "reversi", "connect4"）

## Returns

`Element`

新規ルーム作成ボタンを含むReact要素

## Description

指定されたゲームの新規ルーム作成ページへ遷移するボタンを表示します。
ボタンをクリックすると、`/{gameName}/newRoom` のパスへナビゲートします。

## Example

```tsx
<NewRoom gameName="reversi" />
```
