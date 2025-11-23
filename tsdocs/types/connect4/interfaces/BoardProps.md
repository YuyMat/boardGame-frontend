[**frontend v0.1.0**](../../../README.md)

***

[frontend](../../../modules.md) / [types/connect4](../README.md) / BoardProps

# Interface: BoardProps

Defined in: [types/connect4.ts:21](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L21)

## Properties

### board

> **board**: [`BoardState`](../type-aliases/BoardState.md)

Defined in: [types/connect4.ts:22](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L22)

***

### onCellClick()

> **onCellClick**: (`colIndex`) => `void`

Defined in: [types/connect4.ts:23](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L23)

#### Parameters

##### colIndex

`number`

#### Returns

`void`

***

### isWin

> **isWin**: `boolean`

Defined in: [types/connect4.ts:24](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L24)

***

### isDraw

> **isDraw**: `boolean`

Defined in: [types/connect4.ts:25](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L25)

***

### setIsWin

> **setIsWin**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

Defined in: [types/connect4.ts:26](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L26)

***

### onRestart()

> **onRestart**: () => `void`

Defined in: [types/connect4.ts:27](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L27)

#### Returns

`void`

***

### currentRole

> **currentRole**: [`RoleState`](../type-aliases/RoleState.md)

Defined in: [types/connect4.ts:28](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L28)

***

### lastPosition

> **lastPosition**: [`lastPositionState`](../type-aliases/lastPositionState.md)

Defined in: [types/connect4.ts:29](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/connect4.ts#L29)
