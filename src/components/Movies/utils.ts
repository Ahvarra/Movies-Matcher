import { rejectMovie } from "@/controllers/movies";

import { approveMovie } from "@/controllers/movies";
import { MovieProps } from "@/types/Movies";
import { SetStateAction } from "react";
import { Dispatch } from "react";

export const basicAnimationOptions = {
	layout: "position" as const,
	transition: {
		layout: {
			type: "spring",
			stiffness: 200,
			damping: 25,
			mass: 0.8,
		},
		default: {
			type: "spring",
			stiffness: 200,
			damping: 25,
			mass: 0.8,
		},
	},
	animate: {
		opacity: 1,
		x: 0,
		scale: 1,
	},
	drag: "x" as const,
	dragConstraints: { left: 0, right: 0 },
};

export function getDependentAnimationOptions({
	exitDirection,
}: {
	exitDirection: number;
}) {
	return {
		initial: {
			opacity: 0,
			x: exitDirection < 0 ? 500 : -500,
			scale: 1,
		},
		exit: {
			opacity: 0,
			x: exitDirection < 0 ? -500 : 500,
			scale: 1,
		},
		whileDrag: {
			rotate: exitDirection > 0 ? 3 : -3,
			filter: exitDirection > 0 ? "brightness(1.15)" : "brightness(0.7)",
		},
	};
}

export async function handleMovieAction({
	movieId,
	action,
	setProcessedIds,
	setMovies,
}: {
	movieId: string;
	action: "approve" | "reject";
	setProcessedIds: Dispatch<SetStateAction<string[]>>;
	setMovies: Dispatch<SetStateAction<MovieProps[]>>;
}) {
	try {
		const chosenAction = action === "approve" ? approveMovie : rejectMovie;
		const result = await chosenAction(movieId);
		if (!result.success) return;

		setProcessedIds((prev) => [...prev, movieId]);
		setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
	} catch (error) {
		console.error(`Error ${action}ing movie:`, error);
	}
}
