import { MovieProps } from "@/types/Movies";

export type MoviesListProps = {
	initialMovies: MovieProps[];
	slidesPerView: number;
	isMobile: boolean;
	initialCursor?: string | null;
};

type UseMoviesHookProps = {
	initialMovies: MovieProps[];
};

type UseMoviesHookReturn = {
	movies: MovieProps[];
	exitDirection: number;
	rejectMovie: (movieId: string) => void;
	addMovieToFavorites: (movieId: string) => void;
	handleDirectionChange: (direction: number) => void;
	throttledHandleDirectionChange: (direction: number) => void;
};

export type UseMoviesHook = (props: UseMoviesHookProps) => UseMoviesHookReturn;
