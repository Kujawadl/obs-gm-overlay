import { format, parse } from "date-fns";

export const sqliteDateFormat = "yyyy-MM-dd HH:mm:ss";

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

	return format(value, sqliteDateFormat);
}

/**
 * Formats a datetime value from SQLite into a Date object
 */
export function parseDate(value: string): Date {
	return parse(value, sqliteDateFormat, new Date());
}
