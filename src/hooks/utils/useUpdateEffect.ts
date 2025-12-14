import { useEffect, useRef } from 'react';

/**
 * 初回レンダリング時の実行をスキップする`useEffect`のカスタムフックです。
 * 依存配列の変更時のみエフェクトを実行し、マウント時には実行しません。
 * 
 * @param effect - 実行するエフェクト関数（クリーンアップ関数を返すことも可能）
 * @param deps - 依存配列（この配列の要素が変更された時にエフェクトが実行される）
 * 
 * @remarks
 * - 通常の`useEffect`はマウント時にも実行されますが、このフックは2回目以降の変更時のみ実行されます
 * - 状態の変更に対してのみ反応したい場合（初期値には反応したくない場合）に使用
 * 
 * @example
 * ```tsx
 * // boardが変更された時のみ勝敗判定を実行（初期値では実行しない）
 * useUpdateEffect(() => {
 *   checkWin(board);
 * }, [board]);
 * ```
 */
export const useUpdateEffect = (effect: React.EffectCallback, deps: React.DependencyList) => {
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    return effect();
  }, deps);
};
