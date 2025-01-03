"use server";

import { MovieCard } from "./Card";
import { MoviesListProps } from "./types";

export async function MoviesList({ initialMovies }: MoviesListProps) {
	return (
		<div>
			{initialMovies.map((movie) => (
				<MovieCard key={movie.id} {...movie} />
			))}
		</div>
	);
}
