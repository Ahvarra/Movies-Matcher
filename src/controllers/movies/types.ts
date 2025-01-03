import { FetchOptions } from "@/types/server";

export type GetMoviesOptions = FetchOptions & {
	processedIds?: string[];
};
