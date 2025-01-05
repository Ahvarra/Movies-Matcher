import { moviesMockData } from "@/data/movies";
import { MovieProps } from "@/types/Movies";
import { getPastTenseVerb } from "@/utils";
import { cookies } from "next/headers";

const DELAY_TIME = 300;
const PROCESSED_MOVIES_COOKIE = "processed-movies";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const getProcessedMovies = async (): Promise<string[]> => {
	const cookieStore = await cookies();
	const processedMovies = cookieStore.get(PROCESSED_MOVIES_COOKIE);
	return processedMovies ? JSON.parse(processedMovies.value) : [];
};

export const saveProcessedMovie = async (movieId: string) => {
	const cookieStore = await cookies();
	const processedMovies = await getProcessedMovies();

	if (!processedMovies.includes(movieId)) {
		processedMovies.push(movieId);
		cookieStore.set(PROCESSED_MOVIES_COOKIE, JSON.stringify(processedMovies), {
			maxAge: COOKIE_MAX_AGE,
			path: "/",
		});
	}
};

const simulateNetworkDelay = (signal?: AbortSignal): Promise<void> => {
	return new Promise((resolve, reject) => {
		const timeout = setTimeout(resolve, DELAY_TIME);

		signal?.addEventListener("abort", () => {
			clearTimeout(timeout);
			reject(new Error("Request Aborted"));
		});
	});
};
export const fetchMoviesFromDB = async (
	cursor: string | null,
	limit: number,
	processedIds: string[],
	signal?: AbortSignal
): Promise<MovieProps[]> => {
	try {
		if (signal?.aborted) throw new Error("Request Aborted");

		await simulateNetworkDelay(signal);

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

export const handleProcessingMovieAction = async (
	movieId: string,
	action: "approve" | "reject"
) => {
	try {
		console.log(`Movie ${movieId} - ${getPastTenseVerb(action)}`);

		await saveProcessedMovie(movieId);

		return { success: true };
	} catch (error) {
		console.error(`Error ${action}ing movie:`, error);
		throw error;
	}
};
