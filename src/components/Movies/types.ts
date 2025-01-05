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
