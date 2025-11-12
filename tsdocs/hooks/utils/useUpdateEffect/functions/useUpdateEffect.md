[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [hooks/utils/useUpdateEffect](../README.md) / useUpdateEffect

# Function: useUpdateEffect()

> **useUpdateEffect**(`effect`, `deps`): `void`

Defined in: [hooks/utils/useUpdateEffect.ts:22](https://github.com/YuyMat/boardGame-frontend/blob/b1016e2a0c10c4591b81b48d72fc6c96a85783a4/src/hooks/utils/useUpdateEffect.ts#L22)

初回レンダリング時の実行をスキップする`useEffect`のカスタムフックです。
依存配列の変更時のみエフェクトを実行し、マウント時には実行しません。

## Parameters

### effect

`EffectCallback`

実行するエフェクト関数（クリーンアップ関数を返すことも可能）

### deps

`DependencyList`

依存配列（この配列の要素が変更された時にエフェクトが実行される）

## Returns

`void`

## Remarks

- 通常の`useEffect`はマウント時にも実行されますが、このフックは2回目以降の変更時のみ実行されます
- 状態の変更に対してのみ反応したい場合（初期値には反応したくない場合）に使用

## Example

```tsx
// boardが変更された時のみ勝敗判定を実行（初期値では実行しない）
useUpdateEffect(() => {
  checkWin(board);
}, [board]);
```
