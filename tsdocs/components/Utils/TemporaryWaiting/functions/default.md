[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/TemporaryWaiting](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Utils/TemporaryWaiting.tsx:20](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/components/Utils/TemporaryWaiting.tsx#L20)

オンライン対戦で対戦相手の参加を待つ待機モーダルコンポーネントです。
メンバー数が2人未満の場合に自動的に表示されます。

## Parameters

### props

コンポーネントのProps

#### members

`number`

現在のルームメンバー数

## Returns

`Element`

## Remarks

- メンバー数が2人未満の場合にモーダルが表示されます
- ローディングスピナーで待機中であることを視覚的に示します
- 退出ボタンからトップページに戻ることができます
- 2人目が参加すると自動的にモーダルが閉じます
