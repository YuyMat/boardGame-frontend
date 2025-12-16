[**frontend v0.1.0**](../../../README.md)

***

[frontend](../../../modules.md) / [types/reversi](../README.md) / UseReversiRestartProps

# Interface: UseReversiRestartProps

Defined in: [types/reversi.ts:123](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L123)

## Properties

### socketRef

> **socketRef**: `RefObject`\<`Socket`\<`DefaultEventsMap`, `DefaultEventsMap`\> \| `null`\>

Defined in: [types/reversi.ts:124](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L124)

***

### roomId

> **roomId**: `string`

Defined in: [types/reversi.ts:125](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L125)

***

### membersRef

> **membersRef**: `RefObject`\<`number`\>

Defined in: [types/reversi.ts:126](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L126)

***

### setMatchState

> **setMatchState**: `Dispatch`\<`SetStateAction`\<[`MatchState`](../../utils/type-aliases/MatchState.md)\>\>

Defined in: [types/reversi.ts:127](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L127)

***

### setIsWin

> **setIsWin**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

Defined in: [types/reversi.ts:128](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L128)

***

### resetGameState()

> **resetGameState**: () => `void`

Defined in: [types/reversi.ts:129](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L129)

#### Returns

`void`

***

### setCurrentRole

> **setCurrentRole**: `Dispatch`\<`SetStateAction`\<[`RoleState`](../type-aliases/RoleState.md)\>\>

Defined in: [types/reversi.ts:130](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/reversi.ts#L130)
