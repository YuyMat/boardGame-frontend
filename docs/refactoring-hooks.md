# カスタムフックのリファクタリング実装ガイド

## 📋 目次
1. [現状の問題点](#現状の問題点)
2. [提案する新しい構造](#提案する新しい構造)
3. [具体的な実装例](#具体的な実装例)
4. [移行手順](#移行手順)
5. [メリット・デメリット](#メリットデメリット)

---

## 現状の問題点

### useConnect4Game (147行)
- ボード状態管理
- Socket通信の同期
- 勝敗判定
- イベントハンドラー

これらの責務が1つのファイルに混在している。

### useReversiGame (168行)
- ボード状態管理
- Socket通信の同期
- 勝敗判定
- ハイライト表示
- スキップターン判定
- イベントハンドラー

さらに多くの責務が混在している。

---

## 提案する新しい構造

```
hooks/
  connect4/
    index.ts                        # 公開APIのエクスポート
    useConnect4Game.ts              # メイン統合フック (約60行)
    useConnect4Room.ts              # メイン統合フック (40-50行)
    useConnect4FirstRole.ts         # 先攻後攻決定フック (約25行)
    _internal/                      # 🔒 内部実装（外部から直接使用禁止）
      useConnect4Board.ts           # ボード状態管理（約40行）
      useConnect4SocketSync.ts      # Socket通信同期（約50行）
      useConnect4WinCheck.ts        # 勝敗判定ロジック（約30行）
      useConnect4Restart.ts         # リスタート処理（約30行）
      useConnect4RoomConnection.ts  # ルーム接続管理（約40行）
      
  reversi/
    index.ts                        # 公開APIのエクスポート
    useReversiGame.ts               # メイン統合フック (約70行)
    useReversiRoom.ts               # メイン統合フック (50-60行)
    useReversiFirstRole.ts          # 先攻後攻決定フック (約25行)
    _internal/                      # 🔒 内部実装（外部から直接使用禁止）
      useReversiBoard.ts            # ボード状態管理（約50行）
      useReversiSocketSync.ts       # Socket通信同期（約50行）
      useReversiWinCheck.ts         # 勝敗判定＋ハイライト（約50行）
      useReversiRestart.ts          # リスタート処理（約30行）
      useReversiRoomConnection.ts   # ルーム接続管理（約40行）
      
  utils/
    useGotoTopPage.ts               # トップページ遷移フック
    useUpdateEffect.ts              # useEffect（初回スキップ版）
```

---

## 具体的な実装例

### 1. Connect4: ボード状態管理の分離

#### `hooks/connect4/_internal/useConnect4Board.ts`

```typescript
"use client"

import { useState } from "react";
import { BoardState, lastPositionState, RoleState } from "@/types/connect4";
import { createEmptyBoard } from "@/libs/connect4";

/**
 * Connect4のボード状態を管理する内部フック
 * 外部から直接使用せず、useConnect4Gameから使用される
 */
export function useConnect4Board() {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard());
  const [lastPosition, setLastPosition] = useState<lastPositionState>({
    row: null,
    col: null,
  });
  const [canPlay, setCanPlay] = useState(true);
  const [isDraw, setIsDraw] = useState(false);

  const resetBoard = () => {
    setBoard(createEmptyBoard());
    setLastPosition({ row: null, col: null });
    setCanPlay(true);
    setIsDraw(false);
  };

  return {
    board,
    setBoard,
    lastPosition,
    setLastPosition,
    canPlay,
    setCanPlay,
    isDraw,
    setIsDraw,
    resetBoard,
  };
}
```

---

### 2. Connect4: Socket同期の分離

#### `hooks/connect4/_internal/useConnect4SocketSync.ts`

```typescript
"use client"

import { useEffect, useRef, Dispatch, SetStateAction, MutableRefObject } from "react";
import { BoardState, lastPositionState, RoleState, handleBoardUpdatedProps } from "@/types/connect4";
import { MatchState } from "@/types/connect4";
import type { Socket } from "socket.io-client";

interface UseConnect4SocketSyncProps {
  socketRef: MutableRefObject<Socket | null>;
  roomId: string;
  matchState: MatchState;
  board: BoardState;
  currentRole: RoleState;
  lastPosition: lastPositionState;
  setBoard: Dispatch<SetStateAction<BoardState>>;
  setCurrentRole: Dispatch<SetStateAction<RoleState>>;
  setLastPosition: Dispatch<SetStateAction<lastPositionState>>;
}

/**
 * Connect4のSocket通信による盤面同期を管理する内部フック
 */
export function useConnect4SocketSync({
  socketRef,
  roomId,
  matchState,
  board,
  currentRole,
  lastPosition,
  setBoard,
  setCurrentRole,
  setLastPosition,
}: UseConnect4SocketSyncProps) {
  const suppressSyncRef = useRef<boolean>(false);

  // 受信: 他プレイヤーの盤面を受け取る
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleBoardUpdated = ({
      board: nextBoard,
      currentRole: nextRole,
      lastPosition: nextLast,
    }: handleBoardUpdatedProps) => {
      suppressSyncRef.current = true;
      setBoard(nextBoard);
      setCurrentRole(nextRole);
      if (nextLast) setLastPosition(nextLast);
    };

    socket.on("boardUpdated", handleBoardUpdated);

    return () => {
      socket.off("boardUpdated", handleBoardUpdated);
    };
  }, [roomId]);

  // 送信: 自分の盤面を送信する
  useEffect(() => {
    if (matchState !== "playing") return;
    const socket = socketRef.current;
    if (!socket) return;
    if (suppressSyncRef.current) {
      suppressSyncRef.current = false;
      return;
    }

    socket.emit("syncBoard", {
      roomId,
      board,
      currentRole,
      lastPosition,
    });
  }, [board, currentRole, lastPosition, matchState, roomId]);

  return { suppressSyncRef };
}
```

---

### 3. Connect4: 勝敗判定の分離

#### `hooks/connect4/_internal/useConnect4WinCheck.ts`

```typescript
"use client"

import { Dispatch, SetStateAction } from "react";
import { useUpdateEffect } from "@/hooks/utils/useUpdateEffect";
import { BoardState, lastPositionState, RoleState } from "@/types/connect4";
import { checkWin, checkDraw } from "@/libs/connect4";

interface UseConnect4WinCheckProps {
  board: BoardState;
  lastPosition: lastPositionState;
  currentRole: RoleState;
  setCanPlay: Dispatch<SetStateAction<boolean>>;
  setIsWin: Dispatch<SetStateAction<boolean>>;
  setIsDraw: Dispatch<SetStateAction<boolean>>;
}

/**
 * Connect4の勝敗判定を管理する内部フック
 * ボードが更新されるたびに勝敗をチェックする
 */
export function useConnect4WinCheck({
  board,
  lastPosition,
  currentRole,
  setCanPlay,
  setIsWin,
  setIsDraw,
}: UseConnect4WinCheckProps) {
  useUpdateEffect(() => {
    // 勝利判定
    if (checkWin({ lastPosition, currentRole, board })) {
      setCanPlay(false);
      const timer = setTimeout(() => {
        setIsWin(true);
      }, 200);
      return () => clearTimeout(timer);
    }

    // 引き分け判定
    if (checkDraw(board)) {
      setCanPlay(false);
      setIsDraw(true);
      const timer = setTimeout(() => {
        setIsWin(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [board]);
}
```

---

### 4. Connect4: メインフックの統合

#### `hooks/connect4/useConnect4Game.ts` (リファクタリング後)

```typescript
"use client"

import { useState } from "react";
import { RoleState, UseConnect4GameProps } from "@/types/connect4";
import { onCellClick, createEmptyBoard } from "@/libs/connect4";
import { useConnect4Board } from "./_internal/useConnect4Board";
import { useConnect4SocketSync } from "./_internal/useConnect4SocketSync";
import { useConnect4WinCheck } from "./_internal/useConnect4WinCheck";
import { useConnect4Restart } from "./_internal/useConnect4Restart";

/**
 * Connect4ゲームのゲームロジックとリアルタイム同期を管理するカスタムフックです。
 * ボードの状態管理、勝敗判定、Socket.IOを使った盤面同期を行います。
 * 
 * @param props - ゲーム管理に必要なパラメータ
 * @returns ゲーム状態と操作関数を含むオブジェクト
 */
export default function useConnect4Game({
  socketRef,
  matchState,
  playerRole,
  roomId,
  membersRef,
  setMatchState,
  currentRole,
  setCurrentRole,
}: UseConnect4GameProps) {
  const [isWin, setIsWin] = useState(false);

  // ボード状態管理
  const {
    board,
    setBoard,
    lastPosition,
    setLastPosition,
    canPlay,
    setCanPlay,
    isDraw,
    setIsDraw,
    resetBoard,
  } = useConnect4Board();

  // Socket同期
  useConnect4SocketSync({
    socketRef,
    roomId,
    matchState,
    board,
    currentRole,
    lastPosition,
    setBoard,
    setCurrentRole,
    setLastPosition,
  });

  // 勝敗判定
  useConnect4WinCheck({
    board,
    lastPosition,
    currentRole,
    setCanPlay,
    setIsWin,
    setIsDraw,
  });

  // リスタート処理
  useConnect4Restart({
    socketRef,
    roomId,
    membersRef,
    setMatchState,
    setIsWin,
    resetBoard,
    setCurrentRole,
  });

  // セルクリックハンドラー
  const handleCellClick = (colIndex: number) => {
    onCellClick({
      colIndex,
      canPlay: canPlay && playerRole === currentRole,
      currentRole,
      setCurrentRole,
      setLastPosition,
      setBoard,
    });
  };

  return {
    board,
    currentRole,
    isWin,
    setIsWin,
    onCellClick: handleCellClick,
    lastPosition,
    canPlay,
    isDraw,
  };
}
```

---

### 5. Connect4: リスタート処理の分離

#### `hooks/connect4/_internal/useConnect4Restart.ts`

```typescript
"use client"

import { useEffect, Dispatch, SetStateAction, MutableRefObject } from "react";
import { RoleState, MatchState } from "@/types/connect4";
import type { Socket } from "socket.io-client";

interface UseConnect4RestartProps {
  socketRef: MutableRefObject<Socket | null>;
  roomId: string;
  membersRef: MutableRefObject<number>;
  setMatchState: Dispatch<SetStateAction<MatchState>>;
  setIsWin: Dispatch<SetStateAction<boolean>>;
  resetBoard: () => void;
  setCurrentRole: Dispatch<SetStateAction<RoleState>>;
}

/**
 * Connect4のリスタート処理を管理する内部フック
 */
export function useConnect4Restart({
  socketRef,
  roomId,
  membersRef,
  setMatchState,
  setIsWin,
  resetBoard,
  setCurrentRole,
}: UseConnect4RestartProps) {
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleRestart = ({ firstRole }: { firstRole: RoleState }) => {
      if (membersRef.current === 1) {
        setMatchState("waiting");
        return;
      }
      setIsWin(false);
      resetBoard();
      setCurrentRole(firstRole);
    };

    socket.on("restart", handleRestart);

    return () => {
      socket.off("restart", handleRestart);
    };
  }, [roomId]);
}
```

---

### 6. Reversi: ボード状態管理の分離

#### `hooks/reversi/_internal/useReversiBoard.ts`

```typescript
"use client"

import { useState, useRef } from "react";
import { BoardState, lastPositionState, HighlightedBoardState } from "@/types/reversi";
import { createEmptyBoard, createEmptyHighlightedBoard } from "@/libs/reversi";

/**
 * Reversiのボード状態を管理する内部フック
 */
export function useReversiBoard() {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard());
  const [lastPosition, setLastPosition] = useState<lastPositionState>({
    row: null,
    col: null,
  });
  const [canPlay, setCanPlay] = useState(true);
  const [highlightedCells, setHighlightedCells] = useState<HighlightedBoardState>(
    createEmptyHighlightedBoard()
  );
  const [isSkipTurn, setIsSkipTurn] = useState(false);

  const blackCount = useRef(0);
  const whiteCount = useRef(0);
  const skipTurnRef = useRef(false);

  const resetBoard = () => {
    setBoard(createEmptyBoard());
    setLastPosition({ row: null, col: null });
    setCanPlay(true);
    setHighlightedCells(createEmptyHighlightedBoard());
    setIsSkipTurn(false);
    blackCount.current = 0;
    whiteCount.current = 0;
    skipTurnRef.current = false;
  };

  return {
    board,
    setBoard,
    lastPosition,
    setLastPosition,
    canPlay,
    setCanPlay,
    highlightedCells,
    setHighlightedCells,
    isSkipTurn,
    setIsSkipTurn,
    blackCount,
    whiteCount,
    skipTurnRef,
    resetBoard,
  };
}
```

---

### 7. Reversi: 勝敗判定とハイライトの分離

#### `hooks/reversi/_internal/useReversiWinCheck.ts`

```typescript
"use client"

import { Dispatch, SetStateAction, MutableRefObject } from "react";
import { useUpdateEffect } from "@/hooks/utils/useUpdateEffect";
import {
  BoardState,
  RoleState,
  HighlightedBoardState,
  MatchState,
} from "@/types/reversi";
import { checkWin, countStones, createEmptyHighlightedBoard } from "@/libs/reversi";

interface UseReversiWinCheckProps {
  board: BoardState;
  currentRole: RoleState;
  matchState: MatchState;
  playerRole: RoleState | null;
  isSkipTurn: boolean;
  skipTurnRef: MutableRefObject<boolean>;
  blackCount: MutableRefObject<number>;
  whiteCount: MutableRefObject<number>;
  setCanPlay: Dispatch<SetStateAction<boolean>>;
  setIsWin: Dispatch<SetStateAction<boolean>>;
  setHighlightedCells: Dispatch<SetStateAction<HighlightedBoardState>>;
  setIsSkipTurn: Dispatch<SetStateAction<boolean>>;
  setCurrentRole: Dispatch<SetStateAction<RoleState>>;
}

/**
 * Reversiの勝敗判定とハイライト表示を管理する内部フック
 */
export function useReversiWinCheck({
  board,
  currentRole,
  matchState,
  playerRole,
  isSkipTurn,
  skipTurnRef,
  blackCount,
  whiteCount,
  setCanPlay,
  setIsWin,
  setHighlightedCells,
  setIsSkipTurn,
  setCurrentRole,
}: UseReversiWinCheckProps) {
  useUpdateEffect(() => {
    // 石の数をカウント
    const stonesCount = countStones(board);
    blackCount.current = stonesCount.blackCount;
    whiteCount.current = stonesCount.whiteCount;

    // スキップターン処理
    if (isSkipTurn) {
      if (!skipTurnRef.current) {
        skipTurnRef.current = true;
      } else {
        setIsSkipTurn(false);
        skipTurnRef.current = false;
      }
    }

    // 勝敗判定
    if (
      checkWin({
        currentRole,
        board,
        setHighlightedCells,
        setIsSkipTurn,
        setCurrentRole,
        setCanPlay,
      })
    ) {
      setHighlightedCells(createEmptyHighlightedBoard());
      setCanPlay(false);
      const timer = setTimeout(() => {
        setIsWin(true);
      }, 200);
      return () => clearTimeout(timer);
    }

    // 相手ターン時はハイライトをクリア
    if (matchState === "playing" && playerRole !== currentRole) {
      setHighlightedCells(createEmptyHighlightedBoard());
    }
  }, [board, matchState, currentRole]);
}
```

---

### 8. Reversi: Socket同期の分離

#### `hooks/reversi/_internal/useReversiSocketSync.ts`

```typescript
"use client"

import { useEffect, useRef, Dispatch, SetStateAction, MutableRefObject } from "react";
import {
  BoardState,
  lastPositionState,
  RoleState,
  handleBoardUpdatedProps,
  MatchState,
} from "@/types/reversi";
import type { Socket } from "socket.io-client";

interface UseReversiSocketSyncProps {
  socketRef: MutableRefObject<Socket | null>;
  roomId: string;
  matchState: MatchState;
  board: BoardState;
  lastPosition: lastPositionState;
  setBoard: Dispatch<SetStateAction<BoardState>>;
  setCurrentRole: Dispatch<SetStateAction<RoleState>>;
  setLastPosition: Dispatch<SetStateAction<lastPositionState>>;
}

/**
 * ReversiのSocket通信による盤面同期を管理する内部フック
 */
export function useReversiSocketSync({
  socketRef,
  roomId,
  matchState,
  board,
  lastPosition,
  setBoard,
  setCurrentRole,
  setLastPosition,
}: UseReversiSocketSyncProps) {
  const suppressSyncRef = useRef(false);

  // 受信: 他プレイヤーの盤面を受け取る
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleBoardUpdated = ({
      board: nextBoard,
      currentRole: nextRole,
      lastPosition: nextLast,
    }: handleBoardUpdatedProps) => {
      suppressSyncRef.current = true;
      setBoard(nextBoard);
      setCurrentRole(nextRole);
      if (nextLast) setLastPosition(nextLast);
    };

    socket.on("boardUpdated", handleBoardUpdated);

    return () => {
      socket.off("boardUpdated", handleBoardUpdated);
    };
  }, [roomId]);

  // 送信: 自分の盤面を送信する
  useEffect(() => {
    if (matchState !== "playing") return;
    const socket = socketRef.current;
    if (!socket) return;
    if (suppressSyncRef.current) {
      suppressSyncRef.current = false;
      return;
    }

    socket.emit("syncBoard", {
      roomId,
      board,
      currentRole: undefined, // Reversiでは送信しない
      lastPosition,
    });
  }, [board, lastPosition, matchState, roomId]);

  return { suppressSyncRef };
}
```

---

### 9. Reversi: リスタート処理の分離

#### `hooks/reversi/_internal/useReversiRestart.ts`

```typescript
"use client"

import { useEffect, Dispatch, SetStateAction, MutableRefObject } from "react";
import { RoleState, MatchState } from "@/types/reversi";
import type { Socket } from "socket.io-client";

interface UseReversiRestartProps {
  socketRef: MutableRefObject<Socket | null>;
  roomId: string;
  membersRef: MutableRefObject<number>;
  setMatchState: Dispatch<SetStateAction<MatchState>>;
  setIsWin: Dispatch<SetStateAction<boolean>>;
  resetBoard: () => void;
  setCurrentRole: Dispatch<SetStateAction<RoleState>>;
}

/**
 * Reversiのリスタート処理を管理する内部フック
 */
export function useReversiRestart({
  socketRef,
  roomId,
  membersRef,
  setMatchState,
  setIsWin,
  resetBoard,
  setCurrentRole,
}: UseReversiRestartProps) {
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleRestart = ({ firstRole }: { firstRole: RoleState }) => {
      if (membersRef.current === 1) {
        setMatchState("waiting");
        return;
      }
      setIsWin(false);
      resetBoard();
      setCurrentRole(firstRole);
    };

    socket.on("restart", handleRestart);

    return () => {
      socket.off("restart", handleRestart);
    };
  }, [roomId]);
}
```

---

### 10. Reversi: メインフックの統合

#### `hooks/reversi/useReversiGame.ts` (リファクタリング後)

```typescript
"use client"

import { useState } from "react";
import { UseReversiGameProps } from "@/types/reversi";
import { onCellClick } from "@/libs/reversi";
import { useReversiBoard } from "./_internal/useReversiBoard";
import { useReversiSocketSync } from "./_internal/useReversiSocketSync";
import { useReversiWinCheck } from "./_internal/useReversiWinCheck";
import { useReversiRestart } from "./_internal/useReversiRestart";

/**
 * オセロゲームのゲームロジックとリアルタイム同期を管理するカスタムフックです。
 * ボードの状態管理、合法手のハイライト、勝敗判定、Socket.IOを使った盤面同期を行います。
 * 
 * @param props - ゲーム管理に必要なパラメータ
 * @returns ゲーム状態と操作関数を含むオブジェクト
 */
export default function useReversiGame({
  socketRef,
  matchState,
  playerRole,
  roomId,
  membersRef,
  setMatchState,
  currentRole,
  setCurrentRole,
}: UseReversiGameProps) {
  const [isWin, setIsWin] = useState(false);

  // ボード状態管理
  const {
    board,
    setBoard,
    lastPosition,
    setLastPosition,
    canPlay,
    setCanPlay,
    highlightedCells,
    setHighlightedCells,
    isSkipTurn,
    setIsSkipTurn,
    blackCount,
    whiteCount,
    skipTurnRef,
    resetBoard,
  } = useReversiBoard();

  // Socket同期
  useReversiSocketSync({
    socketRef,
    roomId,
    matchState,
    board,
    lastPosition,
    setBoard,
    setCurrentRole,
    setLastPosition,
  });

  // 勝敗判定とハイライト
  useReversiWinCheck({
    board,
    currentRole,
    matchState,
    playerRole,
    isSkipTurn,
    skipTurnRef,
    blackCount,
    whiteCount,
    setCanPlay,
    setIsWin,
    setHighlightedCells,
    setIsSkipTurn,
    setCurrentRole,
  });

  // リスタート処理
  useReversiRestart({
    socketRef,
    roomId,
    membersRef,
    setMatchState,
    setIsWin,
    resetBoard,
    setCurrentRole,
  });

  // セルクリックハンドラー
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    onCellClick({
      rowIndex,
      colIndex,
      canPlay: canPlay && playerRole === currentRole,
      currentRole,
      setCurrentRole,
      setLastPosition,
      setBoard,
      highlightedCells,
      setIsSkipTurn,
    });
  };

  return {
    board,
    currentRole,
    isWin,
    setIsWin,
    onCellClick: handleCellClick,
    lastPosition,
    canPlay,
    blackCount,
    whiteCount,
    isSkipTurn,
    highlightedCells,
  };
}
```

---

## 移行手順

### ステップ1: _internalディレクトリの作成

```bash
mkdir -p frontend/src/hooks/connect4/_internal
mkdir -p frontend/src/hooks/reversi/_internal
```

### ステップ2: 内部フックの実装

各ゲームごとに以下の順番で実装：

1. **ボード状態管理** (`useXxxBoard.ts`)
   - 最も依存が少ないため最初に実装
   
2. **Socket同期** (`useXxxSocketSync.ts`)
   - ボードの状態に依存

3. **勝敗判定** (`useXxxWinCheck.ts`)
   - ボードの状態に依存

4. **リスタート処理** (`useXxxRestart.ts`)
   - ボードのリセット関数に依存

### ステップ3: メインフックのリファクタリング

内部フックを組み合わせて、既存のメインフックを書き換える。

### ステップ4: テストの実行

```bash
npm run test
```

既存のテストがすべてパスすることを確認。

### ステップ5: 動作確認

実際にゲームをプレイして、以下を確認：
- ボードの表示
- 石を置く動作
- Socket通信
- 勝敗判定
- リスタート機能

---

## メリット・デメリット

### ✅ メリット

1. **可読性の向上**
   - 各ファイルが30-60行程度に収まる
   - 責務が明確で理解しやすい

2. **テスタビリティの向上**
   - 各機能を独立してテストできる
   - モックが作りやすい

3. **保守性の向上**
   - バグ修正が該当フックのみで完結
   - 機能追加時の影響範囲が限定される

4. **再利用性**
   - 他のゲームでも類似のフックを使える
   - コピペではなく共通化できる可能性

5. **型安全性**
   - Propsの型定義が明確になる
   - 各フックの入出力が明確

### ❌ デメリット

1. **ファイル数の増加**
   - 管理するファイルが増える
   - ディレクトリ構造が深くなる

2. **初期実装コスト**
   - リファクタリングに時間がかかる
   - 既存テストの修正が必要な場合もある

3. **学習コスト**
   - 新しいメンバーが構造を理解する必要がある
   - ドキュメントの整備が必要

4. **微妙な依存関係**
   - フック間の依存関係に注意が必要
   - useEffectの実行順序に注意

---

## 注意点

### 1. _internal ディレクトリの意味

`_internal/` に配置するフックは、**外部から直接使用されることを想定していません**。
必ずメインフックを経由して使用します。

```typescript
// ❌ Bad: 外部から直接使用
import { useConnect4Board } from "@/hooks/connect4/_internal/useConnect4Board";

// ✅ Good: メインフックを使用
import useConnect4Game from "@/hooks/connect4/useConnect4Game";
```

### 2. index.ts でのエクスポート制御

```typescript
// hooks/connect4/index.ts
export { default as useConnect4Game } from "./useConnect4Game";
export { default as useConnect4Room } from "./useConnect4Room";
export { default as useConnect4FirstRole } from "./useConnect4FirstRole";

// _internal フックはエクスポートしない
```

### 3. useEffectの依存配列

分割後も、依存配列は適切に設定する必要があります。
ESLintの `exhaustive-deps` ルールに従ってください。

### 4. パフォーマンス

フックが増えてもパフォーマンスへの影響はほぼありません。
Reactは最適化されており、カスタムフックの呼び出しコストは低いです。

---

## まとめ

このリファクタリングにより：

- **useConnect4Game**: 147行 → 約60行
- **useReversiGame**: 168行 → 約70行

各フックが50-70行に収まり、責務が明確になります。

長期的な保守性、テスタビリティ、可読性を考慮すると、
**このリファクタリングは強く推奨されます**。

特にチーム開発や長期運用を考えると、初期投資（リファクタリングコスト）は
十分に回収できると考えられます。

---

## 最終的なディレクトリ構成

リファクタリング実施後の完全なディレクトリ構造は以下のようになります：

```
frontend/src/hooks/
│
├── connect4/
│   ├── index.ts                        # 公開APIのエクスポート
│   ├── useConnect4Game.ts              # メイン統合フック (約60行)
│   ├── useConnect4Room.ts              # メイン統合フック (40-50行)
│   ├── useConnect4FirstRole.ts         # 先攻後攻決定フック
│   │
│   └── _internal/                      # 🔒 内部実装（外部から直接使用禁止）
│       ├── useConnect4Board.ts         # ボード状態管理（約40行）
│       ├── useConnect4SocketSync.ts    # Socket通信同期（約50行）
│       ├── useConnect4WinCheck.ts      # 勝敗判定ロジック（約30行）
│       ├── useConnect4Restart.ts       # リスタート処理（約30行）
│       └── useConnect4RoomConnection.ts # ルーム接続管理（約40行）
│
├── reversi/
│   ├── index.ts                        # 公開APIのエクスポート
│   ├── useReversiGame.ts               # メイン統合フック (約70行)
│   ├── useReversiRoom.ts               # メイン統合フック (50-60行)
│   ├── useReversiFirstRole.ts          # 先攻後攻決定フック
│   │
│   └── _internal/                      # 🔒 内部実装（外部から直接使用禁止）
│       ├── useReversiBoard.ts          # ボード状態管理（約50行）
│       ├── useReversiSocketSync.ts     # Socket通信同期（約50行）
│       ├── useReversiWinCheck.ts       # 勝敗判定＋ハイライト（約50行）
│       ├── useReversiRestart.ts        # リスタート処理（約30行）
│       └── useReversiRoomConnection.ts # ルーム接続管理（約40行）
│
└── utils/
    ├── useGotoTopPage.ts               # トップページ遷移フック
    └── useUpdateEffect.ts              # useEffect（初回スキップ版）
```

### ファイル数の比較

**リファクタリング前:**
- Connect4: 3ファイル
- Reversi: 3ファイル
- 合計: 6ファイル

**リファクタリング後:**
- Connect4: 8ファイル（メイン3 + 内部5）
- Reversi: 8ファイル（メイン3 + 内部5）
- 合計: 16ファイル

### 各ファイルの責務

#### 公開API（メインフック）
| ファイル | 責務 | 行数 |
|---------|------|------|
| `useConnect4Game.ts` | ゲームロジック全体の統合 | 約60行 |
| `useConnect4Room.ts` | ルーム管理全体の統合 | 40-50行 |
| `useConnect4FirstRole.ts` | 先攻後攻の決定 | 約25行 |
| `useReversiGame.ts` | ゲームロジック全体の統合 | 約70行 |
| `useReversiRoom.ts` | ルーム管理全体の統合 | 50-60行 |
| `useReversiFirstRole.ts` | 先攻後攻の決定 | 約25行 |

#### 内部フック（_internal/）
| ファイル | 責務 | 行数 |
|---------|------|------|
| `useXxxBoard.ts` | ボード・石の配置状態管理 | 40-50行 |
| `useXxxSocketSync.ts` | Socket.IOによる盤面同期 | 約50行 |
| `useXxxWinCheck.ts` | 勝敗・引き分け判定 | 30-50行 |
| `useXxxRestart.ts` | ゲーム再開処理 | 約30行 |
| `useXxxRoomConnection.ts` | ルーム参加・退出管理 | 約40行 |

### 使用例

```typescript
// ✅ 正しい使い方: メインフックを使用
import useConnect4Game from "@/hooks/connect4/useConnect4Game";
import useConnect4Room from "@/hooks/connect4/useConnect4Room";

function Connect4Page() {
  const roomProps = useConnect4Room(roomId);
  const gameProps = useConnect4Game(roomProps);
  
  return <Board {...gameProps} />;
}
```

```typescript
// ❌ 間違った使い方: 内部フックを直接使用
import { useConnect4Board } from "@/hooks/connect4/_internal/useConnect4Board";
// これは避けるべき！内部実装が変更されると壊れる可能性があります
```
