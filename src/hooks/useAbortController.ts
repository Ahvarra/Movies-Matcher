import { useRef } from "react";

export const useAbortController = () => {
	const abortControllerRef = useRef<AbortController | null>(null);

	const getController = () => {
		if (!abortControllerRef.current) {
			abortControllerRef.current = new AbortController();
		}
		return abortControllerRef.current;
	};

	const abortAndReset = () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			abortControllerRef.current = null;
		}
	};

	return { abortControllerRef, getController, abortAndReset };
};
