## hooks/reversi ユニットテスト設計

このドキュメントは `src/hooks/reversi` 配下の各カスタムフックに対するユニットテスト項目をまとめたものです。
実装は Vitest と React Testing Library の `renderHook` を用い、テストファイルは `src/tests/UnitTests/hooks/reversi` 配下に作成します。

---

## 1. `useReversiFirstRole`

前提:  
先手プレイヤーの選択状態を管理するシンプルな状態管理フック。

- **初期値の検証**
  - `useReversiFirstRole()` を実行すると、`firstRole` の初期値が `"random"` であること
  - `setFirstRole` が関数として存在すること
- **状態更新の検証**
  - `setFirstRole(Role.BLACK)` を呼び出すと、`firstRole` が `Role.BLACK` に更新されること
  - `setFirstRole(Role.WHITE)` を呼び出すと、`firstRole` が `Role.WHITE` に更新されること
  - `setFirstRole("random")` を呼び出すと、`firstRole` が `"random"` に更新されること
- **再レンダリングの確認**
  - `setFirstRole` を連続で複数回呼び出しても、正しく状態が更新されること

---

## 2. `useReversiGame`

前提:  
ゲームロジック、合法手のハイライト、Socket.IOによるリアルタイム同期を管理する複雑なフック。  
Socket.IOクライアントはモック化し、libs関数（`createEmptyBoard`, `createEmptyHighlightedBoard`, `checkWin`, `countStones`, `onCellClick`）の呼び出しも検証する。

### 2-1. 初期状態の検証

- **初期値の確認**
  - `board` が `createEmptyBoard()` の結果と同じ構造（8行8列、中央4マスに初期配置）であること
  - `currentRole` が初期値（propsで渡された値）と一致すること
  - `isWin` が `false` であること
  - `canPlay` が `true` であること
  - `lastPosition` が `{ row: null, col: null }` であること
  - `highlightedCells` が `createEmptyHighlightedBoard()` の結果（8x8のfalse配列）であること
  - `isSkipTurn` が `false` であること
- **Refの初期値確認**
  - `blackCount.current` が `0` であること（初回レンダリング時）
  - `whiteCount.current` が `0` であること（初回レンダリング時）
- **返り値の型確認**
  - `onCellClick` が関数であること
  - `setIsWin` が関数であること

### 2-2. セルクリック時の動作

- **自分のターンで合法手をクリック**
  - `playerRole === currentRole` かつ `canPlay === true` かつ `highlightedCells[row][col] === true` の状態で `onCellClick(row, col)` を呼び出すと、`onCellClick` lib関数が適切なパラメータで呼ばれること
  - `canPlay` パラメータが `true` になっていること
- **相手のターンでのクリック**
  - `playerRole !== currentRole` の状態で `onCellClick(row, col)` を呼び出すと、`onCellClick` lib関数の `canPlay` パラメータが `false` になること
  - ボードが更新されないこと
- **非合法手のクリック**
  - `highlightedCells[row][col] === false` のセルをクリックしても、ボードが更新されないこと
- **`canPlay = false` の状態でのクリック**
  - `canPlay` が `false` の状態で `onCellClick(row, col)` を呼び出すと、ボードが更新されないこと

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
- **メンバーが1人の場合のリスタート**
  - `membersRef.current === 1` の状態で `restart` イベントを受信すると:
    - `setMatchState("waiting")` が呼ばれること
    - その他の状態はリセットされないこと

#### 2-3-3. クリーンアップ

- **アンマウント時のリスナー解除**
  - フックがアンマウントされると、`boardUpdated` と `restart` のイベントリスナーが解除されること

### 2-4. 盤面同期の送信

- **`matchState === "playing"` の場合**
  - `board` または `lastPosition` が変更されると、`syncBoard` イベントが送信されること
  - 送信されるデータに `roomId`, `board`, `currentRole`, `lastPosition` が含まれること
- **`matchState !== "playing"` の場合**
  - `board` が変更されても `syncBoard` イベントが送信されないこと
- **初期レンダリング時**
  - 初回レンダリング時には `syncBoard` が送信されないこと（suppressSyncRef の初期制御）

### 2-5. 勝敗判定・ハイライト更新の統合

#### 2-5-1. 石のカウント

- **`board` 変更時の石のカウント**
  - `board` が変更されると、`countStones(board)` が呼ばれること
  - `blackCount.current` と `whiteCount.current` が更新されること

#### 2-5-2. スキップターンの処理

- **初回スキップターン**
  - `isSkipTurn` が `true` になったとき、`skipTurnRef.current` が `true` になること
  - `isSkipTurn` の状態は維持されること（まだ `false` にリセットされない）
- **連続スキップターン（ゲーム終了）**
  - `skipTurnRef.current === true` かつ `isSkipTurn === true` のとき:
    - `isSkipTurn` が `false` にリセットされること
    - `skipTurnRef.current` が `false` にリセットされること

#### 2-5-3. 勝敗判定

- **ゲーム終了条件の達成**
  - `board` が変更され、`checkWin` が `true` を返す状態になったとき:
    - `highlightedCells` が全て `false` の空配列にリセットされること
    - `canPlay` が `false` になること
    - 約200ms後に `isWin` が `true` になること
    - タイマーがクリーンアップされること（アンマウント時）
- **ゲーム続行の場合**
  - `checkWin` が `false` の場合、`canPlay` と `isWin` の状態が変わらないこと
  - `checkWin` 内で `setHighlightedCells` が呼ばれ、合法手がハイライトされること

#### 2-5-4. 相手ターン時のハイライトクリア

- **相手のターンでのハイライト処理**
  - `matchState === "playing"` かつ `playerRole !== currentRole` のとき:
    - `highlightedCells` が全て `false` の空配列になること

---

## 3. `useReversiRoom`

前提:  
ルーム管理、Socket.IO接続、マッチングを担当する複雑なフック。  
`createSocket` 関数をモック化し、Socket.IOイベントの送受信を検証する。  
connect4版との主な違いは、`useUpdateEffect` を使用している点。

### 3-1. 初期状態とSocket.IO接続

- **初期値の確認**
  - `members` が `0` であること
  - `playerRole` が `null` であること
  - `matchState` が `"waiting"` であること
  - `currentRole` が `Role.BLACK` であること
  - `socketRef.current` が Socket インスタンスであること
- **Socket.IO接続の確認**
  - マウント時に `createSocket()` が呼ばれること
  - `socket.connect()` が呼ばれること
  - `socket.emit("startRoom", roomId, "reversi")` が呼ばれること

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

### 3-3. 先手設定の同期（useUpdateEffect使用）

- **`firstRole` 変更時の送信（初回を除く）**
  - `firstRole` が変更されると（初回レンダリングを除く）、`socket.emit("setFirstRole", { roomId, firstRole })` が呼ばれること
  - 初回レンダリング時には送信されないこと（`useUpdateEffect` の特性）
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
- テストディレクトリ: `src/tests/UnitTests/hooks/reversi`
- 各フックごとに以下のような構成を想定
  - `reversi/useReversiFirstRole.test.ts`
  - `reversi/useReversiGame.test.ts`
  - `reversi/useReversiRoom.test.ts`
- **モック化が必要なもの**
  - `@/libs/socket/client` の `createSocket`
  - Socket.IOクライアントインスタンス（`on`, `off`, `emit`, `connect`, `disconnect`）
  - `@/libs/reversi` の各関数（必要に応じて）
  - `@/hooks/utils/useUpdateEffect`（実際の実装を使う場合もあり）
  - Next.jsの `useRouter`（`useReversiGame`では不要だが、統合テストでは必要な場合あり）
- **タイマーのテスト**
  - `vi.useFakeTimers()` を使用してタイマーをモック化
  - `vi.advanceTimersByTime()` で時間を進める
- **Refのテスト**
  - `blackCount.current` と `whiteCount.current` の値を直接確認
