import { moviesMockData } from "@/data/movies";
import { MovieProps } from "@/types/Movies";
import { FetchResponseWithCursorResponse } from "@/types/server";
import { GetMoviesOptions } from "./types";

const fetchMoviesFromDB = async (
	cursor: string | null,
	limit: number,
	processedIds: string[]
): Promise<MovieProps[]> => {
	try {
		let startIndex = 0;

		if (cursor) {
			const cursorIndex = moviesMockData.findIndex(
				(movie) => movie.id === cursor
			);
			startIndex = cursorIndex + 1;
		}

		const moviesFromIndex = moviesMockData.slice(startIndex);
		const filteredMovies = moviesFromIndex.filter(
			(movie) => !processedIds.includes(movie.id)
		);
		const limitedMovies = filteredMovies.slice(0, limit);

		return limitedMovies;
	} catch (error) {
		console.error("Error fetching movies from DB:", error);
		throw error;
	}
};
export const getRecommendedMovies = async ({
	limit = 10,
	cursor = null,
	processedIds = [],
}: GetMoviesOptions): Promise<FetchResponseWithCursorResponse<MovieProps>> => {
	try {
		const fetchMoviesBatch = async (
			currentCursor: string | null,
			accumulatedMovies: MovieProps[] = []
		): Promise<FetchResponseWithCursorResponse<MovieProps>> => {
			const newMovies = await fetchMoviesFromDB(
				currentCursor,
				limit,
				processedIds
			);

			const allMovies = accumulatedMovies.concat(newMovies);

			const shouldFetchMore = allMovies.length < limit && newMovies.length > 0;
			if (shouldFetchMore) {
				const lastMovie = newMovies[newMovies.length - 1];
				return fetchMoviesBatch(lastMovie.id, allMovies);
			}

			const isNextPageAvailable = newMovies.length === limit;
			const lastMovieId = isNextPageAvailable
				? newMovies[newMovies.length - 1].id
				: null;

			return {
				data: allMovies,
				cursor: lastMovieId,
			};
		};

		return fetchMoviesBatch(cursor);
	} catch (error) {
		console.error("Error fetching movies:", error);
		throw error;
	}
};
