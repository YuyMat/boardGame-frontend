[**frontend v0.1.0**](../../../../../README.md)

***

[frontend](../../../../../modules.md) / [hooks/connect4/\_internal/useConnect4GameState](../README.md) / useConnect4GameState

# Function: useConnect4GameState()

> **useConnect4GameState**(): `object`

Defined in: [hooks/connect4/\_internal/useConnect4GameState.ts:11](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/hooks/connect4/_internal/useConnect4GameState.ts#L11)

Connect4のボード状態を管理する内部フック
外部から直接使用せず、useConnect4Gameから使用される

## Returns

`object`

### board

> **board**: [`BoardState`](../../../../../types/connect4/type-aliases/BoardState.md)

### setBoard

> **setBoard**: `Dispatch`\<`SetStateAction`\<[`BoardState`](../../../../../types/connect4/type-aliases/BoardState.md)\>\>

### lastPosition

> **lastPosition**: [`lastPositionState`](../../../../../types/connect4/type-aliases/lastPositionState.md)

### setLastPosition

> **setLastPosition**: `Dispatch`\<`SetStateAction`\<[`lastPositionState`](../../../../../types/connect4/type-aliases/lastPositionState.md)\>\>

### canPlay

> **canPlay**: `boolean`

### setCanPlay

> **setCanPlay**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

### isDraw

> **isDraw**: `boolean`

### setIsDraw

> **setIsDraw**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

### resetGameState()

> **resetGameState**: () => `void`

#### Returns

`void`
