"use server";

import { MovieProps } from "@/types/Movies";
import { FetchResponseWithCursorResponse } from "@/types/server";
import { GetMoviesOptions } from "./types";
import { fetchMoviesFromDB, handleProcessingMovieAction } from "./utils";

export const getRecommendedMovies = async ({
	limit = 10,
	cursor = null,
	processedIds = [],
	signal,
}: GetMoviesOptions): Promise<FetchResponseWithCursorResponse<MovieProps>> => {
	try {
		const fetchMoviesBatch = async (
			currentCursor: string | null,
			accumulatedMovies: MovieProps[] = []
		): Promise<FetchResponseWithCursorResponse<MovieProps>> => {
			const newMovies = await fetchMoviesFromDB(
				currentCursor,
				limit - accumulatedMovies.length,
				processedIds,
				signal
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

export const approveMovie = async (movieId: string) => {
	try {
		return handleProcessingMovieAction(movieId, "approve");
	} catch (error) {
		console.error("Error approving movie:", error);
		return { success: false, error: "Failed to approve movie" };
	}
};

export const rejectMovie = async (movieId: string) => {
	try {
		return handleProcessingMovieAction(movieId, "reject");
	} catch (error) {
		console.error("Error rejecting movie:", error);
		return { success: false, error: "Failed to reject movie" };
	}
};
