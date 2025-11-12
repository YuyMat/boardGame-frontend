import { OnRestartProps } from "@/types/connect4";
import { createEmptyBoard } from "@/libs/connect4/createEmptyBoard";

/**
 * Connect4ゲームを初期状態にリセットします。
 * ボード、勝利フラグ、プレイ可能フラグ、最後の位置をすべてリセットします。
 * 
 * @param params - リスタート処理に必要なパラメータ
 * @param params.setIsWin - 勝利フラグを更新するセッター関数
 * @param params.setBoard - ボードの状態を更新するセッター関数
 * @param params.setCanPlay - プレイ可能フラグを更新するセッター関数
 * @param params.setLastPosition - 最後の位置を更新するセッター関数
 * 
 * @remarks
 * この関数を呼び出すと、ゲームは完全に初期状態に戻ります。
 */
export const onRestart = ({ setIsWin, setBoard, setCanPlay, setLastPosition, setIsDraw }: OnRestartProps) => {
	setIsWin(false);
	setBoard(createEmptyBoard());
	setCanPlay(true);
	setLastPosition({ row: null, col: null });
	setIsDraw(false);
}
