[**frontend v0.1.0**](../../../README.md)

***

[frontend](../../../modules.md) / [utils/getRandom](../README.md) / getRandomInt

# Function: getRandomInt()

> **getRandomInt**(`min`, `max`): `number`

Defined in: [utils/getRandom.ts:13](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/utils/getRandom.ts#L13)

指定された範囲内のランダムな整数を生成します。

## Parameters

### min

`number`

最小値（この値を含む）

### max

`number`

最大値（この値は含まない）

## Returns

`number`

min以上max未満のランダムな整数

## Throws

maxがmin以下の場合はエラーをスロー

## Example

```ts
getRandomInt(1, 10); // 1〜9のいずれかの整数を返す
getRandomInt(0, 2);  // 0または1を返す
```
