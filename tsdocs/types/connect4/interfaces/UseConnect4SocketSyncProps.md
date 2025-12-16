[**frontend v0.1.0**](../../../README.md)

***

[frontend](../../../modules.md) / [types/connect4](../README.md) / UseConnect4SocketSyncProps

# Interface: UseConnect4SocketSyncProps

Defined in: [types/connect4.ts:97](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L97)

## Properties

### socketRef

> **socketRef**: `RefObject`\<`Socket`\<`DefaultEventsMap`, `DefaultEventsMap`\> \| `null`\>

Defined in: [types/connect4.ts:98](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L98)

***

### roomId

> **roomId**: `string`

Defined in: [types/connect4.ts:99](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L99)

***

### matchState

> **matchState**: [`MatchState`](../../utils/type-aliases/MatchState.md)

Defined in: [types/connect4.ts:100](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L100)

***

### board

> **board**: [`BoardState`](../type-aliases/BoardState.md)

Defined in: [types/connect4.ts:101](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L101)

***

### currentRole

> **currentRole**: [`RoleState`](../type-aliases/RoleState.md)

Defined in: [types/connect4.ts:102](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L102)

***

### lastPosition

> **lastPosition**: [`lastPositionState`](../type-aliases/lastPositionState.md)

Defined in: [types/connect4.ts:103](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L103)

***

### setBoard

> **setBoard**: `Dispatch`\<`SetStateAction`\<[`BoardState`](../type-aliases/BoardState.md)\>\>

Defined in: [types/connect4.ts:104](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L104)

***

### setCurrentRole

> **setCurrentRole**: `Dispatch`\<`SetStateAction`\<[`RoleState`](../type-aliases/RoleState.md)\>\>

Defined in: [types/connect4.ts:105](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L105)

***

### setLastPosition

> **setLastPosition**: `Dispatch`\<`SetStateAction`\<[`lastPositionState`](../type-aliases/lastPositionState.md)\>\>

Defined in: [types/connect4.ts:106](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L106)
