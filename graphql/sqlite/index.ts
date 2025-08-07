import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const userDataPath =
	process.env.APPDATA ||
	(process.platform == "darwin"
		? process.env.HOME + "/Library/Preferences"
		: process.env.HOME + "/.local/share");
const obsGmOverlayPath = path.join(userDataPath, "obs-gm-overlay");
const dbPath = path.join(userDataPath, "obs-gm-overlay", "database.sqlite");
const backupPath = dbPath + ".bak";

/**
 * Create the .sqlite file, if it does not already exist.
 */
function createSqliteFile() {
	// Create the directory if necessary
	if (!fs.existsSync(obsGmOverlayPath)) {
		fs.mkdirSync(obsGmOverlayPath, { recursive: true });
	}
	// Touch the file
	if (!fs.existsSync(dbPath)) {
		console.log("Creating new database at", dbPath);
		fs.closeSync(fs.openSync(dbPath, "w"));
	}
}

/**
 * We should always be deleting the backup file after any migrations. If there is a stale backup hanging around, it
 * means something catastrophic happened and the process crashed before we could delete it. To avoid leaving the main db
 * in a bad state, we make a timestamped copy of it for posterity and then restore the stale backup.
 */
function restoreStaleBackup() {
	if (fs.existsSync(backupPath)) {
		console.warn(
			"Stale backup found! This could be indicative of a prior crash. Restoring the last known good backup...",
		);
		const posterityPath = dbPath + new Date().toISOString() + ".bak";
		fs.copyFileSync(dbPath, posterityPath);
		fs.copyFileSync(backupPath, dbPath);
		fs.rmSync(backupPath);
		console.warn("Backup restored!");
		console.warn(`Possibly bad database backed up at ${posterityPath}`);
		return;
	}
}

function runMigrations(dbPath: string, backupPath: string) {
	console.debug("Creating backup of existing database...");
	fs.copyFileSync(dbPath, backupPath);

	try {
		console.debug("Running migrations...");
		const sql = new DatabaseSync(dbPath, {
			open: true,
		});
		const migrations = fs
			.readdirSync(path.join(__dirname, "migrations"), { withFileTypes: true })
			.filter((file) => file.name.endsWith(".sql"))
			.map((file) => ({
				name: file.name.replace(/\.sql$/, ""),
				sql: fs.readFileSync(
					path.join(__dirname, "migrations", file.name),
					"utf-8",
				),
			}));
		sql.exec(`
			CREATE TABLE IF NOT EXISTS "Migration" (
				"id" SERIAL PRIMARY KEY,
				"name" TEXT NOT NULL,
				"sql" TEXT NOT NULL,
				"executedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
			);
		`);
		for (const migration of migrations) {
			const existing = sql
				.prepare(`SELECT * FROM Migration WHERE name = ?`)
				.get(migration.name);
			if (!existing) {
				console.debug(`Running migration: ${migration.name}`);
				sql.exec(migration.sql);
				sql
					.prepare(`INSERT INTO Migration (name, sql) VALUES (?, ?)`)
					.run(migration.name, migration.sql);
			} else {
				console.debug(`Skipping migration: ${migration.name}`);
			}
		}
		return sql;
	} catch (error) {
		console.error("Error running migrations:", error);
		console.debug("Restoring database from backup...");
		fs.copyFileSync(dbPath + ".bak", dbPath);
		throw error;
	}
}

export function getSqliteDb() {
	createSqliteFile();
	restoreStaleBackup();
	return runMigrations(dbPath, backupPath);
}
