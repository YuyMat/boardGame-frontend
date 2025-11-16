## libs/reversi ユニットテスト設計

このドキュメントは `src/libs/reversi` 配下の各関数に対するユニットテスト項目をまとめたものです。  
実装は Vitest を用い、テストファイルは `src/tests/unit` 配下に作成します。

---

## 1. `createEmptyBoard` / `createEmptyHighlightedBoard`

### 1-1. `createEmptyBoard`

- **ボードサイズの検証**
  - `createEmptyBoard()` を実行すると、配列の行数が 8 であること
  - 各行の列数が 8 であること
- **初期配置の検証**
  - すべてのセルが `null` で初期化されているわけではなく、中央 4 マスのみ石が置かれていること
  - `board[3][3]` が `Role.WHITE` であること
  - `board[3][4]` が `Role.BLACK` であること
  - `board[4][3]` が `Role.BLACK` であること
  - `board[4][4]` が `Role.WHITE` であること
- **その他のセルの検証**
  - 上記 4 マス以外のセルはすべて `null` であること
- **参照の独立性**
  - 行ごとに異なる配列インスタンスになっていること（例: `board[0] !== board[1]`）

### 1-2. `createEmptyHighlightedBoard`

- **ボードサイズの検証**
  - `createEmptyHighlightedBoard()` を実行すると、配列の行数が 8 であること
  - 各行の列数が 8 であること
- **初期値の検証**
  - すべてのセルが `false` で初期化されていること
- **参照の独立性**
  - 行ごとに異なる配列インスタンスになっていること（例: `board[0] !== board[1]`）

---

## 2. `canTurnOver`

前提:  
8 方向（上下左右＋斜め 4 方向）を探索し、「現在のプレイヤーの石で相手の石を挟めるか」を判定する。

- **基本: 空マスでない場合**
  - `board[row][col]` にすでに石がある場合、常に `false` を返すこと
- **基本: 一方向での合法手**
  - 水平方向で `currentRole` の石で相手を挟んでいる場合に `true` を返すこと
    - 例: 行上で `[null, BLACK, WHITE, WHITE, BLACK, null, ...]` のような配置の中央を指定
  - 垂直方向で挟んでいる場合も `true` を返すこと
  - 斜め方向（左上→右下 / 左下→右上）のいずれかで挟んでいる場合に `true` を返すこと
- **複数方向の合法手**
  - 複数方向で相手の石を挟んでいる場合でも、`true` を返すこと（少なくとも 1 方向が成立すればよい）
- **相手の石を挟めないケース**
  - 途中に `null` が挟まっている場合（例: 自分 → null → 相手）には `false` を返すこと
  - 相手の石が 1 つもない方向しか存在しない場合に `false` を返すこと
  - 相手の石はあるが、その先に自分の石が続かない場合（端まで相手の石だけなど）に `false` を返すこと
- **境界値・端のマス**
  - 盤面の端（row = 0 / 7, col = 0 / 7）に対しても、盤外参照をせず正しく `true` / `false` を判定できること

---

## 3. `computeHighlights`

前提:  
`createEmptyHighlightedBoard` と `canTurnOver` を利用し、全マスを走査して合法手をハイライトする。

- **合法手が存在するケース**
  - 初期配置の標準盤面に対して `Role.BLACK` を指定した場合、黒が置ける位置がいくつか `true` になること
  - `highlights[row][col]` が `true` になっている位置は、`canTurnOver({ board, row, col, currentRole: role })` が `true` を返す位置と一致すること
  - `any` が `true` になること
- **合法手が存在しないケース**
  - 盤面を「どちらのプレイヤーも合法手がない状態」にしたケースで `any` が `false` になり、`highlights` がすべて `false` であること
- **純粋性の検証**
  - 渡した `board` を直接変更しないこと（`computeHighlights` 実行前後で `board` の内容が変わらないこと）
- **役割ごとの違い**
  - 同じ盤面に対して `role = Role.BLACK` と `role = Role.WHITE` を渡したとき、`highlights` のパターンが変わること

---

## 4. `countStones`

- **初期盤面のカウント**
  - `createEmptyBoard()` の結果を渡した場合、`blackCount` と `whiteCount` がともに 2 になること
- **空盤面**
  - すべて `null` の 8x8 盤面を渡した場合、`blackCount = 0`, `whiteCount = 0` になること
- **片側だけ石があるケース**
  - 黒石のみが複数個ある盤面を渡した場合、`blackCount` がその個数に一致し、`whiteCount = 0` になること
  - 白石のみのケースも同様に検証すること
- **混在している盤面**
  - 黒と白が混在している任意の盤面を用意し、手計算した数と `countStones` の戻り値が一致すること
- **純粋性の検証**
  - 渡した `board` を変更しないこと

---

## 5. `reverseStones`

前提:  
`board` を破壊的に更新し、最後に置いた石に基づいて 8 方向をチェックしながら相手の石をひっくり返す。

- **単一方向でのひっくり返し**
  - 水平方向で「自分の石 - 相手の石(複数) - 自分の石」のパターンを作り、中央の相手の石がすべて自分の色に変わること
  - 垂直方向で同様のケースを作り、正しくひっくり返せること
  - 斜め方向（左上→右下 / 左下→右上）でも同様に検証すること
- **複数方向でのひっくり返し**
  - 最後に置いた石から見て、複数方向で相手の石を挟んでいる配置を用意し、全ての対象方向の石がひっくり返ること
- **ひっくり返らないケース**
  - 隣に相手の石があるが、その先に自分の石が存在しない場合、石がひっくり返らないこと
  - 間に `null` が挟まっているパターンではその方向の石がひっくり返らないこと
- **境界・端のマス**
  - 盤面端や角で石を置いた場合でも、盤外を参照せず、正しい範囲のみで石をひっくり返すこと
- **変更の検証**
  - 対象となる座標の石だけが `currentRole` に変わっており、それ以外の不要なセルが変更されていないこと

---

## 6. `onCellClick`

前提:  
`setBoard`, `setCurrentRole`, `setLastPosition`, `setIsSkipTurn` は React のステート更新関数のモックとしてテストする。  
`reverseStones` は実際の挙動を確認するか、ケースによりモック化も検討する。

- **基本動作: 合法手への配置**
  - `canPlay = true` で、`highlightedCells[rowIndex][colIndex] = true` のセルをクリックしたとき
    - `setBoard` のアップデート関数内で、その位置に `currentRole` の石が置かれること
    - `reverseStones` に渡される `lastPosition` が `{ row: rowIndex, col: colIndex }` であること（モック化して呼び出し確認してもよい）
    - 石を置いた後に `setCurrentRole` が呼ばれ、`currentRole` が反対色に切り替えられること
    - `setLastPosition` に `{ row: rowIndex, col: colIndex }` が渡されること
- **合法手でない位置のクリック**
  - `highlightedCells[rowIndex][colIndex] !== true` のセルをクリックした場合
    - `setBoard` の内部でボードが変更されないこと（同じ参照か、少なくとも内容が同一であることを確認）
    - `setCurrentRole` や `setLastPosition` が呼ばれない（または呼び出し回数が増えない）こと
- **`canPlay = false` の場合**
  - `canPlay` が `false` のときは、どのセルをクリックしても
    - `setBoard` による盤面の変更が行われないこと
    - `setCurrentRole`, `setLastPosition` が呼ばれないこと
- **境界値**
  - 0 や 7 といった端のインデックスを指定しても、正常に動作すること
- **スキップターンとの関係（必要に応じて）**
  - 実装上 `setIsSkipTurn` は `onCellClick` 内では直接呼んでいないため、基本的には呼び出されないことを確認する程度に留める

---

## 7. `checkWin`

前提:  
終局判定とスキップターン処理を担う。`computeHighlights` を利用して、現在のプレイヤー・次のプレイヤーそれぞれの合法手の有無を判定する。  
`setHighlightedCells`, `setIsSkipTurn`, `setCurrentRole`, `setCanPlay` はモックとする。

- **現在プレイヤーに合法手があるケース**
  - `computeHighlights` が `{ any: true, highlights }` を返すようにモックする
  - `checkWin` 実行時に
    - `setHighlightedCells` が `highlights` で 1 回呼ばれること
    - `setIsSkipTurn`, `setCurrentRole`, `setCanPlay` は呼ばれないこと
    - 戻り値が `false`（ゲーム続行）であること
- **現在プレイヤーに合法手がなく、相手には合法手があるケース（スキップターン）**
  - 最初の `computeHighlights(board, currentRole)` が `{ any: false }`
  - 次の `computeHighlights(board, nextTurn)` が `{ any: true }`
  - `checkWin` 実行時に
    - `setIsSkipTurn(true)` が呼ばれること
    - `setCurrentRole(nextTurn)` が呼ばれること
    - `setHighlightedCells` は呼ばれないこと
    - `setCanPlay` は呼ばれないこと
    - 戻り値が `false` であること
- **両者とも合法手がないケース（終局）**
  - 現在プレイヤー・次プレイヤー両方に対して `computeHighlights` が `{ any: false }` を返すようにする
  - `checkWin` 実行時に
    - `setIsSkipTurn(false)` が呼ばれること
    - `setCanPlay(false)` が呼ばれること
    - `setCurrentRole` は呼ばれないこと（ターンはもう進まない）
    - 戻り値が `true`（ゲーム終了）であること

---

## 8. テスト実装方針メモ

- テストランナー: Vitest（`package.json` の `test` スクリプトを使用）
- テストディレクトリ: `src/tests/unit`
- 各関数ごとに以下のような構成を想定
  - `reversi/createEmptyBoard.test.ts`
  - `reversi/canTurnOver.test.ts`
  - `reversi/computeHighlights.test.ts`
  - `reversi/countStones.test.ts`
  - `reversi/reverseStones.test.ts`
  - `reversi/onCellClick.test.ts`
  - `reversi/checkWin.test.ts`
