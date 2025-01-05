import { getRecommendedMovies } from "@/controllers/movies";
import { MoviesList } from "@/components/Movies";
import { cookies, headers } from "next/headers";
import { Metadata, Viewport } from "next";
import styles from "./rwd.module.scss";

export const metadata: Metadata = {
	title: "Movies",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

const MOBILE_SLIDER_PER_VIEW = 1;
const DESKTOP_SLIDER_PER_VIEW = 3;

export default async function MoviesPage() {
	const headersList = await headers();
	const isMobile = headersList.get("x-is-mobile") === "true";
	const slidesPerView = isMobile
		? MOBILE_SLIDER_PER_VIEW
		: DESKTOP_SLIDER_PER_VIEW;

	const cookieStore = await cookies();
	const processedMoviesCookie = cookieStore.get("processedMovies");
	const processedIds = processedMoviesCookie
		? JSON.parse(processedMoviesCookie.value)
		: [];

	const { data: movies, cursor } = await getRecommendedMovies({
		limit: 10,
		processedIds,
	});

	return (
		<section className={styles.container}>
			<MoviesList
				initialMovies={movies}
				initialCursor={cursor}
				slidesPerView={slidesPerView}
				isMobile={isMobile}
			/>
		</section>
	);
}
