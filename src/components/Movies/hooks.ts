import { useEffect, useMemo, useRef, useState } from "react";
import { UseMoviesHook } from "./types";
import { getRecommendedMovies } from "@/controllers/movies";
import throttle from "lodash.throttle";
import { useAbortController } from "@/hooks/useAbortController";
import { handleMovieAction } from "./utils";

const MOVIES_THRESHOLD = 3;
const THROTTLE_DELAY = 150;
const AVAILABLE_ACTIONS = ["approve", "reject"] as const;

export const useMovies: UseMoviesHook = ({ initialMovies }) => {
	const { getController, abortAndReset } = useAbortController();
	const isLoadingRef = useRef(false);

	const [movies, setMovies] = useState(initialMovies);
	const [exitDirection, setExitDirection] = useState(0);
	const [processedIds, setProcessedIds] = useState<string[]>([]);
	const [message, setMessage] = useState<string>("");

	const [handleApproveMovie, handleRejectMovie] = AVAILABLE_ACTIONS.map(
		(action) => (movieId: string) =>
			handleMovieAction({
				action,
				movieId,
				setProcessedIds,
				setMovies,
			})
	);

	const handleDirectionChange = (direction: number) => {
		setExitDirection(direction);
	};

	const throttledHandleDirectionChange = useMemo(
		() => throttle((x: number) => handleDirectionChange(x), THROTTLE_DELAY),
		[handleDirectionChange]
	);

	useEffect(() => {
		const shouldLoadMore = movies.length <= MOVIES_THRESHOLD;
		if (!shouldLoadMore || isLoadingRef.current) return;

		const loadMoreMovies = async () => {
			try {
				isLoadingRef.current = true;
				abortAndReset();

				const controller = getController();
				const lastMovieId = movies[movies.length - 1]?.id;
				if (!lastMovieId) return;

				const result = await getRecommendedMovies({
					processedIds,
					limit: 10,
					cursor: lastMovieId,
				});

				const isDataLoadedSuccessfully =
					!controller.signal.aborted && result.data;
				if (!isDataLoadedSuccessfully) return;

				const isAnyMovieLoaded = result.data.length > 0;
				if (!isAnyMovieLoaded) return;

				setMovies((prev) => [...prev, ...result.data]);
			} catch (error) {
				if (error instanceof Error && error.name !== "AbortError") {
					console.error("Error loading more movies:", error);
				}
			} finally {
				isLoadingRef.current = false;
			}
		};

		loadMoreMovies();

		return () => {
			abortAndReset();
		};
	}, [movies.length]);

	useEffect(() => {
		return () => {
			throttledHandleDirectionChange.cancel();
		};
	}, [throttledHandleDirectionChange]);

	useEffect(() => {
		const isAnyMovieToLoad = movies.length > 0;
		if (isAnyMovieToLoad) return;

		setMessage("No more movies to load for You, sir!");
	}, [movies.length]);

	return {
		movies,
		exitDirection,
		handleRejectMovie,
		handleApproveMovie,
		handleDirectionChange,
		throttledHandleDirectionChange,
		message,
	};
};
