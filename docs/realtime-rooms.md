## Connect4: roomId で同じURL同士が対戦できる WebSocket 実装ガイド

このドキュメントは、`/connect4/[roomId]` にアクセスしているユーザー同士が Socket.IO を用いて同じルームで対戦できるようにする実装手順です。

- バックエンド: Node.js + Express + Socket.IO（Render にデプロイ）
- フロントエンド: Next.js App Router + Turbopack（Vercel にデプロイ）
- 言語: TypeScript

---

### 1. バックエンドの準備（Socket.IO でルーム同期）
ファイル: `backend/src/server.ts`

すでに Socket.IO サーバは用意済みです。以下の点を満たしていれば OK:

- CORS 設定（フロントのデプロイドメインを origin に設定）
- `joinRoom` イベントで `socket.join(roomId)` する
- 同一ルームへ向けたブロードキャスト（例: `io.to(roomId).emit(...)` or `socket.to(roomId).emit(...)`）

参考となるイベント一覧（最小構成）:

- `connection`: 接続時ハンドリング
- `joinRoom`: クライアントから roomId を受け取り入室
- `playerMove`: 盤面更新（列 index 等）を受け取り、ルームに中継
- `restart`: ルーム内の全員にリスタート通知

サンプル（概念）:
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

デプロイ時は Render 上で `PORT` を環境変数として設定し、`httpServer.listen(PORT)` を利用します。

---

### 2. フロントエンドの準備（Socket.IO クライアント）
依存追加（フロント）:

```bash
npm i socket.io-client
```

接続ユーティリティを作成します。

- 例: `frontend/src/libs/socket/client.ts`
- バックエンドのエンドポイント（ローカル: `http://localhost:4000` / 本番: Render の URL）へ接続
- `autoConnect: false` にしてページ入室時に明示的に connect

例:
```ts
import { io, Socket } from "socket.io-client";

const backendUrl = process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000";

export const createSocket = (): Socket => {
  const socket = io(backendUrl, { transports: ["websocket"], autoConnect: false });
  return socket;
};
```

`.env.local` に以下を用意（デプロイ時は Vercel の環境変数に設定）:
```
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

---

### 3. ルーム入室とイベント配線（`/connect4/[roomId]`）
ファイル: `frontend/src/app/(games)/connect4/[roomId]/page.tsx`

やること:
- ページマウント時に `createSocket()` → `socket.connect()`
- `roomId` で `joinRoom` を emit
- 自手のクリックはローカル反映 + `playerMove` を emit
- 相手の `opponentMove` を受けてローカル盤面を更新
- `restart` イベントでリセット
- アンマウント時に `socket.disconnect()`

重要なポイント:
- 先攻/後攻は「最初に入室した人を赤、次を黄」などルーム参加順で決める or URL クエリで指定
- ローカルでのターン進行とサーバからの相手手の適用が二重にならないように分岐

擬似実装例（概念）:
```ts
"use client";
import { useEffect, useRef, useState } from "react";
import { createSocket } from "@/libs/socket/client";
import { onCellClick as localOnCellClick } from "@/libs/connect4/onCellClick";
// ...省略: board, checkWin, onRestart の import

export default function Page({ params }: { params: { roomId: string } }) {
  const { roomId } = params;
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = createSocket();
    socketRef.current = socket;

    socket.connect();
    socket.emit("joinRoom", roomId);

    socket.on("opponentMove", ({ colIndex }) => {
      // 相手手をローカル盤面に適用（currentTurn 等は既存ロジックを再利用）
      localOnCellClick({ colIndex, /* state setters */ });
    });

    socket.on("restart", () => {
      // 既存 onRestart を呼ぶ
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId]);

  const onCellClick = (colIndex: number) => {
    // 自分の手をローカル適用
    localOnCellClick({ colIndex, /* state setters */ });
    // サーバに送信
    socketRef.current?.emit("playerMove", { roomId, colIndex });
  };

  // ...既存 UI をそのまま利用
}
```

---

### 4. 盤面更新ロジックの再利用
すでに `onCellClick`, `checkWin`, `onRestart` が存在しています。オンライン対戦では以下の観点で軽微な修正が必要になることがあります。

- `onCellClick` の引数に「この手がローカルプレイヤーの手か、相手の手か」を識別するフラグを追加し、`canPlay` の制御と二重適用を防止
- 相手手の適用時は「現在のターンが相手色であること」を満たすかチェック（ズレたら同期のやり直し or 直前盤面の再送）
- 盤面の完全同期が必要であれば、`playerMove` のたびにサーバで盤面を正規化して配信する方式も可（最初はクライアント主導で十分）

最小変更例（概念）:
```ts
export const onCellClick = ({ colIndex, canPlay, currentTurn, setCurrentTurn, setLastPosition, setBoard, isRemote }: OnCellClickProps & { isRemote?: boolean }) => {
  if (!isRemote && !canPlay) return; // 自手のときだけ canPlay を見る
  setBoard((prev) => {
    // ...既存ロジック
  });
};
```

---

### 5. 再戦（リスタート）同期
- 自分が UI で再戦を押したら `restart` を emit
- 受け取った側も `onRestart` を呼ぶ

```ts
const onRestartClick = () => {
  onRestart({ /* setters */ });
  socketRef.current?.emit("restart", roomId);
};
```

---

### 6. ローカル開発と本番デプロイ

- 開発:
  - Backend: `npm run dev`（ポート: 4000）
  - Frontend: `npm run dev`（ポート: 3000）
  - `NEXT_PUBLIC_SOCKET_URL=http://localhost:4000`

- 本番:
  - Backend: Render にデプロイ。`PORT` は Render が割り当てる値を使用
  - Frontend: Vercel にデプロイ。環境変数 `NEXT_PUBLIC_SOCKET_URL` に Render の公開 URL を設定
  - CORS 設定で Vercel のドメインを許可

---

### 7. イベント仕様（提案）
- `joinRoom(roomId: string)`
- `playerMove({ roomId: string, colIndex: number })`
- `opponentMove({ colIndex: number })`
- `restart(roomId: string)` / `restart`
- `userJoined({ socketId: string })`

後方互換を守りやすいよう、最低限のペイロードに留めています。必要があれば `playerId` や `turn` などを拡張してください。

---

### 8. よくあるつまづき
- フロントとバックエンドの URL を取り違えて接続できない（`NEXT_PUBLIC_SOCKET_URL` を確認）
- CORS でブロックされる（バックエンドの `origin` に本番の URL を設定）
- 二重適用（自手と相手手の処理分岐、`isRemote` フラグで防止）
- ルーム未参加のまま `playerMove` を emit（入室完了後に操作を許可）

---

以上で、同じ `roomId` URL のユーザー同士がリアルタイムで対戦するための最小構成が整います。運用でズレが発生する場合は、サーバ側で公式盤面を保持して authoritative に同期する方式へ発展させてください。
