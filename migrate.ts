import { join } from "path";
import sqlite from "better-sqlite3-helper";

// The first call creates the global instance with your settings
sqlite({
	path: join(process.cwd(), "obs-gm-overlay.db"),
	readonly: false,
	fileMustExist: false,
	migrate: {
		force: false,
		table: "migrations",
		migrationsPath: "./migrations",
	},
});
