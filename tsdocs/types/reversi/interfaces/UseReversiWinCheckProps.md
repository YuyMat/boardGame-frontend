[**frontend v0.1.0**](../../../README.md)

***

[frontend](../../../modules.md) / [types/reversi](../README.md) / UseReversiWinCheckProps

# Interface: UseReversiWinCheckProps

Defined in: [types/reversi.ts:107](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L107)

## Properties

### board

> **board**: [`BoardState`](../type-aliases/BoardState.md)

Defined in: [types/reversi.ts:108](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L108)

***

### currentRole

> **currentRole**: [`RoleState`](../type-aliases/RoleState.md)

Defined in: [types/reversi.ts:109](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L109)

***

### matchState

> **matchState**: [`MatchState`](../../utils/type-aliases/MatchState.md)

Defined in: [types/reversi.ts:110](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L110)

***

### playerRole

> **playerRole**: [`RoleState`](../type-aliases/RoleState.md) \| `null`

Defined in: [types/reversi.ts:111](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L111)

***

### isSkipTurn

> **isSkipTurn**: `boolean`

Defined in: [types/reversi.ts:112](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L112)

***

### skipTurnRef

> **skipTurnRef**: `RefObject`\<`boolean`\>

Defined in: [types/reversi.ts:113](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L113)

***

### blackCount

> **blackCount**: `RefObject`\<`number`\>

Defined in: [types/reversi.ts:114](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L114)

***

### whiteCount

> **whiteCount**: `RefObject`\<`number`\>

Defined in: [types/reversi.ts:115](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L115)

***

### setCanPlay

> **setCanPlay**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

Defined in: [types/reversi.ts:116](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L116)

***

### setIsWin

> **setIsWin**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

Defined in: [types/reversi.ts:117](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L117)

***

### setHighlightedCells

> **setHighlightedCells**: `Dispatch`\<`SetStateAction`\<[`HighlightedBoardState`](../type-aliases/HighlightedBoardState.md)\>\>

Defined in: [types/reversi.ts:118](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L118)

***

### setIsSkipTurn

> **setIsSkipTurn**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

Defined in: [types/reversi.ts:119](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L119)

***

### setCurrentRole

> **setCurrentRole**: `Dispatch`\<`SetStateAction`\<[`RoleState`](../type-aliases/RoleState.md)\>\>

Defined in: [types/reversi.ts:120](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L120)
