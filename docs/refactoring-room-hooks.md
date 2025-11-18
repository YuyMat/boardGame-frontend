# use◯◯Room のリファクタリング提案

## 📊 現状分析

### useConnect4Room / useReversiRoom
- **行数**: 約120行
- **複雑度**: 中程度

### 含まれる責務

1. **Socket接続管理** (47-92行)
   - Socket作成と接続
   - ルームへの参加
   - イベントリスナーの登録・解除
   - クリーンアップ処理

2. **ルーム状態管理**
   - members（メンバー数）
   - playerRole（プレイヤーの役割）
   - matchState（マッチング状態）
   - currentRole（現在のターン）

3. **マッチング処理**
   - `joinedRoom`イベントハンドラー
   - `roomPaired`イベントハンドラー
   - `membersUpdate`イベントハンドラー

4. **先手設定の同期** (95-98行)
   - firstRoleの変更をサーバーに送信

5. **Ref管理**
   - socketRef
   - membersRef
   - matchStateRef

---

## 🎯 リファクタリング推奨度: ⭐⭐⭐☆☆ (中程度)

### 推奨する理由

#### ✅ リファクタリングすべき理由

1. **責務の混在**
   - Socket接続、状態管理、マッチング処理が1つのフックに
   - 単一責任原則に反している

2. **テストの難しさ**
   - Socket接続とマッチングロジックを分離してテストできない
   - モックが複雑になる

3. **再利用性の低さ**
   - 他のゲームを追加する際、似たようなコードを書く必要がある
   - Connect4とReversiでほぼ同じコード（ゲーム名が違うだけ）

4. **将来の拡張性**
   - 新しいゲームを追加する際に、毎回120行のフックを書く必要がある

#### ⚠️ 優先度が中程度な理由

1. **`use◯◯Game`より短い**
   - 120行 vs 147-168行
   - まだ読める範囲

2. **比較的シンプル**
   - `use◯◯Game`ほど複雑なロジックはない
   - 主にSocket通信の管理のみ

3. **既に動いている**
   - バグがなければ急いで直す必要はない

---

## 💡 提案: 2つのアプローチ

### アプローチ1: 軽量リファクタリング（推奨度: ⭐⭐⭐⭐☆）

**概要**: 最小限の変更で、共通部分を抽出する

#### メリット
- 実装が簡単（1-2日）
- リスクが低い
- Connect4とReversiの共通化ができる

#### 構造

```
hooks/
  shared/
    useGameRoom.ts          # 共通ロジック（汎用的）
  connect4/
    useConnect4Room.ts      # Connect4固有の薄いラッパー
  reversi/
    useReversiRoom.ts       # Reversi固有の薄いラッパー
```

---

### アプローチ2: 完全リファクタリング（推奨度: ⭐⭐⭐☆☆）

**概要**: 責務ごとに完全に分割する（`use◯◯Game`と同じパターン）

#### メリット
- 各フックが単一責任を持つ
- テストしやすい
- 長期的な保守性が高い

#### デメリット
- 実装に時間がかかる（3-4日）
- ファイル数が増える
- `use◯◯Game`を先にリファクタリングすべき

#### 構造

```
hooks/
  connect4/
    useConnect4Room.ts              # メイン統合フック
    internal/
      useRoomConnection.ts          # Socket接続管理
      useRoomState.ts               # ルーム状態管理
      useRoomMatching.ts            # マッチング処理
      useFirstRoleSync.ts           # 先手設定同期
```

---

## 🎯 私の推奨: アプローチ1（軽量リファクタリング）

### 理由

1. **コスパが良い**
   - 少ない労力で大きな改善
   - Connect4とReversiの共通化ができる

2. **リスクが低い**
   - 既存のロジックをほぼそのまま移動するだけ
   - バグを生む可能性が低い

3. **段階的な改善**
   - まずは`use◯◯Game`をリファクタリング
   - その後、必要なら`use◯◯Room`も完全リファクタリング

4. **Connect4とReversiがほぼ同じ**
   - 2つのフックの違いは`"connect4"`と`"reversi"`の文字列のみ
   - 共通化することで重複コードを削減

---

## 📝 アプローチ1の実装例

### 1. 共通フックの作成

#### `hooks/shared/useGameRoom.ts`

```typescript
"use client"

import { useEffect, useRef, useState } from "react";
import { createSocket } from "@/libs/socket/client";
import type { Socket } from "socket.io-client";

/**
 * ゲームタイプ（connect4 | reversi）
 */
export type GameType = "connect4" | "reversi";

/**
 * ルーム状態の共通インターフェース
 */
export interface RoomState<RoleType> {
  members: number;
  playerRole: RoleType | null;
  matchState: "waiting" | "matched" | "playing";
  currentRole: RoleType;
}

/**
 * useGameRoomの引数
 */
export interface UseGameRoomProps<RoleType, FirstType> {
  roomId: string;
  gameType: GameType;
  initialRole: RoleType;
  firstRole: FirstType;
  setFirstRole: React.Dispatch<React.SetStateAction<FirstType>>;
  useUpdateEffectForFirstRole?: boolean; // Reversiの場合true
}

/**
 * Socket通信イベントのハンドラー型
 */
export interface RoomEventHandlers<RoleType> {
  onJoinedRoom: (data: { members: number; role: RoleType }) => void;
  onRoomPaired: (firstRole: RoleType) => void;
  onMembersUpdate: (data: { members: number }) => void;
}

/**
 * ゲームルームの共通ロジックを提供する汎用フック
 * Connect4とReversi両方で使用できる
 * 
 * @param props - ルーム管理に必要なパラメータ
 * @returns ルーム状態とSocket関連のオブジェクト
 */
export function useGameRoom<RoleType, FirstType>({
  roomId,
  gameType,
  initialRole,
  firstRole,
  setFirstRole,
  useUpdateEffectForFirstRole = false,
}: UseGameRoomProps<RoleType, FirstType>) {
  // 状態管理
  const [members, setMembers] = useState<number>(0);
  const [playerRole, setPlayerRole] = useState<RoleType | null>(null);
  const [matchState, setMatchState] = useState<"waiting" | "matched" | "playing">("waiting");
  const [currentRole, setCurrentRole] = useState<RoleType>(initialRole);

  // Ref管理
  const socketRef = useRef<Socket | null>(null);
  const membersRef = useRef<number>(0);
  const matchStateRef = useRef<"waiting" | "matched" | "playing">("waiting");

  // Socket接続とイベントリスナー設定
  useEffect(() => {
    let pairedTimer: ReturnType<typeof setTimeout> | null = null;
    const socket = createSocket();
    socketRef.current = socket;

    socket.connect();
    socket.emit("startRoom", roomId, gameType);

    // イベントハンドラー
    const handleJoinedRoom = ({ members, role }: { members: number; role: RoleType }) => {
      setMembers(members);
      membersRef.current = members;
      setPlayerRole((prev) => (prev ?? role));
    };

    const handleRoomPaired = (firstRole: RoleType) => {
      if (matchStateRef.current === "waiting") {
        setMatchState("matched");
        setFirstRole(firstRole as FirstType);
        setCurrentRole(firstRole);
        pairedTimer = setTimeout(() => {
          setMatchState("playing");
        }, 2000);
      }
    };

    const handleMembersUpdate = ({ members }: { members: number }) => {
      setMembers(members);
      membersRef.current = members;
    };

    // イベントリスナー登録
    socket.on("joinedRoom", handleJoinedRoom);
    socket.on("roomPaired", handleRoomPaired);
    socket.on("membersUpdate", handleMembersUpdate);

    // クリーンアップ
    return () => {
      if (pairedTimer !== null) {
        clearTimeout(pairedTimer);
      }
      socket.off("joinedRoom", handleJoinedRoom);
      socket.off("roomPaired", handleRoomPaired);
      socket.off("membersUpdate", handleMembersUpdate);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId, gameType]);

  // 先手設定の変更をサーバへ通知
  // Connect4: useEffect, Reversi: useUpdateEffect の違いを吸収
  useEffect(() => {
    if (!socketRef.current) return;
    
    // useUpdateEffectForFirstRole=trueの場合、初回は送信しない
    if (useUpdateEffectForFirstRole) {
      // Reversiの場合: useUpdateEffectの動作を再現
      // 初回マウント時はスキップ、2回目以降のみ実行
      const isInitialMount = useRef(true);
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
    }
    
    socketRef.current.emit("setFirstRole", { roomId, firstRole });
  }, [firstRole, roomId]);

  // matchStateRefの同期
  useEffect(() => {
    matchStateRef.current = matchState;
  }, [matchState]);

  // リスタート送信関数
  const emitRestart = () => {
    socketRef.current?.emit("restart", roomId);
  };

  return {
    socketRef,
    members,
    playerRole,
    matchState,
    setMatchState,
    membersRef,
    emitRestart,
    currentRole,
    setCurrentRole,
  };
}
```

---

### 2. Connect4用のラッパーフック

#### `hooks/connect4/useConnect4Room.ts` (リファクタリング後)

```typescript
"use client"

import { FirstState, RoleState } from "@/types/connect4";
import { Role } from "@/constants/connect4";
import { useGameRoom } from "@/hooks/shared/useGameRoom";

/**
 * Connect4ゲームのルーム管理とマッチング機能を提供するカスタムフックです。
 * Socket.IOを使用してルームへの参加、プレイヤーのマッチング、先手設定の同期を行います。
 * 
 * @param roomId - 参加するルームのID
 * @param setFirstRole - 先手設定を更新するセッター関数
 * @param firstRole - 現在の先手設定（'random' | Role.RED | Role.YELLOW）
 * 
 * @returns ルーム状態と操作関数を含むオブジェクト
 * 
 * @remarks
 * - 内部で共通フック`useGameRoom`を使用しています
 * - Connect4固有の設定（ゲームタイプ、初期ロール）を提供します
 */
export default function useConnect4Room(
  roomId: string,
  setFirstRole: React.Dispatch<React.SetStateAction<FirstState>>,
  firstRole: FirstState,
) {
  return useGameRoom<RoleState, FirstState>({
    roomId,
    gameType: "connect4",
    initialRole: Role.RED,
    firstRole,
    setFirstRole,
    useUpdateEffectForFirstRole: false, // Connect4はuseEffectを使用
  });
}

// 結果: 約30行（120行から90行削減！）
```

---

### 3. Reversi用のラッパーフック

#### `hooks/reversi/useReversiRoom.ts` (リファクタリング後)

```typescript
"use client"

import { FirstState, RoleState } from "@/types/reversi";
import { Role } from "@/constants/reversi";
import { useGameRoom } from "@/hooks/shared/useGameRoom";

/**
 * オセロゲームのルーム管理とマッチング機能を提供するカスタムフックです。
 * Socket.IOを使用してルームへの参加、プレイヤーのマッチング、先手設定の同期を行います。
 * 
 * @param roomId - 参加するルームのID
 * @param setFirstRole - 先手設定を更新するセッター関数
 * @param firstRole - 現在の先手設定（'random' | Role.BLACK | Role.WHITE）
 * 
 * @returns ルーム状態と操作関数を含むオブジェクト
 * 
 * @remarks
 * - 内部で共通フック`useGameRoom`を使用しています
 * - Reversi固有の設定（ゲームタイプ、初期ロール）を提供します
 * - useUpdateEffectを使用して先手設定の変更をサーバーに通知します
 */
export default function useReversiRoom(
  roomId: string,
  setFirstRole: React.Dispatch<React.SetStateAction<FirstState>>,
  firstRole: FirstState,
) {
  return useGameRoom<RoleState, FirstState>({
    roomId,
    gameType: "reversi",
    initialRole: Role.BLACK,
    firstRole,
    setFirstRole,
    useUpdateEffectForFirstRole: true, // ReversiはuseUpdateEffectを使用
  });
}

// 結果: 約30行（122行から92行削減！）
```

---

## 📊 リファクタリング効果

### Before（現状）

```
useConnect4Room.ts: 120行
useReversiRoom.ts: 122行
---
合計: 242行（重複コードあり）
```

### After（アプローチ1）

```
useGameRoom.ts: 約130行（共通ロジック）
useConnect4Room.ts: 約30行（ラッパー）
useReversiRoom.ts: 約30行（ラッパー）
---
合計: 190行（重複コードなし）

削減: 52行（21%削減）
```

### さらに: 新しいゲームを追加する場合

#### Before
- 新しいゲーム用に120行のフックを書く必要がある

#### After
- 30行のラッパーを書くだけでOK
- **90行（75%）の削減！**

---

## ⚠️ アプローチ1の注意点

### 1. useUpdateEffect の扱い

Connect4は`useEffect`、Reversiは`useUpdateEffect`を使っています。
共通フックでは`useUpdateEffectForFirstRole`フラグで切り替えています。

```typescript
// より良い実装案: カスタムフックで吸収
const useConditionalEffect = (
  effect: EffectCallback,
  deps: DependencyList,
  skipInitial: boolean
) => {
  const isInitialMount = useRef(true);
  
  useEffect(() => {
    if (skipInitial && isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    return effect();
  }, deps);
};
```

### 2. 型の共通化

`RoleState`と`FirstState`がConnect4とReversiで微妙に違う可能性があります。
ジェネリクスで柔軟に対応しています。

### 3. 既存のテストへの影響

ラッパーフックは既存のインターフェースを維持しているため、
既存のテストは**そのまま動作するはず**です。

---

## 🚀 実装手順

### ステップ1: 共通フックの作成（1日目）

1. `hooks/shared/`ディレクトリを作成
2. `useGameRoom.ts`を実装
3. 単体でテスト

### ステップ2: Connect4のリファクタリング（1日目）

1. 既存の`useConnect4Room.ts`をバックアップ
2. 新しい`useConnect4Room.ts`を実装（ラッパー）
3. 動作確認

### ステップ3: Reversiのリファクタリング（1日目）

1. 既存の`useReversiRoom.ts`をバックアップ
2. 新しい`useReversiRoom.ts`を実装（ラッパー）
3. 動作確認

### ステップ4: テストと修正（1日目）

1. 全テストを実行
2. バグがあれば修正
3. 実際にゲームをプレイして動作確認

**合計: 1-2日**

---

## 🎯 完全リファクタリング（アプローチ2）が必要になるケース

以下の場合は、アプローチ2（完全な責務分離）を検討：

1. **ルームロジックが複雑になってきた**
   - 3人以上のプレイヤー対応
   - 観戦者機能
   - チーム分け機能

2. **テストカバレッジを最大化したい**
   - Socket接続だけを独立してテスト
   - マッチングロジックだけを独立してテスト

3. **他のゲームが大きく異なる**
   - 共通フックで吸収できないほど違う

現状では、**アプローチ1で十分**だと思います。

---

## 📝 まとめ

### 推奨アプローチ: アプローチ1（軽量リファクタリング）

**推奨度: ⭐⭐⭐⭐☆**

#### 理由
1. ✅ 少ない労力で大きな効果
2. ✅ Connect4とReversiの重複を削減
3. ✅ 新しいゲーム追加が簡単に
4. ✅ リスクが低い
5. ✅ 1-2日で完了

#### 実装順序

```
1. use◯◯Gameのリファクタリング（優先度: 高）
   ↓
2. use◯◯Roomのリファクタリング（優先度: 中）← 今回の提案
   ↓
3. 必要なら完全リファクタリング（優先度: 低）
```

まずは`use◯◯Game`から始めて、その後`use◯◯Room`を改善するのが
**最も効率的なアプローチ**だと思います！
