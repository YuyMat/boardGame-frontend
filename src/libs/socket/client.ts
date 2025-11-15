import { io, Socket } from "socket.io-client";
import { getBackendUrl } from "@/utils/getBackendUrl";

const backendUrl = getBackendUrl();

/**
 * バックエンドサーバーへのSocket.IO接続を作成します。
 * 環境変数に基づいて、ローカル環境または本番環境への接続を確立します。
 * 
 * @returns 設定済みのSocket.IOクライアントインスタンス
 * 
 * @remarks
 * - 環境変数`NEXT_PUBLIC_ENV`が`"local"`の場合はlocalhost:4000に接続します
 * - それ以外の場合は`NEXT_PUBLIC_BACKEND_URL`または デフォルトのRender URLに接続します
 * - `autoConnect: false`で作成されるため、使用前に`.connect()`を呼び出す必要があります
 * - WebSocketトランスポートを優先的に使用します
 */
export const createSocket = (): Socket => {
  return io(backendUrl, { transports: ["websocket"], autoConnect: false });
};
