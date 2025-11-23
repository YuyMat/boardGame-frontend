[**frontend v0.1.0**](../../../../../README.md)

***

[frontend](../../../../../modules.md) / [hooks/reversi/\_internal/useReversiGameState](../README.md) / useReversiGameState

# Function: useReversiGameState()

> **useReversiGameState**(): `object`

Defined in: [hooks/reversi/\_internal/useReversiGameState.ts:10](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/hooks/reversi/_internal/useReversiGameState.ts#L10)

Reversiのボード状態を管理する内部フック

## Returns

`object`

### board

> **board**: [`BoardState`](../../../../../types/reversi/type-aliases/BoardState.md)

### setBoard

> **setBoard**: `Dispatch`\<`SetStateAction`\<[`BoardState`](../../../../../types/reversi/type-aliases/BoardState.md)\>\>

### lastPosition

> **lastPosition**: [`LastPositionState`](../../../../../types/reversi/type-aliases/LastPositionState.md)

### setLastPosition

> **setLastPosition**: `Dispatch`\<`SetStateAction`\<[`LastPositionState`](../../../../../types/reversi/type-aliases/LastPositionState.md)\>\>

### canPlay

> **canPlay**: `boolean`

### setCanPlay

> **setCanPlay**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

### highlightedCells

> **highlightedCells**: [`HighlightedBoardState`](../../../../../types/reversi/type-aliases/HighlightedBoardState.md)

### setHighlightedCells

> **setHighlightedCells**: `Dispatch`\<`SetStateAction`\<[`HighlightedBoardState`](../../../../../types/reversi/type-aliases/HighlightedBoardState.md)\>\>

### isSkipTurn

> **isSkipTurn**: `boolean`

### setIsSkipTurn

> **setIsSkipTurn**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

### blackCount

> **blackCount**: `RefObject`\<`number`\>

### whiteCount

> **whiteCount**: `RefObject`\<`number`\>

### skipTurnRef

> **skipTurnRef**: `RefObject`\<`boolean`\>

### resetGameState()

> **resetGameState**: () => `void`

#### Returns

`void`
