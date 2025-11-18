"use client"

import { useState } from "react";

/**
 * ゲームの先手プレイヤーの選択状態を管理する汎用カスタムフックです。
 *
 * 各ゲーム固有の役割型（例: Connect4 の `RoleState`）を型引数として渡すことで、
 * `'random' | RoleType` という型で先手設定を扱えます。
 *
 * @typeParam RoleType - ゲームごとのプレイヤー役割の型
 *
 * @returns 先手設定の状態と更新関数を含むオブジェクト
 * - `firstRole`: 現在の先手設定（'random' | RoleType）
 * - `setFirstRole`: 先手設定を更新するセッター関数
 *
 * @remarks
 * - 初期値は 'random'（ランダムに先手を決定）です
 * - ゲーム開始前に先手プレイヤーを選択する機能を提供します
 */
export type FirstRoleState<RoleType> = "random" | RoleType;

export default function useFirstRole<RoleType>() {
	const [firstRole, setFirstRole] = useState<FirstRoleState<RoleType>>("random");

	return {
		firstRole,
		setFirstRole,
	};
}
