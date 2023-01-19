import { CombatantInput } from "../server-types";
import { CombatantModel as Combatant } from "../resolvers/initiative";
import Model from "./_model";
import type { Database } from "better-sqlite3";

export default class CombatantModel
	implements Model<Combatant, CombatantInput>
{
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	async get(id: string): Promise<Combatant | undefined> {
		return this.db.prepare("SELECT * FROM Combatant WHERE id = ?").get(id);
	}

	async list(encounterId: string): Promise<Combatant[]> {
		const players = await this.db
			.prepare(
				"SELECT * FROM Combatant WHERE encounterId = ? ORDER BY turnOrder, name"
			)
			.all(encounterId);
		return players.length ? players : [];
	}

	async create(input: CombatantInput): Promise<Combatant> {
		const result = await this.db
			.prepare(
				`
        INSERT INTO Combatant (
          campaignId,
					encounterId,
          playerId,
          name,
          public,
					turnOrder
        ) VALUES (?, ?, ?, ?, ?, ?)
      `
			)
			.run(
				input.campaignId,
				input.encounterId,
				input.playerId,
				input.name ?? "n/a",
				input.public ?? false ? 1 : 0,
				input.turnOrder ?? 0
			);
		if (!result.lastInsertRowid) {
			throw new Error("Error inserting new combatant record");
		}
		return this.get(result.lastInsertRowid.toString()) as Promise<Combatant>;
	}

	async update(
		combatant: Combatant,
		input: CombatantInput
	): Promise<Combatant> {
		await this.db
			.prepare(
				`
        UPDATE Combatant
        SET
				campaignId,
				encounterId,
				playerId,
				name,
				public,
				turnOrder
        WHERE id = ?
      `
			)
			.run(
				input.campaignId ?? combatant.campaignId,
				input.encounterId ?? combatant.encounterId,
				input.playerId ?? combatant.playerId,
				input.name ?? combatant.name,
				input.public ?? combatant.public ?? false ? 1 : 0,
				input.turnOrder ?? combatant.turnOrder ?? 0,
				combatant.id
			);
		return this.get(combatant.id) as Promise<Combatant>;
	}

	async delete(id: string): Promise<boolean> {
		await this.db.prepare("DELETE FROM Combatant WHERE id = ?").run(id);
		return true;
	}
}
