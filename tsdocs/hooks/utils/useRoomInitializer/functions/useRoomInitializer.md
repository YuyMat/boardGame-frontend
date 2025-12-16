[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [hooks/utils/useRoomInitializer](../README.md) / useRoomInitializer

# Function: useRoomInitializer()

> **useRoomInitializer**(`gamePath`): `object`

Defined in: [hooks/utils/useRoomInitializer.ts:12](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/hooks/utils/useRoomInitializer.ts#L12)

ルーム作成前の初期化プロセスを管理するフック

## Parameters

### gamePath

`string`

ゲームのパス名 (例: "reversi", "connect4")

## Returns

`object`

バックエンドのヘルスチェック状態

### isBackendHealthy

> **isBackendHealthy**: `boolean` \| `null`
