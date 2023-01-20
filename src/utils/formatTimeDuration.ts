import { intervalToDuration, formatDuration as format } from "date-fns";
import type { Locale } from "date-fns";

type Units = "hours" | "minutes" | "seconds";

export function formatTimeDuration(
	start: Date,
	end: Date,
	units: Units[] = ["hours", "minutes", "seconds"]
) {
	const formatDistanceLocale = {
		xSeconds: "{{count}}",
		xMinutes: "{{count}}",
		xHours: "{{count}}",
	};
	const shortEnLocale: Locale = {
		formatDistance: (
			token: keyof typeof formatDistanceLocale,
			count: string | number
		) =>
			formatDistanceLocale[token].replace(
				"{{count}}",
				count?.toString().padStart(2, "0")
			),
	};

	const duration = intervalToDuration({
		start,
		end,
	});
	return format(duration, {
		format: units,
		locale: shortEnLocale,
		delimiter: ":",
		zero: true,
	}).replace(/^0(\d)/, "$1");
}
