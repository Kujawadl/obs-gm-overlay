import { config } from "dotenv";
import { migrate } from "postgres-migrations";

config({ path: ".env.local" });

(async function () {
	let { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
	// Next.JS config values need to have $ escaped; unescape them for this script
	[DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT] = [
		DB_NAME,
		DB_USER,
		DB_PASSWORD,
		DB_HOST,
		DB_PORT,
	].map((value) => value?.replace(/\\\$/g, "$"));
	if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
		console.log("No database configuration specified. Check .env.");
		return;
	}
	const dbConfig = {
		database: DB_NAME,
		user: DB_USER,
		password: DB_PASSWORD,
		host: DB_HOST,
		port: parseInt(DB_PORT || "5432"),
		ensureDatabaseExists: true,
		defaultDatabase: DB_NAME,
	};

	await migrate(dbConfig, "migrations");
})();
