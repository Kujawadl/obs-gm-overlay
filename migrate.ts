import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { join } from "path";

async function migrate() {
  const db = await open({
    filename: join(process.cwd(), "obs-gm-overlay.db"),
    driver: sqlite3.Database,
  });

  await db.migrate({ migrationsPath: join(process.cwd(), "migrations") });
}

migrate();
