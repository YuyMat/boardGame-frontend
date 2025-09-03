export default async function Page({ params }: { params: { roomId: string } }) {
	const { roomId } = await params;
	
	return (
		<div>
			<h1>{roomId}</h1>
		</div>
	);
}