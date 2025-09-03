export default function Page({ params }: { params: { roomId: string } }) {
	const { roomId } = params;
	
	return (
		<div>
			<h1>{roomId}</h1>
		</div>
	);
}