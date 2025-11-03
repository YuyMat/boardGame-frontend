[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [hooks/connect4/useConnect4FirstRole](../README.md) / default

# Function: default()

> **default**(): `object`

Defined in: [hooks/connect4/useConnect4FirstRole.ts:17](https://github.com/YuyMat/boardGame-frontend/blob/7dd50f5fe86bd0c3eeb130ed6337123e7f5495f9/src/hooks/connect4/useConnect4FirstRole.ts#L17)

Connect4ゲームの先手プレイヤーの選択状態を管理するカスタムフックです。

## Returns

`object`

先手設定の状態と更新関数を含むオブジェクト
- `firstRole`: 現在の先手設定（'random' | Role.RED | Role.YELLOW）
- `setFirstRole`: 先手設定を更新するセッター関数

### firstRole

> **firstRole**: [`FirstState`](../../../../types/connect4/type-aliases/FirstState.md)

### setFirstRole

> **setFirstRole**: `Dispatch`\<`SetStateAction`\<[`FirstState`](../../../../types/connect4/type-aliases/FirstState.md)\>\>

## Remarks

- 初期値は'random'（ランダムに先手を決定）です
- ゲーム開始前に先手プレイヤーを選択する機能を提供します
