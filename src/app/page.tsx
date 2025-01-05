import { getRecommendedMovies } from "@/controllers/movies";
import { MoviesList } from "@/components/Movies";
import { headers } from "next/headers";
import styles from "./rwd.module.scss";
import { getProcessedMovies } from "@/controllers/movies/utils";
import { Title } from "@/components";
import { MoviesMatcherOptions } from "@/components/Movies/types";

const MOBILE_SLIDER_PER_VIEW = 1;
const DESKTOP_SLIDER_PER_VIEW = 3;
const DEFAULT_MOVIES_THRESHOLD = 3;
const DEFAULT_THROTTLE_DELAY = 150;

export default async function MoviesPage() {
	const headersList = await headers();
	const isMobile = headersList.get("x-is-mobile") === "true";
	const slidesPerView = isMobile
		? MOBILE_SLIDER_PER_VIEW
		: DESKTOP_SLIDER_PER_VIEW;

	const processedIds = await getProcessedMovies();
	const { data: movies, cursor } = await getRecommendedMovies({
		limit: 10,
		processedIds,
	});

	const moviesMatcherOptions: MoviesMatcherOptions = {
		MOVIES_THRESHOLD: DEFAULT_MOVIES_THRESHOLD,
		THROTTLE_DELAY: DEFAULT_THROTTLE_DELAY,
	};

	return (
		<section className={styles.container}>
			<div className={styles.titleWrapper}>
				<Title title="Movies Matcher" />
			</div>
			<div className={styles.listWrapper}>
				<MoviesList
					initialMovies={movies}
					initialCursor={cursor}
					slidesPerView={slidesPerView}
					isMobile={isMobile}
					moviesMatcherOptions={moviesMatcherOptions}
				/>
			</div>
		</section>
	);
}
