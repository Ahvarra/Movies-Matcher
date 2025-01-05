export type FetchResponseWithCursorResponse<T> = {
	data: T[];
	cursor?: string | null;
};

export type FetchOptions = {
	limit?: number;
	cursor?: string | null;
	signal?: AbortSignal;
};
