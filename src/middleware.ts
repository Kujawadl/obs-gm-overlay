import type { NextRequest } from "next/server";

/**
 * TODO: This re-runs the initialize function on every non-API request.
 * There's got to be a better way to get this initialize function to actually
 * run on server init besides just always rerunning it on every page load.
 */
export async function middleware(req: NextRequest) {
	try {
		if (!req.url.match(/\/api\//gi)) {
			const initUrl = new URL("/api/initialize", req.url);
			await fetch(initUrl);
		}
	} catch (error) {
		console.log(error);
	}
}
