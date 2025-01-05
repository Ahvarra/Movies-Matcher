"use client";
import { MovieCard } from "./Card";
import { MoviesListProps } from "./types";
import styles from "./rwd.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { basicAnimationOptions, getDependentAnimationOptions } from "./utils";
import { useMovies } from "./hooks";

export function MoviesList({ initialMovies, slidesPerView }: MoviesListProps) {
	const {
		movies,
		message,
		exitDirection,
		rejectMovie,
		addMovieToFavorites,
		handleDirectionChange,
		throttledHandleDirectionChange,
	} = useMovies({ initialMovies });

	return (
		<AnimatePresence mode="popLayout" initial={true}>
			{message ? <h2 className={styles.message}>{message}</h2> : null}
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
							addMovieToFavorites(movie.id);
							return;
						}
						rejectMovie(movie.id);
					}}
				>
					<MovieCard
						{...movie}
						handleAddMovieToFavorites={addMovieToFavorites}
						handleRemoveMovie={rejectMovie}
						handleDirectionChange={handleDirectionChange}
					/>
				</motion.article>
			))}
		</AnimatePresence>
	);
}
