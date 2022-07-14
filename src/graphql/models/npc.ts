import { NpcInput } from "../server-types";
import { NpcModel as NPC } from "../resolvers/npc";
import type { Database } from "better-sqlite3";

export default class NpcModel {
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	async get(id: string): Promise<NPC | undefined> {
		return this.db.prepare("SELECT * FROM NPC WHERE id = ?").get(id);
	}

	async list(campaignId: string): Promise<NPC[]> {
		const npcs = await this.db
			.prepare("SELECT * FROM NPC WHERE campaignId = ?")
			.all(campaignId);
		return npcs.length ? npcs : [];
	}

	async create(input: NpcInput): Promise<NPC> {
		const result = await this.db
			.prepare(
				`
        INSERT INTO NPC (
          campaignId,
          name,
          public,
          initiative
        ) VALUES (?, ?, ?, ?)
      `
			)
			.run(
				input.campaignId,
				input.name,
				input.public ?? false ? 1 : 0,
				input.initiative ?? 0
			);
		if (!result.lastInsertRowid) {
			throw new Error("Error inserting new NPC record");
		}
		return this.get(result.lastInsertRowid.toString()) as Promise<NPC>;
	}

	async update(npc: NPC, input: NpcInput): Promise<NPC> {
		await this.db
			.prepare(
				`
        UPDATE NPC
        SET
          campaignId = ?,
          name = ?,
          public = ?,
          initiative = ?
        WHERE id = ?
      `
			)
			.run(
				input.campaignId ?? npc.campaignId,
				input.name ?? npc.name,
				input.public ?? npc.public ? 1 : 0,
				input.initiative ?? npc.initiative ?? 0,
				npc.id
			);
		return this.get(npc.id) as Promise<NPC>;
	}

	async delete(id: string): Promise<boolean> {
		await this.db.prepare("DELETE FROM NPC WHERE id = ?").run(id);
		return true;
	}

	async deleteAll(campaignId: string): Promise<boolean> {
		await this.db
			.prepare("DELETE FROM NPC WHERE campaignId = ?")
			.run(campaignId);
		return true;
	}

	async resetInitiativeForCampaign(campaignId: string): Promise<boolean> {
		await this.db
			.prepare("UPDATE NPC SET initiative = 0 WHERE campaignId = ?")
			.run(campaignId);
		return true;
	}
}
