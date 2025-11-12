[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Connect4/TurnDisc](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: [components/Connect4/TurnDisc.tsx:15](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/components/Connect4/TurnDisc.tsx#L15)

Connect4ゲームで現在のターンを視覚的に表示するディスクコンポーネントです。
画面上部に現在のターンの色のディスクを表示します。

## Parameters

### props

コンポーネントのProps

#### currentRole

[`RoleState`](../../../../types/connect4/type-aliases/RoleState.md)

現在のターンのプレイヤー（Role.REDまたはRole.YELLOW）

## Returns

`Element`

## Remarks

- 赤のターンの場合は赤いディスク、黄色のターンの場合は黄色いディスクを表示します
- 画面上部中央に固定配置されます
