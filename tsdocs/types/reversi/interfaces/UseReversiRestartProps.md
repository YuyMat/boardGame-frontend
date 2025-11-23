[**frontend v0.1.0**](../../../README.md)

***

[frontend](../../../modules.md) / [types/reversi](../README.md) / UseReversiRestartProps

# Interface: UseReversiRestartProps

Defined in: [types/reversi.ts:129](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L129)

## Properties

### socketRef

> **socketRef**: `RefObject`\<`Socket`\<`DefaultEventsMap`, `DefaultEventsMap`\> \| `null`\>

Defined in: [types/reversi.ts:130](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L130)

***

### roomId

> **roomId**: `string`

Defined in: [types/reversi.ts:131](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L131)

***

### membersRef

> **membersRef**: `RefObject`\<`number`\>

Defined in: [types/reversi.ts:132](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L132)

***

### setMatchState

> **setMatchState**: `Dispatch`\<`SetStateAction`\<[`MatchState`](../type-aliases/MatchState.md)\>\>

Defined in: [types/reversi.ts:133](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L133)

***

### setIsWin

> **setIsWin**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

Defined in: [types/reversi.ts:134](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L134)

***

### resetGameState()

> **resetGameState**: () => `void`

Defined in: [types/reversi.ts:135](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L135)

#### Returns

`void`

***

### setCurrentRole

> **setCurrentRole**: `Dispatch`\<`SetStateAction`\<[`RoleState`](../type-aliases/RoleState.md)\>\>

Defined in: [types/reversi.ts:136](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L136)
