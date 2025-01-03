import { Title } from "@/components";

export default async function MoviePage({
	params,
}: {
	params: { id: string };
}) {
	return (
		<section className="flex flex-col items-center justify-center min-h-screen">
			<Title title="Movie Matcher" subtitle="Find your next favorite movie" />
		</section>
	);
}
