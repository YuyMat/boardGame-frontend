[**frontend v0.1.0**](../../../README.md)

***

[frontend](../../../modules.md) / [utils/getBackendUrl](../README.md) / getBackendUrl

# Function: getBackendUrl()

> **getBackendUrl**(): `string`

Defined in: [utils/getBackendUrl.ts:10](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/utils/getBackendUrl.ts#L10)

バックエンドサーバーのURLを環境に応じて取得します

## Returns

`string`

バックエンドサーバーのURL

## Remarks

- 環境変数`NEXT_PUBLIC_ENV`が`"local"`の場合はlocalhost:4000を返します
- それ以外の場合は`NEXT_PUBLIC_BACKEND_URL`または デフォルトのRender URLを返します
