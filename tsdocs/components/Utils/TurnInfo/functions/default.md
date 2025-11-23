[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [components/Utils/TurnInfo](../README.md) / default

# Function: default()

> **default**(`props`): `Element` \| `undefined`

Defined in: [components/Utils/TurnInfo.tsx:20](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/components/Utils/TurnInfo.tsx#L20)

現在のターンを表示するコンポーネントです。

## Parameters

### props

[`TurnInfoProps`](../../../../types/reversi/interfaces/TurnInfoProps.md)

コンポーネントのProps

## Returns

`Element` \| `undefined`

## Remarks

- 汎用的なターン表示コンポーネントとして、Reversi以外のゲームでも使用可能です。
- `currentRole` が `Role.MAIN` の場合は `mainRole` と `mainRoleColorClass` を使用し、
  それ以外の場合は `subRole` と `subRoleColorClass` を使用します。
