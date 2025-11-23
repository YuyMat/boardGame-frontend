[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/GameRule](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Utils/GameRule.tsx:26](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/components/Utils/GameRule.tsx#L26)

ゲームのルール設定（先攻選択）を行うモーダルコンポーネントです。
ゲームの先攻を選択できます。

## Parameters

### props

[`RuleSettingsProps`](../../../../types/utils/type-aliases/RuleSettingsProps.md)

コンポーネントのProps

## Returns

`Element`

## Remarks

- モーダル内でドロップダウンから先攻プレイヤーを選択できます
- 選択肢：ランダム、または各ゲーム固有のプレイヤー（赤/黄、黒/白など）
- ゲーム開始前に先攻を決定するために使用されます
- 各ゲームで異なる色やラベルに対応できる汎用的な設計になっています
- メインプレイヤーの色表示は各ゲームのconstantsから渡されたCSSクラスで動的に変更されます
