[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Connect4/ReShowResult](../README.md) / default

# Function: default()

> **default**(`props`): `Element` \| `undefined`

Defined in: [components/Connect4/ReShowResult.tsx:17](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/components/Connect4/ReShowResult.tsx#L17)

ゲーム終了後に結果モーダルを再表示するためのボタンコンポーネントです。
結果モーダルを閉じた後でも、再度結果を確認できるようにします。

## Parameters

### props

[`ReShowResultProps`](../../../../types/connect4/interfaces/ReShowResultProps.md)

コンポーネントのProps

## Returns

`Element` \| `undefined`

## Remarks

- ゲームが終了（`canPlay=false`）していて、かつ結果モーダルが閉じている（`isWin=false`）場合のみ表示されます
- 画面上部中央に配置されます
