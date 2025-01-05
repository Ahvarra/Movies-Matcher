import { useState } from "react";
import { UseMoviesHook } from "./types";

export const useMovies: UseMoviesHook = ({ initialMovies }) => {
	const [movies, setMovies] = useState(initialMovies);
	const [exitDirection, setExitDirection] = useState(0);

	const rejectMovie = (movieId: string) => {
		setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
	};

	const addMovieToFavorites = (movieId: string) => {
		setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
	};

	const handleDirectionChange = (direction: number) => {
		setExitDirection(direction);
	};

	return {
		movies,
		exitDirection,
		rejectMovie,
		addMovieToFavorites,
		handleDirectionChange,
	};
};
