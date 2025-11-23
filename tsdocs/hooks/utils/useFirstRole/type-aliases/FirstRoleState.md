[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [hooks/utils/useFirstRole](../README.md) / FirstRoleState

# Type Alias: FirstRoleState\<RoleType\>

> **FirstRoleState**\<`RoleType`\> = `"random"` \| `RoleType`

Defined in: [hooks/utils/useFirstRole.ts:21](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/hooks/utils/useFirstRole.ts#L21)

ゲームの先手プレイヤーの選択状態を管理する汎用カスタムフックです。

各ゲーム固有の役割型（例: Connect4 の `RoleState`）を型引数として渡すことで、
`'random' | RoleType` という型で先手設定を扱えます。

## Type Parameters

### RoleType

`RoleType`

ゲームごとのプレイヤー役割の型

## Returns

先手設定の状態と更新関数を含むオブジェクト
- `firstRole`: 現在の先手設定（'random' | RoleType）
- `setFirstRole`: 先手設定を更新するセッター関数

## Remarks

- 初期値は 'random'（ランダムに先手を決定）です
- ゲーム開始前に先手プレイヤーを選択する機能を提供します
