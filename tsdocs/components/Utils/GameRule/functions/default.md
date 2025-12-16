[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/GameRule](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Utils/GameRule.tsx:22](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/components/Utils/GameRule.tsx#L22)

ゲームのルール設定を表示するモーダルコンポーネントです。
汎用的なルール設定の枠組みを提供し、具体的な設定項目は子コンポーネントとして受け取ります。

## Parameters

### props

[`RuleSettingsProps`](../../../../types/utils/type-aliases/RuleSettingsProps.md)

コンポーネントのProps

## Returns

`Element`

## Remarks

- モーダルを開くボタンを提供します
- モーダルヘッダー部分にプレイヤーの自分の色を表示します
- 具体的な設定内容は `settingsComponents` プロパティを通じて注入されます
