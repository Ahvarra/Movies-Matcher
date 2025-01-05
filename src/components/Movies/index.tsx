"use client";
import { useState } from "react";
import { MovieCard } from "./Card";
import { MoviesListProps } from "./types";
import styles from "./rwd.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { basicAnimationOptions, getDependentAnimationOptions } from "./utils";

export function MoviesList({ initialMovies, slidesPerView }: MoviesListProps) {
	const [movies, setMovies] = useState(initialMovies);
	const [exitDirection, setExitDirection] = useState(0);

	const removeMovie = (movieId: string) => {
		setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
	};

	return (
		<div className={styles.container}>
			<AnimatePresence mode="popLayout" initial={true}>
				{movies.slice(0, slidesPerView).map((movie) => (
					<motion.article
						key={movie.id}
						className={styles.wrapper}
						{...basicAnimationOptions}
						{...getDependentAnimationOptions({ exitDirection })}
						onDrag={(e, info) => {
							setExitDirection(info.offset.x);
						}}
						onDragEnd={(e, info) => {
							if (Math.abs(info.offset.x) > 100) {
								removeMovie(movie.id);
							}
						}}
					>
						<MovieCard {...movie} onRemove={() => removeMovie(movie.id)} />
					</motion.article>
				))}
			</AnimatePresence>
		</div>
	);
}
