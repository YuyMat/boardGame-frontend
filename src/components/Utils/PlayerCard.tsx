import { useMemo } from 'react';
import { Avatar, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getRandomInt } from '@/utils/getRandom';
import { Role } from '@/constants/utils';
import { PlayerCardProps } from '@/types/utils';
import Loading from './Loading';

/**
 * プレイヤー情報を表示するカードコンポーネント
 * 
 * @param props - PlayerCardProps
 * @returns Reactコンポーネント
 * 
 * @remarks
 * - Guest IDの衝突確率は約 1.1 × 10⁻⁷ (1000000-9999999の範囲) であり、
 *   ルーム内の少人数（通常2人）での利用においては十分に安全であるため、この範囲を採用しています。
 * - 名前が長すぎる場合は右端がグラデーションで透明になります。
 */
export default function PlayerCard({
	playerRole,
	cardRole,
	members,
	mainAvatarBGcolor,
	subAvatarBGcolor,
}: PlayerCardProps) {
	// 一時的にここでゲストIDを生成しているが、将来的にはサーバーから取得するようにする。
	const guestId = useMemo(() => {
		try {
			return getRandomInt(1000000, 10000000);
		} catch (e) {
			console.error("Failed to generate random ID", e);
			return 1000000;
		}
	}, []);

	const isMe = cardRole === playerRole;
	const isOpponent = !isMe;
	const isWaiting = isOpponent && members < 2;

	const bgColor = cardRole === Role.MAIN ? mainAvatarBGcolor : subAvatarBGcolor;

	return (
		<div className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-xl shadow-sm bg-white h-20 max-w-md mx-auto">
			<div className="flex items-center flex-1 min-w-0 mr-3">
				{isWaiting ?
					<div className="ml-1">
						<Spin size="large" />
					</div> : (
					<Avatar
						style={{ backgroundColor: bgColor, verticalAlign: 'middle', flexShrink: 0 }}
						icon={<UserOutlined />}
						size={48}
					/>
				)}
				<div className="ml-3 flex-1 min-w-0 relative">
					<div 
						className="text-gray-800 font-bold text-2xl whitespace-nowrap overflow-hidden mask-[linear-gradient(to_right,black_80%,transparent_100%)]"
					>
						{isWaiting ? <Loading text="対戦相手を待っています..." /> : `Guest${guestId}`}
					</div>
				</div>
			</div>

			<div className="shrink-0 text-gray-500 font-bold text-sm whitespace-nowrap">
				{isMe ? "あなた" : "相手"}
			</div>
		</div>
	);
}
