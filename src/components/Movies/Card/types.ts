import { MovieProps } from "@/types/Movies";
import { UseMoviesHookReturn } from "@/components/Movies/types";

export type MovieCardProps = MovieProps &
	Pick<
		UseMoviesHookReturn,
		"handleApproveMovie" | "handleRejectMovie" | "handleDirectionChange"
	>;
