import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useUpdateEffect } from "@/hooks/utils/useUpdateEffect";

describe("useUpdateEffect", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("初回レンダリング時の動作", () => {
		it("初回レンダリング時にエフェクト関数が実行されないこと", () => {
			const effectFn = vi.fn();

			renderHook(() => useUpdateEffect(effectFn, []));

			expect(effectFn).not.toHaveBeenCalled();
		});

		it("依存配列が変更されていない初回では、エフェクトがスキップされること", () => {
			const effectFn = vi.fn();
			const dep = "test";

			renderHook(() => useUpdateEffect(effectFn, [dep]));

			expect(effectFn).not.toHaveBeenCalled();
		});
	});

	describe("依存配列変更時の動作", () => {
		it("依存配列の値が変更されると、エフェクト関数が実行されること", () => {
			const effectFn = vi.fn();

			const { rerender } = renderHook(
				({ dep }) => useUpdateEffect(effectFn, [dep]),
				{
					initialProps: { dep: 1 },
				}
			);

			expect(effectFn).not.toHaveBeenCalled();

			rerender({ dep: 2 });

			expect(effectFn).toHaveBeenCalledTimes(1);
		});

		it("複数回の変更に対して、毎回エフェクト関数が実行されること", () => {
			const effectFn = vi.fn();

			const { rerender } = renderHook(
				({ dep }) => useUpdateEffect(effectFn, [dep]),
				{
					initialProps: { dep: 1 },
				}
			);

			expect(effectFn).not.toHaveBeenCalled();

			rerender({ dep: 2 });
			expect(effectFn).toHaveBeenCalledTimes(1);

			rerender({ dep: 3 });
			expect(effectFn).toHaveBeenCalledTimes(2);

			rerender({ dep: 4 });
			expect(effectFn).toHaveBeenCalledTimes(3);
		});
	});

	describe("クリーンアップ関数の動作", () => {
		it("エフェクト関数がクリーンアップ関数を返した場合、次の実行前に呼ばれること", () => {
			const cleanupFn = vi.fn();
			const effectFn = vi.fn(() => cleanupFn);

			const { rerender } = renderHook(
				({ dep }) => useUpdateEffect(effectFn, [dep]),
				{
					initialProps: { dep: 1 },
				}
			);

			// 初回はエフェクトが実行されない
			expect(effectFn).not.toHaveBeenCalled();
			expect(cleanupFn).not.toHaveBeenCalled();

			// 最初の変更
			rerender({ dep: 2 });
			expect(effectFn).toHaveBeenCalledTimes(1);
			expect(cleanupFn).not.toHaveBeenCalled();

			// 2回目の変更（前回のクリーンアップが呼ばれる）
			rerender({ dep: 3 });
			expect(effectFn).toHaveBeenCalledTimes(2);
			expect(cleanupFn).toHaveBeenCalledTimes(1);
		});

		it("アンマウント時にクリーンアップ関数が呼ばれること", () => {
			const cleanupFn = vi.fn();
			const effectFn = vi.fn(() => cleanupFn);

			const { rerender, unmount } = renderHook(
				({ dep }) => useUpdateEffect(effectFn, [dep]),
				{
					initialProps: { dep: 1 },
				}
			);

			// 依存配列を変更してエフェクトを実行
			rerender({ dep: 2 });
			expect(effectFn).toHaveBeenCalledTimes(1);

			// アンマウント
			unmount();
			expect(cleanupFn).toHaveBeenCalledTimes(1);
		});

		it("初回レンダリング時はクリーンアップ関数が呼ばれないこと", () => {
			const cleanupFn = vi.fn();
			const effectFn = vi.fn(() => cleanupFn);

			const { unmount } = renderHook(() => useUpdateEffect(effectFn, []));

			// 初回なのでエフェクトが実行されない
			expect(effectFn).not.toHaveBeenCalled();

			// アンマウント時もクリーンアップは呼ばれない（エフェクトが実行されていないため）
			unmount();
			expect(cleanupFn).not.toHaveBeenCalled();
		});

		it("2回目以降の依存配列変更時に、前回のクリーンアップが実行されてから新しいエフェクトが実行されること", () => {
			const callOrder: string[] = [];
			const cleanupFn = vi.fn(() => {
				callOrder.push("cleanup");
			});
			const effectFn = vi.fn(() => {
				callOrder.push("effect");
				return cleanupFn;
			});

			const { rerender } = renderHook(
				({ dep }) => useUpdateEffect(effectFn, [dep]),
				{
					initialProps: { dep: 1 },
				}
			);

			// 最初の変更
			rerender({ dep: 2 });
			expect(callOrder).toEqual(["effect"]);

			// 2回目の変更
			callOrder.length = 0;
			rerender({ dep: 3 });
			expect(callOrder).toEqual(["cleanup", "effect"]);
		});
	});

	describe("依存配列のバリエーション", () => {
		it("単一の依存値: その値の変更でエフェクトが実行されること", () => {
			const effectFn = vi.fn();

			const { rerender } = renderHook(
				({ dep }) => useUpdateEffect(effectFn, [dep]),
				{
					initialProps: { dep: "initial" },
				}
			);

			expect(effectFn).not.toHaveBeenCalled();

			rerender({ dep: "changed" });
			expect(effectFn).toHaveBeenCalledTimes(1);
		});

		it("単一の依存値: その値が変更されない場合、エフェクトが実行されないこと", () => {
			const effectFn = vi.fn();

			const { rerender } = renderHook(
				({ dep }) => useUpdateEffect(effectFn, [dep]),
				{
					initialProps: { dep: "same" },
				}
			);

			rerender({ dep: "same" });
			rerender({ dep: "same" });

			expect(effectFn).not.toHaveBeenCalled();
		});

		it("複数の依存値: いずれかの値が変更されるとエフェクトが実行されること", () => {
			const effectFn = vi.fn();

			const { rerender } = renderHook(
				({ dep1, dep2 }) => useUpdateEffect(effectFn, [dep1, dep2]),
				{
					initialProps: { dep1: 1, dep2: "a" },
				}
			);

			expect(effectFn).not.toHaveBeenCalled();

			// dep1のみ変更
			rerender({ dep1: 2, dep2: "a" });
			expect(effectFn).toHaveBeenCalledTimes(1);

			// dep2のみ変更
			rerender({ dep1: 2, dep2: "b" });
			expect(effectFn).toHaveBeenCalledTimes(2);

			// 両方変更
			rerender({ dep1: 3, dep2: "c" });
			expect(effectFn).toHaveBeenCalledTimes(3);
		});

		it("複数の依存値: すべての値が変更されない場合、エフェクトが実行されないこと", () => {
			const effectFn = vi.fn();

			const { rerender } = renderHook(
				({ dep1, dep2 }) => useUpdateEffect(effectFn, [dep1, dep2]),
				{
					initialProps: { dep1: 1, dep2: "a" },
				}
			);

			rerender({ dep1: 1, dep2: "a" });
			rerender({ dep1: 1, dep2: "a" });

			expect(effectFn).not.toHaveBeenCalled();
		});

		it("プリミティブ型の依存値: 値の比較が正しく行われること", () => {
			const effectFn = vi.fn();

			const { rerender } = renderHook(
				({ num, str, bool }) => useUpdateEffect(effectFn, [num, str, bool]),
				{
					initialProps: { num: 1, str: "test", bool: true },
				}
			);

			expect(effectFn).not.toHaveBeenCalled();

			// number変更
			rerender({ num: 2, str: "test", bool: true });
			expect(effectFn).toHaveBeenCalledTimes(1);

			// string変更
			rerender({ num: 2, str: "changed", bool: true });
			expect(effectFn).toHaveBeenCalledTimes(2);

			// boolean変更
			rerender({ num: 2, str: "changed", bool: false });
			expect(effectFn).toHaveBeenCalledTimes(3);
		});

		it("オブジェクト・配列の依存値: 参照の変更で正しくエフェクトが実行されること", () => {
			const effectFn = vi.fn();
			const obj1 = { value: 1 };
			const obj2 = { value: 1 };

			const { rerender } = renderHook(
				({ obj }) => useUpdateEffect(effectFn, [obj]),
				{
					initialProps: { obj: obj1 },
				}
			);

			expect(effectFn).not.toHaveBeenCalled();

			// 同じ参照
			rerender({ obj: obj1 });
			expect(effectFn).not.toHaveBeenCalled();

			// 異なる参照（内容は同じ）
			rerender({ obj: obj2 });
			expect(effectFn).toHaveBeenCalledTimes(1);
		});
	});

	describe("エッジケース", () => {
		it("空の依存配列: 初回レンダリング後は一度も実行されないこと", () => {
			const effectFn = vi.fn();

			const { rerender } = renderHook(() => useUpdateEffect(effectFn, []));

			expect(effectFn).not.toHaveBeenCalled();

			rerender();
			rerender();
			rerender();

			expect(effectFn).not.toHaveBeenCalled();
		});

		it("同じ値への更新: エフェクトが実行されないこと", () => {
			const effectFn = vi.fn();

			const { rerender } = renderHook(
				({ dep }) => useUpdateEffect(effectFn, [dep]),
				{
					initialProps: { dep: 1 },
				}
			);

			rerender({ dep: 1 });
			rerender({ dep: 1 });

			expect(effectFn).not.toHaveBeenCalled();
		});

		it("連続した変更: 各変更ごとにエフェクトが実行されること", () => {
			const effectFn = vi.fn();

			const { rerender } = renderHook(
				({ dep }) => useUpdateEffect(effectFn, [dep]),
				{
					initialProps: { dep: 1 },
				}
			);

			// 連続して変更
			rerender({ dep: 2 });
			rerender({ dep: 3 });
			rerender({ dep: 4 });
			rerender({ dep: 5 });

			expect(effectFn).toHaveBeenCalledTimes(4);
		});
	});
});
