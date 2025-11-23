[**frontend v0.1.0**](../../../README.md)

***

[frontend](../../../modules.md) / [types/reversi](../README.md) / UseReversiSocketSyncProps

# Interface: UseReversiSocketSyncProps

Defined in: [types/reversi.ts:101](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L101)

## Properties

### socketRef

> **socketRef**: `RefObject`\<`Socket`\<`DefaultEventsMap`, `DefaultEventsMap`\> \| `null`\>

Defined in: [types/reversi.ts:102](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L102)

***

### roomId

> **roomId**: `string`

Defined in: [types/reversi.ts:103](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L103)

***

### matchState

> **matchState**: [`MatchState`](../type-aliases/MatchState.md)

Defined in: [types/reversi.ts:104](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L104)

***

### board

> **board**: [`BoardState`](../type-aliases/BoardState.md)

Defined in: [types/reversi.ts:105](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L105)

***

### lastPosition

> **lastPosition**: [`LastPositionState`](../type-aliases/LastPositionState.md)

Defined in: [types/reversi.ts:106](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L106)

***

### currentRole

> **currentRole**: [`RoleState`](../type-aliases/RoleState.md)

Defined in: [types/reversi.ts:107](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L107)

***

### setBoard

> **setBoard**: `Dispatch`\<`SetStateAction`\<[`BoardState`](../type-aliases/BoardState.md)\>\>

Defined in: [types/reversi.ts:108](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L108)

***

### setCurrentRole

> **setCurrentRole**: `Dispatch`\<`SetStateAction`\<[`RoleState`](../type-aliases/RoleState.md)\>\>

Defined in: [types/reversi.ts:109](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L109)

***

### setLastPosition

> **setLastPosition**: `Dispatch`\<`SetStateAction`\<[`LastPositionState`](../type-aliases/LastPositionState.md)\>\>

Defined in: [types/reversi.ts:110](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/types/reversi.ts#L110)
