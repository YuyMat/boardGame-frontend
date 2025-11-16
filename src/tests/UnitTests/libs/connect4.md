## libs/connect4 ユニットテスト設計

このドキュメントは `src/libs/connect4` 配下の各関数に対するユニットテスト項目をまとめたものです。
実装は Vitest を用い、テストファイルは `src/tests/UnitTests` 配下に作成します。

---

## 1. `createEmptyBoard`

- **ボードサイズの検証**
  - `createEmptyBoard()` を実行すると、配列の行数が `Connect4.ROWS`（6）であること
  - 各行の列数が `Connect4.COLS`（7）であること
- **初期値の検証**
  - すべてのセルが `null` で初期化されていること
- **参照の独立性**
  - 行ごとに異なる配列インスタンスになっていること（例: `board[0] !== board[1]`）

---

## 2. `checkDraw`

- **引き分け判定: true**
  - 最上段のすべてのセルが `null` 以外で埋まっている場合に `true` を返すこと
- **引き分け判定: false（空きあり）**
  - 最上段のどこか 1 セルでも `null` が含まれている場合に `false` を返すこと
- **空ボード**
  - 完全に空のボード（すべて `null`）では `false` を返すこと
- **部分的に石があるが最上段に空きがあるケース**
  - 下の段に石があっても、最上段に `null` がある場合は `false` を返すこと
- **一番右上のみnullの状態**
	- `board[0][6]`だけ`null`の場合は`false`を返すこと

---

## 3. `checkWin`

前提:
`currentRole` と `board`、`lastPosition` を組み合わせて、
「直前に置いたプレイヤーの石（currentRole の反対色）が 4 つ揃っているか」を判定する。

- **縦方向の勝利**
  - 同一列に targetColor（currentRole の反対色）の石が 4 つ連続している場合に `true` を返すこと
  - 4 つ以上連続しているケース（5 つ等）でも `true` を返すこと
- **横方向の勝利**
  - 同一行に targetColor が 4 つ連続している場合に `true` を返すこと
  - 行の途中で 4 つが成立するケース（例えば「空, Y, Y, Y, Y, 空」）で `true` を返すこと
- **斜め（左上→右下）の勝利**
  - 左上から右下方向に targetColor が 4 つ連続している場合に `true` を返すこと
  - 盤面端から始まる斜め 4 つのケースもカバーすること
- **斜め（左下→右上）の勝利**
  - 左下から右上方向に targetColor が 4 つ連続している場合に `true` を返すこと
- **勝利していないケース**
  - どの方向にも 4 つ連続が存在しない場合に `false` を返すこと
- **`lastPosition` が不正なケース**
  - `lastPosition.row` または `lastPosition.col` が `null` の場合に `false` を返すこと
- **対象色の確認**
  - `currentRole = Role.RED` のとき targetColor が `Role.YELLOW` になること
  - `currentRole = Role.YELLOW` のとき targetColor が `Role.RED` になること

---

## 4. `onCellClick`

前提:  
`setBoard`, `setCurrentRole`, `setLastPosition` は React のステート更新関数のモックとしてテストする。

- **基本動作: 最下段の空きセルに石を配置**
  - 空のボードに対して `colIndex` を指定して呼び出すと、その列の最下段（最後の行）に `currentRole` の石が置かれること
  - `setLastPosition` に渡される `row` / `col` が実際に石を置いた位置と一致すること
- **複数回の配置**
  - 同じ列に 2 回連続で `onCellClick` を呼び出した場合、下から 2 段目に石が配置されること
- **ターン切り替え**
  - 石を置いた後に `setCurrentRole` が呼ばれ、`currentRole` が反対色に切り替えられること
- **列が満杯の場合**
  - すでにその列がすべて埋まっている状態で呼び出した場合、`setBoard` 内部の配列が変化しないこと
  - `setCurrentRole` や `setLastPosition` が呼ばれない（または呼び出し回数が増えない）こと
- **`canPlay = false` の場合**
  - `canPlay` が `false` のときは、ボードが更新されないこと
  - `setCurrentRole` や `setLastPosition` も呼ばれないこと
- **不正な `colIndex`（境界値）の扱い（必要であれば）**
  - 0 や `Connect4.COLS - 1` といった境界値で正常に動作すること

---

## 5. `onRestart`

前提:  
`setIsWin`, `setBoard`, `setCanPlay`, `setLastPosition`, `setIsDraw` をすべてモックとして検証する。

- **勝利フラグのリセット**
  - `setIsWin(false)` が 1 回呼ばれること
- **ボードのリセット**
  - `setBoard` に `createEmptyBoard()` の結果が渡されること
  - 渡されたボードがすべて `null` の初期状態になっていること
- **プレイ可能フラグのリセット**
  - `setCanPlay(true)` が 1 回呼ばれること
- **最後の位置のリセット**
  - `setLastPosition({ row: null, col: null })` が 1 回呼ばれること
- **引き分けフラグのリセット**
  - `setIsDraw(false)` が 1 回呼ばれること

---

## 6. テスト実装方針メモ

- テストランナー: Vitest（`package.json` の `test` スクリプトを使用）
- テストディレクトリ: `src/tests/UnitTests`
- 各関数ごとに以下のような構成を想定
  - `connect4/createEmptyBoard.test.ts`
  - `connect4/checkDraw.test.ts`
  - `connect4/checkWin.test.ts`
  - `connect4/onCellClick.test.ts`
  - `connect4/onRestart.test.ts`
