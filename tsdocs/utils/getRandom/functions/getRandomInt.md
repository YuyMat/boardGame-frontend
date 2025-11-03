[**frontend v0.1.0**](../../../README.md)

***

[frontend](../../../modules.md) / [utils/getRandom](../README.md) / getRandomInt

# Function: getRandomInt()

> **getRandomInt**(`min`, `max`): `number`

Defined in: [utils/getRandom.ts:17](https://github.com/YuyMat/boardGame-frontend/blob/7dd50f5fe86bd0c3eeb130ed6337123e7f5495f9/src/utils/getRandom.ts#L17)

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

`min`以上`max`未満のランダムな整数

## Throws

`max`が`min`以下の場合はエラーをスロー

## Example

```typescript
getRandomInt(1, 10); // 1〜9のいずれかの整数を返す
getRandomInt(0, 2);  // 0または1を返す
```
