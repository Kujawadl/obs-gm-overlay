import { join } from "path";
import sqlite from "better-sqlite3-helper";

sqlite({
	path: join(process.cwd(), "obs-gm-overlay.db"),
	readonly: false,
	fileMustExist: false,
	migrate: {
		force: false,
		table: "migrations",
		migrationsPath: "./migrations",
	},
}).migrate();
