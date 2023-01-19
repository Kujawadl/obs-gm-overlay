import { PlayerInput } from "../server-types";
import { PlayerModel as Player } from "../resolvers/player";
import { formatDate } from "../../utils";
import Model from "./_model";
import type { Database } from "better-sqlite3";

export default class PlayerModel implements Model<Player, PlayerInput> {
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	async get(id: string): Promise<Player | undefined> {
		return this.db.prepare("SELECT * FROM Player WHERE id = ?").get(id);
	}

	async list(campaignId: string): Promise<Player[]> {
		const players = await this.db
			.prepare("SELECT * FROM Player WHERE campaignId = ?")
			.all(campaignId);
		return players.length ? players : [];
	}

	async create(input: PlayerInput): Promise<Player> {
		const result = await this.db
			.prepare(
				`
        INSERT INTO Player (
          campaignId,
          playerName,
          characterName,
          isGM,
          inspiration
        ) VALUES (?, ?, ?, ?, ?)
      `
			)
			.run(
				input.campaignId,
				input.playerName,
				input.characterName,
				input.isGM ?? false ? 1 : 0,
				input.inspiration ?? 0
			);
		if (!result.lastInsertRowid) {
			throw new Error("Error inserting new player record");
		}
		await this.db
			.prepare(
				`
			INSERT INTO Combatant (
				campaignId,
				playerId,
				name,
				public
			) VALUES(?, ?, ?, ?)
		`
			)
			.run(input.campaignId, result.lastInsertRowid, input.characterName, 1);
		return this.get(result.lastInsertRowid.toString()) as Promise<Player>;
	}

	async update(player: Player, input: PlayerInput): Promise<Player> {
		await this.db
			.prepare(
				`
        UPDATE Player
        SET
          campaignId = ?,
          playerName = ?,
          characterName = ?,
          isGM = ?,
          inspiration = ?,
					lastInspirationUsed = ?
        WHERE id = ?
      `
			)
			.run(
				input.campaignId ?? player.campaignId,
				input.playerName ?? player.playerName,
				input.characterName ?? player.characterName,
				input.isGM ?? player.isGM ?? false ? 1 : 0,
				input.inspiration ?? player.inspiration ?? 0,
				typeof input.inspiration === "number" &&
					input.inspiration < player.inspiration
					? formatDate(new Date())
					: player.lastInspirationUsed,
				player.id
			);
		if (input.characterName && player.characterName !== input.characterName) {
			await this.db
				.prepare(
					`
				UPDATE Combatant
				SET name = ?
				WHERE
					campaignId = ? AND
					playerId = ?
			`
				)
				.run(
					input.characterName,
					input.campaignId ?? player.campaignId,
					player.id
				);
		}
		return this.get(player.id) as Promise<Player>;
	}

	async delete(id: string): Promise<boolean> {
		await this.db.prepare("DELETE FROM Combatant WHERE playerId = ?").run(id);
		await this.db.prepare("DELETE FROM Player WHERE id = ?").run(id);
		return true;
	}

	async resetCooldown(id: string): Promise<boolean> {
		await this.db
			.prepare("UPDATE Player SET lastInspirationUsed = NULL WHERE id = ?")
			.run(id);
		return true;
	}
}
