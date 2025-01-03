import { MovieProps } from "@/types/Movies";

export type MoviesListProps = {
	initialMovies: MovieProps[];
	initialCursor?: string | null;
};
