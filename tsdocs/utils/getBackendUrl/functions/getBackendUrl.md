[**frontend v0.1.0**](../../../README.md)

***

[frontend](../../../modules.md) / [utils/getBackendUrl](../README.md) / getBackendUrl

# Function: getBackendUrl()

> **getBackendUrl**(): `string`

Defined in: [utils/getBackendUrl.ts:10](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/utils/getBackendUrl.ts#L10)

バックエンドサーバーのURLを環境に応じて取得します

## Returns

`string`

バックエンドサーバーのURL

## Remarks

- 環境変数`NEXT_PUBLIC_ENV`が`"local"`の場合はlocalhost:4000を返します
- それ以外の場合は`NEXT_PUBLIC_BACKEND_URL`または デフォルトのRender URLを返します
