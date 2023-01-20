import { formatDate } from "../../utils";
import type { PlayerInput } from "../server-types";
import type { PlayerModel as Player } from "../resolvers/player";
import type Model from "./_model";
import type { Sql } from "postgres";
import type { CombatantModel as Combatant } from "../resolvers/initiative";

export default class PlayerModel implements Model<Player, PlayerInput> {
	private sql: Sql;

	constructor(sql: Sql) {
		this.sql = sql;
	}

	async get(id: string): Promise<Player | undefined> {
		const results = await this.sql<Player[]>`
			SELECT *
			FROM "Player"
			WHERE "id" = ${id}
		`;
		return results[0];
	}

	async list(campaignId: string): Promise<Player[]> {
		const results = await this.sql<Player[]>`
			SELECT *
			FROM "Player"
			WHERE "campaignId" = ${campaignId}
			ORDER BY "isGM" DESC, "playerName", "characterName"
		`;
		return results?.length ? results : [];
	}

	async create(input: PlayerInput): Promise<Player> {
		if (!input.campaignId) {
			throw new Error("Campaign ID is required to create a player");
		}
		const results = await this.sql<Player[]>`
			INSERT INTO "Player" (
				"campaignId",
				"playerName",
				"characterName",
				"isGM",
				"inspiration"
			) VALUES (
				${input.campaignId},
				${input.playerName ?? null},
				${input.characterName ?? null},
				${input.isGM ?? false},
				${input.inspiration ?? 0}
			) RETURNING *
		`;
		return results[0];
	}

	async update(player: Player, input: PlayerInput): Promise<Player> {
		const result = await this.sql.begin(async (sql) => {
			const results = await sql<Player[]>`
				UPDATE "Player"
				SET
					"campaignId" = ${input.campaignId ?? player.campaignId},
					"playerName" = ${input.playerName ?? player.playerName},
					"characterName" = ${input.characterName ?? player.characterName ?? null},
					"isGM" = ${input.isGM ?? player.isGM ?? false},
					"inspiration" = ${input.inspiration ?? player.inspiration ?? 0},
					"lastInspirationUsed" = ${
						typeof input.inspiration === "number" &&
						input.inspiration < player.inspiration
							? formatDate(new Date())
							: player.lastInspirationUsed ?? null
					}
				WHERE "id" = ${player.id}
				RETURNING *
			`;
			if (input.characterName && player.characterName !== input.characterName) {
				await sql<Combatant[]>`
					UPDATE "Combatant"
					SET "name" = ${input.characterName}
					WHERE
						"campaignId" = ${input.campaignId ?? player.campaignId} AND
						"playerId" = ${player.id}
				`;
			}
			return results?.[0];
		});
		return result;
	}

	async delete(id: string): Promise<boolean> {
		await this.sql.begin(async (sql) => {
			await sql`DELETE FROM "Combatant" WHERE "playerId" = ${id}`;
			await sql`DELETE FROM "Player" WHERE "id" = ${id}`;
		});
		return true;
	}

	async resetCooldown(id: string): Promise<boolean> {
		await this.sql`
			UPDATE "Player"
			SET "lastInspirationUsed" = NULL
			WHERE "id" = ${id}
		`;
		return true;
	}
}
