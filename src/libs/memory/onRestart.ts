import { createInitialCardBoard, createInitialCardStateBoard } from "@/libs/memory/createInitialBoards";
import { OnRestartProps } from "@/types/memory";
import { Role } from "@/constants/memory";

/**
 * ゲームをリスタート（初期化）します。
 * ボードの再生成、スコアのリセット、プレイヤーのリセットなどを行います。
 *
 * @param props - リスタート処理に必要なパラメータ
 * @param props.setCardBoard - カードボードを更新するセッター関数
 * @param props.setCardStateBoard - カード状態ボードを更新するセッター関数
 * @param props.setCurrentRole - 現在のプレイヤーを更新するセッター関数
 * @param props.setScores - スコアを更新するセッター関数
 * @param props.setIsFinished - ゲーム終了フラグを更新するセッター関数
 * @param props.setCanPlay - プレイ可能フラグを更新するセッター関数
 * @param props.settings - 現在のゲーム設定
 */
export const onRestart = ({ setCardBoard, setCardStateBoard, setCurrentRole, setScores, setIsFinished, setCanPlay, settings }: OnRestartProps) => {
	setCardBoard(createInitialCardBoard(settings.cards));
	setCardStateBoard(createInitialCardStateBoard(settings.cards));
	setCurrentRole(settings.firstRole);
	setScores({ [Role.BLUE]: 0, [Role.GREEN]: 0 });
	setIsFinished(false);
	setCanPlay(true);
}
