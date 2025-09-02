export default function Page({ params }: { params: { roomId: string } }) {
	return (
		<div>
			<h1>{params.roomId}</h1>
		</div>
	);
}