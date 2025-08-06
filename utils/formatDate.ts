import { formatISO, parseISO } from "date-fns";

/**
 * Formats a datetime value for SQLite use
 * @returns A date formatted as "YYYY-MM-DD HH:MM:SS"
 */
export function formatDate(value?: string | Date): string {
	if (!value) {
		value = new Date();
	} else if (typeof value === "string") {
		value = new Date(value);
	}

	return formatISO(value);
}

/**
 * Formats a datetime value from SQLite into a Date object
 */
export function parseDate(
	value?: string | Date | null,
): typeof value extends undefined | null ? undefined : Date {
	if (value instanceof Date) {
		return value;
	} else if (value) {
		return parseISO(value);
	} else {
		// @ts-ignore Weird TS quirk here
		return undefined;
	}
}
