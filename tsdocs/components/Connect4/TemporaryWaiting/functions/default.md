[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Connect4/TemporaryWaiting](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Connect4/TemporaryWaiting.tsx:21](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/components/Connect4/TemporaryWaiting.tsx#L21)

Connect4のオンライン対戦で対戦相手の参加を待つ待機モーダルコンポーネントです。
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
