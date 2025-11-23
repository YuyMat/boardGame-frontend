[**frontend v0.1.0**](../../../README.md)

***

[frontend](../../../modules.md) / [types/connect4](../README.md) / UseConnect4RestartProps

# Interface: UseConnect4RestartProps

Defined in: [types/connect4.ts:86](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L86)

## Properties

### socketRef

> **socketRef**: `RefObject`\<`Socket`\<`DefaultEventsMap`, `DefaultEventsMap`\> \| `null`\>

Defined in: [types/connect4.ts:87](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L87)

***

### roomId

> **roomId**: `string`

Defined in: [types/connect4.ts:88](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L88)

***

### membersRef

> **membersRef**: `RefObject`\<`number`\>

Defined in: [types/connect4.ts:89](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L89)

***

### setMatchState

> **setMatchState**: `Dispatch`\<`SetStateAction`\<[`MatchState`](../type-aliases/MatchState.md)\>\>

Defined in: [types/connect4.ts:90](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L90)

***

### setIsWin

> **setIsWin**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

Defined in: [types/connect4.ts:91](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L91)

***

### resetGameState()

> **resetGameState**: () => `void`

Defined in: [types/connect4.ts:92](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L92)

#### Returns

`void`

***

### setCurrentRole

> **setCurrentRole**: `Dispatch`\<`SetStateAction`\<[`RoleState`](../type-aliases/RoleState.md)\>\>

Defined in: [types/connect4.ts:93](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L93)
