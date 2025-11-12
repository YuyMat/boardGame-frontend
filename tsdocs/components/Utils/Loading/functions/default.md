[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/Loading](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Utils/Loading.tsx:15](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/components/Utils/Loading.tsx#L15)

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
