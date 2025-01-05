"use client";
import { MovieCard } from "./Card";
import { MoviesListProps } from "./types";
import styles from "./rwd.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { basicAnimationOptions, getDependentAnimationOptions } from "./utils";
import { useMovies } from "./hooks";

export function MoviesList({
	initialMovies,
	slidesPerView,
	moviesMatcherOptions,
}: MoviesListProps) {
	const {
		movies,
		message,
		exitDirection,
		handleRejectMovie,
		handleApproveMovie,
		handleDirectionChange,
		throttledHandleDirectionChange,
	} = useMovies({ initialMovies, moviesMatcherOptions });

	return (
		<AnimatePresence mode="popLayout" initial={true}>
			{message && <h2 className={styles.message}>{message}</h2>}
			{movies.slice(0, slidesPerView).map((movie) => (
				<motion.article
					key={movie.id}
					className={styles.wrapper}
					{...basicAnimationOptions}
					{...getDependentAnimationOptions({ exitDirection })}
					onDrag={(e, info) => {
						throttledHandleDirectionChange(info.offset.x);
					}}
					onDragEnd={(e, info) => {
						const swipeDistance = info.offset.x;
						const isSwipedEnough = Math.abs(swipeDistance) > 100;
						if (!isSwipedEnough) return;
						const isSwipedRight = swipeDistance > 0;
						if (isSwipedRight) {
							handleApproveMovie(movie.id);
							return;
						}
						handleRejectMovie(movie.id);
					}}
				>
					<MovieCard
						{...movie}
						handleApproveMovie={handleApproveMovie}
						handleRejectMovie={handleRejectMovie}
						handleDirectionChange={handleDirectionChange}
					/>
				</motion.article>
			))}
		</AnimatePresence>
	);
}
