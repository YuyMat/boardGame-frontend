### 初心者向け: roomId（URL）で同じ人同士が対戦するしくみ（Socket.IO）

このガイドは「同じ URL（例: `/connect4/abc`）を開いた 2 人が、リアルタイムに対戦できる」機能を、最短手順で作るための解説です。難しい言葉はなるべく使わず、順番に進めるだけで動くようにまとめました。

- **バックエンド**: Node.js + Express + Socket.IO（Render にデプロイ）
- **フロントエンド**: Next.js App Router + Turbopack（Vercel にデプロイ）
- **言語**: TypeScript

---

### ゴールのイメージ（まずここを掴む）
- URL が `/connect4/[roomId]` になっています。
- 例えば 2 人が同じ `/connect4/abc` を開くと、両方とも「abc というルーム」に入ります。
- どちらかが盤面をクリックすると、もう一方にも同じ動きがすぐに反映されます。

これを実現するために、**Socket.IO** を使って、ブラウザとサーバのあいだでメッセージを送り合います。

---

### ステップ0: 事前準備（動作環境）
- バックエンド: `backend` ディレクトリで起動します（ポート 4000）。
- フロントエンド: `frontend` ディレクトリで起動します（ポート 3000）。

まずフロントエンドに Socket.IO のクライアントを入れます。

```bash
cd frontend
npm i socket.io-client
```

それから、フロントがサーバの URL を知れるように、環境変数を設定します。

- `frontend/.env.local` に次を追加（ローカル開発用）
```
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

---

### ステップ1: バックエンドの考え方（もう用意済み）
`backend/src/server.ts` はすでに Socket.IO サーバを立てています。最低限、次ができれば OK です。

- クライアントが送る `joinRoom(roomId)` を受け取り、`socket.join(roomId)` で入室させる。
- 誰かが打った手（列番号）を `playerMove` で受け取り、同じルームの相手に `opponentMove` を送る。
- 再戦ボタン（リスタート）を押したら `restart` をルーム全員に送る。

イメージ（概念のコード）:
```ts
io.on("connection", (socket) => {
  socket.on("joinRoom", (roomId: string) => {
    socket.join(roomId);
    socket.to(roomId).emit("userJoined", { socketId: socket.id });
  });

  socket.on("playerMove", ({ roomId, colIndex }) => {
    socket.to(roomId).emit("opponentMove", { colIndex });
  });

  socket.on("restart", (roomId: string) => {
    io.to(roomId).emit("restart");
  });
});
```

ポイント:
- 本番（Render）では `PORT` 環境変数で起動します。
- CORS の `origin` にフロント（Vercel ドメイン）を許可してください。

---

### ステップ2: フロントでサーバに繋ぐ小さな部品を作る
ソケット接続の小さなユーティリティを作ります。

- 例: `frontend/src/libs/socket/client.ts`

```ts
import { io, Socket } from "socket.io-client";

const backendUrl = process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000";

export const createSocket = (): Socket => {
  // 初心者向けポイント: autoConnect を false にして、明示的に connect します
  return io(backendUrl, { transports: ["websocket"], autoConnect: false });
};
```

---

### ステップ3: ルームに入って、手を送る/受け取る
対戦ページ（`/connect4/[roomId]`）に、以下の 3 つを足します。

1) ページ表示時にサーバへ接続し、`joinRoom(roomId)` を送る。
2) 自分がクリックしたら、ローカルの盤面を更新して、`playerMove` をサーバに送る。
3) 相手から `opponentMove` を受け取ったら、ローカルの盤面に反映する。

概念のコード（やることの流れ）:
```ts
"use client";
import { useEffect, useRef } from "react";
import { createSocket } from "@/libs/socket/client";
import { onCellClick as applyMove } from "@/libs/connect4/onCellClick";

export default function Page({ params }: { params: { roomId: string } }) {
  const { roomId } = params;
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = createSocket();
    socketRef.current = socket;

    socket.connect();
    socket.emit("joinRoom", roomId);

    // 相手の手を受け取ったら、自分の盤面に反映
    socket.on("opponentMove", ({ colIndex }) => {
      applyMove({ colIndex, /* 既存の state 更新関数を渡す */ });
    });

    // ルーム内の誰かがリスタートしたら、自分もリスタート
    socket.on("restart", () => {
      // onRestart({ ... }) を呼ぶ
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId]);

  // クリック時: 盤面に反映して、サーバにも送る
  const onCellClick = (colIndex: number) => {
    applyMove({ colIndex, /* 既存の state 更新関数を渡す */ });
    socketRef.current?.emit("playerMove", { roomId, colIndex });
  };

  // 既存の Board コンポーネントに onCellClick を渡すだけで OK
}
```

---

### ステップ4: 既存ロジックの活かし方（大きく変えない）
このプロジェクトにはすでに以下があります。
- `onCellClick`: クリック時の盤面更新
- `checkWin`: 勝ち判定
- `onRestart`: 盤面リセット

オンライン対戦では「自分の手」と「相手の手」が混ざるので、次の工夫をすると安全です。

- `onCellClick` に「相手の手かどうか」を示すフラグ（例: `isRemote`）を任意で追加
- 自分の手のときだけ `canPlay` を見る、などの条件分け

イメージ:
```ts
export const onCellClick = ({ colIndex, canPlay, currentTurn, setCurrentTurn, setLastPosition, setBoard, isRemote }: OnCellClickProps & { isRemote?: boolean }) => {
  if (!isRemote && !canPlay) return; // 自分の手のときだけ制限をかける
  setBoard((prev) => {
    // 既存のロジックそのまま
    return prev; // 実際は既存処理を残す
  });
};
```

---

### ステップ5: 再戦（リスタート）の同期
- 自分が再戦ボタンを押したら、まずローカルで `onRestart` を呼びます。
- それと同時に `restart(roomId)` をサーバへ送ります。
- 相手はサーバ経由で `restart` を受け取り、`onRestart` を呼びます。

```ts
const onRestartClick = () => {
  onRestart({ /* 既存の state 更新関数を渡す */ });
  socketRef.current?.emit("restart", roomId);
};
```

---

### ステップ6: 動作確認のやり方（超重要）
1. バックエンド: `cd backend && npm run dev`（ポート: 4000）
2. フロント: `cd frontend && npm run dev`（ポート: 3000）
3. ブラウザを 2 つ用意して、両方で `http://localhost:3000/connect4/test` を開く
4. 片方で盤面をクリック → もう片方に同じ手が反映されれば成功

うまく動かないときは次をチェック:
- **URL の roomId が一致しているか**（例: 2 つとも `/connect4/test` か）
- **`NEXT_PUBLIC_SOCKET_URL` が合っているか**（ローカルなら `http://localhost:4000`）
- **バックエンド/フロントが両方起動しているか**

---

### ステップ7: 本番デプロイのポイント
- バックエンド（Render）
  - `PORT` は Render が自動で割り当てます。`httpServer.listen(PORT)` を使う。
  - CORS の `origin` に Vercel の URL を許可します。
- フロント（Vercel）
  - 環境変数 `NEXT_PUBLIC_SOCKET_URL` に Render の公開 URL を設定します。

---

### よくあるエラーと対処
- **接続できない（connection refused）**: バックエンドが起動していない / URL が違う。
- **CORS エラー**: バックエンドの `cors.origin` にデプロイ先ドメインを追加。
- **二重に手が入る**: `onCellClick` に `isRemote` を導入し、相手の手と自分の手を分ける。
- **ルーム未参加で送信している**: `socket.emit("joinRoom", roomId)` の後から操作を許可。

---

これで、同じ `roomId` を開いたユーザー同士がリアルタイムで対戦できる最小構成が完成です。まずはこの形で動かし、慣れてきたら「先攻/後攻の決め方」や「サーバ側で公式盤面を持つ方式」などを発展させてください。
