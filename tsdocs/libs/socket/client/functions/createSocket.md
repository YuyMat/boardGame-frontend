[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [libs/socket/client](../README.md) / createSocket

# Function: createSocket()

> **createSocket**(): `Socket`

Defined in: [libs/socket/client.ts:23](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/libs/socket/client.ts#L23)

バックエンドサーバーへのSocket.IO接続を作成します。
環境変数に基づいて、ローカル環境または本番環境への接続を確立します。

## Returns

`Socket`

設定済みのSocket.IOクライアントインスタンス

## Remarks

- 環境変数`NEXT_PUBLIC_ENV`が`"local"`の場合はlocalhost:4000に接続します
- それ以外の場合は`NEXT_PUBLIC_BACKEND_URL`または デフォルトのRender URLに接続します
- `autoConnect: false`で作成されるため、使用前に`.connect()`を呼び出す必要があります
- WebSocketトランスポートを優先的に使用します
