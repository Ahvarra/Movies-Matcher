import { getRecommendedMovies } from "@/controllers/movies";
import { MoviesList } from "@/components/Movies";
import { headers } from "next/headers";
import styles from "./rwd.module.scss";
import { getProcessedMovies } from "@/controllers/movies/utils";
import { Title } from "@/components";

const MOBILE_SLIDER_PER_VIEW = 1;
const DESKTOP_SLIDER_PER_VIEW = 3;

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
				/>
			</div>
		</section>
	);
}
