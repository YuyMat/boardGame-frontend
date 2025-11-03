[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/GameRule](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Utils/GameRule.tsx:21](https://github.com/YuyMat/boardGame-frontend/blob/7dd50f5fe86bd0c3eeb130ed6337123e7f5495f9/src/components/Utils/GameRule.tsx#L21)

ゲームのルール設定（先攻選択）を行うモーダルコンポーネントです。
Connect4ゲームの先攻を選択できます。

## Parameters

### props

コンポーネントのProps

#### setFirst

`Dispatch`\<`SetStateAction`\<[`FirstState`](../../../../types/connect4/type-aliases/FirstState.md)\>\>

先攻設定を更新するセッター関数

## Returns

`Element`

## Remarks

- モーダル内でドロップダウンから先攻プレイヤーを選択できます
- 選択肢：ランダム、赤、黄
- ゲーム開始前に先攻を決定するために使用されます
