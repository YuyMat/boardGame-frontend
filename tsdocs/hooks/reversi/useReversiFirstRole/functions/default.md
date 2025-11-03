[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [hooks/reversi/useReversiFirstRole](../README.md) / default

# Function: default()

> **default**(): `object`

Defined in: [hooks/reversi/useReversiFirstRole.ts:17](https://github.com/YuyMat/boardGame-frontend/blob/7dd50f5fe86bd0c3eeb130ed6337123e7f5495f9/src/hooks/reversi/useReversiFirstRole.ts#L17)

オセロゲームの先手プレイヤーの選択状態を管理するカスタムフックです。

## Returns

`object`

先手設定の状態と更新関数を含むオブジェクト
- `firstRole`: 現在の先手設定（'random' | Role.BLACK | Role.WHITE）
- `setFirstRole`: 先手設定を更新するセッター関数

### firstRole

> **firstRole**: [`FirstState`](../../../../types/reversi/type-aliases/FirstState.md)

### setFirstRole

> **setFirstRole**: `Dispatch`\<`SetStateAction`\<[`FirstState`](../../../../types/reversi/type-aliases/FirstState.md)\>\>

## Remarks

- 初期値は'random'（ランダムに先手を決定）です
- ゲーム開始前に先手プレイヤーを選択する機能を提供します
