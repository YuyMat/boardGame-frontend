[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/ReShowResult](../README.md) / default

# Function: default()

> **default**(`props`): `Element` \| `undefined`

Defined in: [components/Utils/ReShowResult.tsx:17](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/components/Utils/ReShowResult.tsx#L17)

ゲーム終了後に結果モーダルを再表示するためのボタンコンポーネントです。
結果モーダルを閉じた後でも、再度結果を確認できるようにします。

## Parameters

### props

[`ReShowResultProps`](../../../../types/utils/interfaces/ReShowResultProps.md)

コンポーネントのProps

## Returns

`Element` \| `undefined`

## Remarks

- ゲームが終了（`canPlay=false`）していて、かつ結果モーダルが閉じている（`openModal=false`）場合のみ表示されます
- 画面上部中央に配置されます
