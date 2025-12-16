[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/ReShowResult](../README.md) / default

# Function: default()

> **default**(`props`): `Element` \| `undefined`

Defined in: [components/Utils/ReShowResult.tsx:17](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/components/Utils/ReShowResult.tsx#L17)

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
