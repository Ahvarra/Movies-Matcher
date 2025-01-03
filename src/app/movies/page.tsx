import { Title } from "@/components";
import { getRecommendedMovies } from "@/controllers/movies";
import { MoviesList } from "@/components/Movies";
import { cookies } from "next/headers";

export default async function MoviesPage() {
	const cookieStore = await cookies();
	const processedMoviesCookie = cookieStore.get("processedMovies");
	const processedIds = processedMoviesCookie
		? JSON.parse(processedMoviesCookie.value)
		: [];

	const { data: movies, cursor } = await getRecommendedMovies({
		limit: 10,
		cursor: null,
		processedIds,
	});

	return (
		<section className="flex flex-col items-center justify-center min-h-screen">
			<Title
				title="Movies Matcher"
				subtitle="Find your next favorite movie"
				visibleDescription
			/>
			<MoviesList initialMovies={movies} initialCursor={cursor} />
		</section>
	);
}
