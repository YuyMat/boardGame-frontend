[**frontend v0.1.0**](../../../../README.md)

***

[frontend](../../../../modules.md) / [hooks/utils/useGotoTopPage](../README.md) / default

# Function: default()

> **default**(): (`setIsOpen`) => `void`

Defined in: [hooks/utils/useGotoTopPage.ts:20](https://github.com/YuyMat/boardGame-frontend/blob/e1a14249541aeaf6e70aca503c708635378832f7/src/hooks/utils/useGotoTopPage.ts#L20)

モーダルを閉じてトップページに遷移する関数を返すカスタムフックです。

## Returns

モーダルを閉じてトップページ（"/"）に遷移する関数

> (`setIsOpen`): `void`

### Parameters

#### setIsOpen

`Dispatch`\<`SetStateAction`\<`boolean`\>\>

### Returns

`void`

## Remarks

このフックはリザルト画面などで「ゲーム一覧に戻る」機能を提供する際に使用されます。

## Example

```tsx
const gotoTopPage = useGotoTopPage();
// モーダルを閉じてトップページに遷移
gotoTopPage(setIsOpen);
```
