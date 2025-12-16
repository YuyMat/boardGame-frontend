[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/Loading](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Utils/Loading.tsx:15](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/components/Utils/Loading.tsx#L15)

ウェーブアニメーション付きのローディングテキストコンポーネントです。
テキストの各文字が順番に波打つようにアニメーションします。

## Parameters

### props

コンポーネントのProps

#### text

`string`

表示するローディングテキスト

## Returns

`Element`

## Remarks

- テキストの各文字に順次遅延を適用してウェーブアニメーションを実現します
- マッチング待機中などに使用されます
- レスポンシブデザインに対応しています
