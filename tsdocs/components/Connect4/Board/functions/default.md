[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Connect4/Board](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Connect4/Board.tsx:29](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/components/Connect4/Board.tsx#L29)

Connect4ゲームの盤面全体を表示するメインコンポーネントです。
ボード、結果モーダル、ターン表示ディスクを含みます。

## Parameters

### props

[`BoardProps`](../../../../types/connect4/interfaces/BoardProps.md)

コンポーネントのProps

## Returns

`Element`

## Remarks

- 6行7列のConnect4ボードを表示します
- 最後に置かれた石は緑色のボーダーでハイライトされます
- ゲーム終了時に結果モーダルを表示します
