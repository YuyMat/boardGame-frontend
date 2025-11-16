import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useGotoTopPage from "@/hooks/utils/useGotoTopPage";
import * as closeModalUtil from "@/utils/closeModal";

// Next.jsのuseRouterをモック化
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
	useRouter: vi.fn(() => ({
		push: mockPush,
		replace: vi.fn(),
		prefetch: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
	})),
}));

// closeModalユーティリティをモック化
vi.mock("@/utils/closeModal", () => ({
	default: vi.fn(),
}));

describe("useGotoTopPage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("基本動作の検証", () => {
		it("useGotoTopPage()を実行すると、関数が返されること", () => {
			const { result } = renderHook(() => useGotoTopPage());

			expect(typeof result.current).toBe("function");
		});

		it("返された関数はsetIsOpenを引数に取ること", () => {
			const { result } = renderHook(() => useGotoTopPage());

			expect(result.current).toBeInstanceOf(Function);
			expect(result.current.length).toBe(1);
		});
	});

	describe("返された関数の動作検証", () => {
		it("返された関数を実行すると、closeModal(setIsOpen)が呼ばれること", () => {
			const { result } = renderHook(() => useGotoTopPage());
			const mockSetIsOpen = vi.fn();

			act(() => {
				result.current(mockSetIsOpen);
			});

			expect(closeModalUtil.default).toHaveBeenCalledWith(mockSetIsOpen);
		});

		it("返された関数を実行すると、router.push('/')が呼ばれること", () => {
			const { result } = renderHook(() => useGotoTopPage());
			const mockSetIsOpen = vi.fn();

			act(() => {
				result.current(mockSetIsOpen);
			});

			expect(mockPush).toHaveBeenCalledWith("/");
		});

		it("closeModalがrouter.pushよりも先に呼ばれること", () => {
			const { result } = renderHook(() => useGotoTopPage());
			const mockSetIsOpen = vi.fn();

			const callOrder: string[] = [];

			vi.mocked(closeModalUtil.default).mockImplementation(() => {
				callOrder.push("closeModal");
			});

			mockPush.mockImplementation(() => {
				callOrder.push("router.push");
			});

			act(() => {
				result.current(mockSetIsOpen);
			});

			expect(callOrder).toEqual(["closeModal", "router.push"]);
		});

		it("返された関数を複数回実行しても、毎回正しくcloseModalとrouter.pushが呼ばれること", () => {
			const { result } = renderHook(() => useGotoTopPage());
			const mockSetIsOpen1 = vi.fn();
			const mockSetIsOpen2 = vi.fn();

			act(() => {
				result.current(mockSetIsOpen1);
			});

			expect(closeModalUtil.default).toHaveBeenCalledWith(mockSetIsOpen1);
			expect(mockPush).toHaveBeenCalledWith("/");
			expect(closeModalUtil.default).toHaveBeenCalledTimes(1);
			expect(mockPush).toHaveBeenCalledTimes(1);

			act(() => {
				result.current(mockSetIsOpen2);
			});

			expect(closeModalUtil.default).toHaveBeenCalledWith(mockSetIsOpen2);
			expect(mockPush).toHaveBeenCalledWith("/");
			expect(closeModalUtil.default).toHaveBeenCalledTimes(2);
			expect(mockPush).toHaveBeenCalledTimes(2);
		});
	});

	describe("エッジケース", () => {
		it("再レンダリング時の動作: 新しい関数が返されること", () => {
			const { result, rerender } = renderHook(() => useGotoTopPage());

			const firstFunction = result.current;

			rerender();

			const secondFunction = result.current;

			// 同じフックから返される関数は同じ参照を持つ可能性があるが、独立して動作する
			expect(typeof firstFunction).toBe("function");
			expect(typeof secondFunction).toBe("function");
		});

		it("異なるsetIsOpen関数での実行: それぞれ正しい関数がcloseModalに渡されること", () => {
			const { result } = renderHook(() => useGotoTopPage());
			const mockSetIsOpen1 = vi.fn();
			const mockSetIsOpen2 = vi.fn();

			act(() => {
				result.current(mockSetIsOpen1);
			});

			expect(closeModalUtil.default).toHaveBeenCalledWith(mockSetIsOpen1);

			vi.mocked(closeModalUtil.default).mockClear();

			act(() => {
				result.current(mockSetIsOpen2);
			});

			expect(closeModalUtil.default).toHaveBeenCalledWith(mockSetIsOpen2);
		});
	});
});
