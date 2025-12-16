[**frontend v0.1.0**](../../../README.md)

***

[frontend](../../../modules.md) / [types/reversi](../README.md) / UseReversiSocketSyncProps

# Interface: UseReversiSocketSyncProps

Defined in: [types/reversi.ts:95](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L95)

## Properties

### socketRef

> **socketRef**: `RefObject`\<`Socket`\<`DefaultEventsMap`, `DefaultEventsMap`\> \| `null`\>

Defined in: [types/reversi.ts:96](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L96)

***

### roomId

> **roomId**: `string`

Defined in: [types/reversi.ts:97](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L97)

***

### matchState

> **matchState**: [`MatchState`](../../utils/type-aliases/MatchState.md)

Defined in: [types/reversi.ts:98](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L98)

***

### board

> **board**: [`BoardState`](../type-aliases/BoardState.md)

Defined in: [types/reversi.ts:99](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L99)

***

### lastPosition

> **lastPosition**: [`LastPositionState`](../type-aliases/LastPositionState.md)

Defined in: [types/reversi.ts:100](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L100)

***

### currentRole

> **currentRole**: [`RoleState`](../type-aliases/RoleState.md)

Defined in: [types/reversi.ts:101](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L101)

***

### setBoard

> **setBoard**: `Dispatch`\<`SetStateAction`\<[`BoardState`](../type-aliases/BoardState.md)\>\>

Defined in: [types/reversi.ts:102](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L102)

***

### setCurrentRole

> **setCurrentRole**: `Dispatch`\<`SetStateAction`\<[`RoleState`](../type-aliases/RoleState.md)\>\>

Defined in: [types/reversi.ts:103](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L103)

***

### setLastPosition

> **setLastPosition**: `Dispatch`\<`SetStateAction`\<[`LastPositionState`](../type-aliases/LastPositionState.md)\>\>

Defined in: [types/reversi.ts:104](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L104)
