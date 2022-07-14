import type { Database } from "better-sqlite3";

interface Initiative {
	round: number;
	initiativeCount: number;
	name: string;
	initiative: number;
}

export default class InitiativeModel {
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	get(campaignId: string): Initiative[] {
		return this.db
			.prepare(
				"SELECT * FROM Initiative WHERE campaignId = ? ORDER BY initiative DESC"
			)
			.all(campaignId);
	}
}
