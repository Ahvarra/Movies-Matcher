import { MovieProps } from "@/types/Movies";

export type MoviesListProps = {
	initialMovies: MovieProps[];
	slidesPerView: number;
	isMobile: boolean;
	initialCursor?: string | null;
};
