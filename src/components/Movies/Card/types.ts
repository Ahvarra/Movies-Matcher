import { MovieProps } from "@/types/Movies";

export type MovieCardProps = MovieProps & {
	handleAddMovieToFavorites: (movieId: string) => void;
	handleRemoveMovie: (movieId: string) => void;
	handleDirectionChange: (direction: number) => void;
};
