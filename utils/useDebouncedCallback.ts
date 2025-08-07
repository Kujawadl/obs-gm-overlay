import { useRef, useCallback } from "react";

/**
 * Returns a memoized function that will only call the passed function when it hasn't been called for the wait period
 * @param func The function to be called
 * @param wait Wait period after function hasn't been called for
 * @returns A memoized function that is debounced
 */
export function useDebouncedCallback<
	T extends (...args: any[]) => any,
	U extends any,
>(func: T, wait: number, deps: U[] = []) {
	// Use a ref to store the timeout between renders
	// and prevent changes to it from causing re-renders
	const timeout = useRef<number | undefined>(undefined);

	return useCallback(
		(...args: Parameters<T>) => {
			const later = () => {
				clearTimeout(timeout.current);
				func(...args);
			};

			clearTimeout(timeout.current);
			timeout.current = window.setTimeout(later, wait);
		},
		[func, wait, ...deps],
	);
}
