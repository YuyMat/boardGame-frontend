## hooks/connect4 ユニットテスト設計

このドキュメントは `src/hooks/connect4` 配下の各カスタムフックに対するユニットテスト項目をまとめたものです。
実装は Vitest と React Testing Library の `renderHook` を用い、テストファイルは `src/tests/UnitTests/hooks/connect4` 配下に作成します。

---

## 1. `useConnect4FirstRole`

前提:  
先手プレイヤーの選択状態を管理するシンプルな状態管理フック。

- **初期値の検証**
  - `useConnect4FirstRole()` を実行すると、`firstRole` の初期値が `"random"` であること
  - `setFirstRole` が関数として存在すること
- **状態更新の検証**
  - `setFirstRole(Role.RED)` を呼び出すと、`firstRole` が `Role.RED` に更新されること
  - `setFirstRole(Role.YELLOW)` を呼び出すと、`firstRole` が `Role.YELLOW` に更新されること
  - `setFirstRole("random")` を呼び出すと、`firstRole` が `"random"` に更新されること
- **再レンダリングの確認**
  - `setFirstRole` を連続で複数回呼び出しても、正しく状態が更新されること

---

## 2. `useConnect4Game`

前提:  
ゲームロジックとSocket.IOによるリアルタイム同期を管理する複雑なフック。  
Socket.IOクライアントはモック化し、libs関数（`createEmptyBoard`, `checkWin`, `checkDraw`, `onCellClick`）の呼び出しも検証する。

### 2-1. 初期状態の検証

- **初期値の確認**
  - `board` が `createEmptyBoard()` の結果と同じ構造（6行7列のnull配列）であること
  - `currentRole` が初期値（propsで渡された値）と一致すること
  - `isWin` が `false` であること
  - `canPlay` が `true` であること
  - `isDraw` が `false` であること
  - `lastPosition` が `{ row: null, col: null }` であること
- **返り値の型確認**
  - `onCellClick` が関数であること
  - `setIsWin` が関数であること

### 2-2. セルクリック時の動作

- **自分のターンでのクリック**
  - `playerRole === currentRole` かつ `canPlay === true` の状態で `onCellClick(0)` を呼び出すと、`onCellClick` lib関数が適切なパラメータで呼ばれること
  - `canPlay` パラメータが `true` になっていること
- **相手のターンでのクリック**
  - `playerRole !== currentRole` の状態で `onCellClick(0)` を呼び出すと、`onCellClick` lib関数の `canPlay` パラメータが `false` になること
  - ボードが更新されないこと
- **`canPlay = false` の状態でのクリック**
  - `canPlay` が `false` の状態で `onCellClick(0)` を呼び出すと、ボードが更新されないこと

### 2-3. Socket.IOイベントリスナー

#### 2-3-1. `boardUpdated` イベント

- **盤面の同期受信**
  - Socket.IOから `boardUpdated` イベントを受信すると、`board` が受信したボードに更新されること
  - `currentRole` が受信したロールに更新されること
  - `lastPosition` が受信した位置に更新されること
- **suppressSyncRef の動作**
  - `boardUpdated` イベント受信後、次の盤面変更時に `syncBoard` が送信されないこと（無限ループ防止）
  - その次の自分の操作時には `syncBoard` が正常に送信されること

#### 2-3-2. `restart` イベント

- **メンバーが2人の場合のリスタート**
  - `membersRef.current === 2` の状態で `restart` イベントを受信すると:
    - `isWin` が `false` にリセットされること
    - `board` が `createEmptyBoard()` の結果にリセットされること
    - `currentRole` が受信した `firstRole` に設定されること
    - `lastPosition` が `{ row: null, col: null }` にリセットされること
    - `canPlay` が `true` にリセットされること
    - `isDraw` が `false` にリセットされること
- **メンバーが1人の場合のリスタート**
  - `membersRef.current === 1` の状態で `restart` イベントを受信すると:
    - `setMatchState("waiting")` が呼ばれること
    - その他の状態はリセットされないこと

#### 2-3-3. クリーンアップ

- **アンマウント時のリスナー解除**
  - フックがアンマウントされると、`boardUpdated` と `restart` のイベントリスナーが解除されること

### 2-4. 盤面同期の送信

- **`matchState === "playing"` の場合**
  - `board`, `currentRole`, `lastPosition` のいずれかが変更されると、`syncBoard` イベントが送信されること
  - 送信されるデータに `roomId`, `board`, `currentRole`, `lastPosition` が含まれること
- **`matchState !== "playing"` の場合**
  - `board` が変更されても `syncBoard` イベントが送信されないこと
- **初期レンダリング時**
  - 初回レンダリング時には `syncBoard` が送信されないこと（suppressSyncRef の初期制御）

### 2-5. 勝敗判定・引き分け判定の統合

- **勝利条件の達成**
  - `board` が変更され、`checkWin` が `true` を返す状態になったとき:
    - `canPlay` が `false` になること
    - 約200ms後に `isWin` が `true` になること
    - タイマーがクリーンアップされること（アンマウント時）
- **引き分け条件の達成**
  - `board` が変更され、`checkDraw` が `true` を返す状態になったとき:
    - `canPlay` が `false` になること
    - `isDraw` が `true` になること
    - 約200ms後に `isWin` が `true` になること
- **勝敗なしの場合**
  - `checkWin` も `checkDraw` も `false` の場合、`canPlay` と `isWin` の状態が変わらないこと

---

## 3. `useConnect4Room`

前提:  
ルーム管理、Socket.IO接続、マッチングを担当する複雑なフック。  
`createSocket` 関数をモック化し、Socket.IOイベントの送受信を検証する。

### 3-1. 初期状態とSocket.IO接続

- **初期値の確認**
  - `members` が `0` であること
  - `playerRole` が `null` であること
  - `matchState` が `"waiting"` であること
  - `currentRole` が `Role.RED` であること
  - `socketRef.current` が Socket インスタンスであること
- **Socket.IO接続の確認**
  - マウント時に `createSocket()` が呼ばれること
  - `socket.connect()` が呼ばれること
  - `socket.emit("startRoom", roomId, "connect4")` が呼ばれること

### 3-2. Socket.IOイベントリスナー

#### 3-2-1. `joinedRoom` イベント

- **ルーム参加時の状態更新**
  - `joinedRoom` イベントを受信すると、`members` が受信した値に更新されること
  - `membersRef.current` が受信した値に更新されること
  - `playerRole` が最初に受信したロールに設定されること
- **ロールの上書き防止**
  - `playerRole` が既に設定されている状態で `joinedRoom` イベントを受信しても、`playerRole` が変更されないこと

#### 3-2-2. `roomPaired` イベント

- **マッチング成立時の状態遷移**
  - `matchState === "waiting"` の状態で `roomPaired` イベントを受信すると:
    - `matchState` が `"matched"` に変更されること
    - `firstRole` が受信した値に設定されること（`setFirstRole` が呼ばれること）
    - `currentRole` が受信した値に設定されること
    - 約2000ms後に `matchState` が `"playing"` に変更されること
- **マッチング後の重複防止**
  - `matchState !== "waiting"` の状態で `roomPaired` イベントを受信しても、状態が変更されないこと

#### 3-2-3. `membersUpdate` イベント

- **メンバー数の動的更新**
  - `membersUpdate` イベントを受信すると、`members` が更新されること
  - `membersRef.current` が更新されること

### 3-3. 先手設定の同期

- **`firstRole` 変更時の送信**
  - `firstRole` が変更されると、`socket.emit("setFirstRole", { roomId, firstRole })` が呼ばれること
  - 初回レンダリング時も送信されること（useEffect）
- **Socket未接続時の処理**
  - `socketRef.current` が `null` の場合、`setFirstRole` イベントが送信されないこと

### 3-4. リスタート機能

- **`emitRestart` の実行**
  - `emitRestart()` を呼び出すと、`socket.emit("restart", roomId)` が呼ばれること
- **Socket未接続時の安全性**
  - `socketRef.current` が `null` の場合、エラーが発生しないこと（Optional chaining）

### 3-5. クリーンアップ処理

- **アンマウント時の処理**
  - アンマウント時に `pairedTimer` がクリアされること（`clearTimeout`）
  - `socket.off("joinedRoom")` が呼ばれること
  - `socket.off("roomPaired")` が呼ばれること
  - `socket.off("membersUpdate")` が呼ばれること
  - `socket.disconnect()` が呼ばれること
  - `socketRef.current` が `null` になること
- **タイマーのクリーンアップ**
  - マッチング成立後、アンマウントされた場合に `pairedTimer` が適切にクリアされること

---

## 4. テスト実装方針メモ

- テストランナー: Vitest（`package.json` の `test` スクリプトを使用）
- テストライブラリ: React Testing Library の `renderHook`
- テストディレクトリ: `src/tests/UnitTests/hooks/connect4`
- 各フックごとに以下のような構成を想定
  - `connect4/useConnect4FirstRole.test.ts`
  - `connect4/useConnect4Game.test.ts`
  - `connect4/useConnect4Room.test.ts`
- **モック化が必要なもの**
  - `@/libs/socket/client` の `createSocket`
  - Socket.IOクライアントインスタンス（`on`, `off`, `emit`, `connect`, `disconnect`）
  - `@/libs/connect4` の各関数（必要に応じて）
  - Next.jsの `useRouter`（`useConnect4Game`では不要だが、統合テストでは必要な場合あり）
- **タイマーのテスト**
  - `vi.useFakeTimers()` を使用してタイマーをモック化
  - `vi.advanceTimersByTime()` で時間を進める
