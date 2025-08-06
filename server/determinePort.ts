import portscanner from "portscanner";

/**
 * In development, it's important that the port in .env is consistently used so
 * the Vite proxy works correctly.
 *
 * In prod, that constraint no longer applies, so we want to be resilient in
 * case the port is already in use.
 */
export default async function determinePort() {
	const port = parseInt(process.env.PORT || "4000", 10);
	if (process.env.NODE_ENV === "production") {
		const portStatus = await portscanner.checkPortStatus(port, "127.0.0.1");
		if (portStatus === "closed") {
			return port;
		} else {
			const newPort = await portscanner.findAPortNotInUse(
				port,
				port + 999,
				"127.0.0.1",
			);
			return newPort;
		}
	} else {
		return port;
	}
}
