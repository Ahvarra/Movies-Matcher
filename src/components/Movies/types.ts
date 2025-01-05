import { MovieProps } from "@/types/Movies";

export type MoviesMatcherOptions = {
	MOVIES_THRESHOLD: number;
	THROTTLE_DELAY: number;
};

export type MoviesListProps = {
	initialMovies: MovieProps[];
	slidesPerView: number;
	isMobile: boolean;
	initialCursor?: string | null;
	moviesMatcherOptions: MoviesMatcherOptions;
};

type UseMoviesHookProps = {
	initialMovies: MovieProps[];
	moviesMatcherOptions: MoviesMatcherOptions;
};

export type UseMoviesHookReturn = {
	movies: MovieProps[];
	exitDirection: number;
	handleApproveMovie: (movieId: string) => void;
	handleRejectMovie: (movieId: string) => void;
	handleDirectionChange: (direction: number) => void;
	throttledHandleDirectionChange: (direction: number) => void;
	message: string;
};

export type UseMoviesHook = (props: UseMoviesHookProps) => UseMoviesHookReturn;
