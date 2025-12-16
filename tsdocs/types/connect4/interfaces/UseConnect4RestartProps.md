[**frontend v0.1.0**](../../../README.md)

***

[frontend](../../../modules.md) / [types/connect4](../README.md) / UseConnect4RestartProps

# Interface: UseConnect4RestartProps

Defined in: [types/connect4.ts:87](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L87)

## Properties

### socketRef

> **socketRef**: `RefObject`\<`Socket`\<`DefaultEventsMap`, `DefaultEventsMap`\> \| `null`\>

Defined in: [types/connect4.ts:88](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L88)

***

### roomId

> **roomId**: `string`

Defined in: [types/connect4.ts:89](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L89)

***

### membersRef

> **membersRef**: `RefObject`\<`number`\>

Defined in: [types/connect4.ts:90](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L90)

***

### setMatchState

> **setMatchState**: `Dispatch`\<`SetStateAction`\<[`MatchState`](../../utils/type-aliases/MatchState.md)\>\>

Defined in: [types/connect4.ts:91](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L91)

***

### setIsWin

> **setIsWin**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

Defined in: [types/connect4.ts:92](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L92)

***

### resetGameState()

> **resetGameState**: () => `void`

Defined in: [types/connect4.ts:93](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L93)

#### Returns

`void`

***

### setCurrentRole

> **setCurrentRole**: `Dispatch`\<`SetStateAction`\<[`RoleState`](../type-aliases/RoleState.md)\>\>

Defined in: [types/connect4.ts:94](https://github.com/YuyMat/boardGame-frontend/blob/d0dc3cf3d8e8ba24e20f7d4b015cbe0b14edbbdd/src/types/connect4.ts#L94)
