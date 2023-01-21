import { CombatantInput } from "../server-types";
import { CombatantModel as Combatant } from "../resolvers/initiative";
import Model from "./_model";
import type { Sql } from "postgres";

export default class CombatantModel
	implements Model<Combatant, CombatantInput>
{
	private sql: Sql;

	constructor(sql: Sql) {
		this.sql = sql;
	}

	async get(id: string): Promise<Combatant | undefined> {
		const results = await this.sql<
			Combatant[]
		>`SELECT * FROM "Combatant" WHERE "id" = ${id}`;
		return results[0];
	}

	async list(encounterId: string): Promise<Combatant[]> {
		const results = await this.sql<Combatant[]>`
			SELECT *
			FROM "Combatant"
			WHERE "encounterId" = ${encounterId}
			ORDER BY "turnOrder", "name"
		`;
		return results?.length ? results : [];
	}

	async create(input: CombatantInput): Promise<Combatant> {
		const results = await this.sql<Combatant[]>`
			INSERT INTO "Combatant" (
				"campaignId",
				"encounterId",
				"playerId",
				"name",
				"public",
				"turnOrder"
			) VALUES (
				${input.campaignId},
				${input.encounterId},
				${input.playerId ?? null},
				${input.name ?? "n/a"},
				${input.public ?? false},
				${input.turnOrder ?? 0}
			) RETURNING *
		`;
		return results[0];
	}

	async update(
		combatant: Combatant,
		input: CombatantInput
	): Promise<Combatant> {
		const results = await this.sql<Combatant[]>`
			UPDATE "Combatant"
			SET
				"campaignId" = ${input.campaignId ?? combatant.campaignId},
				"encounterId" = ${input.encounterId ?? combatant.encounterId},
				"playerId" = ${input.playerId ?? combatant.playerId ?? null},
				"name" = ${input.name ?? combatant.name ?? ""},
				"public" = ${input.public ?? combatant.public ?? false},
				"turnOrder" = ${input.turnOrder ?? combatant.turnOrder ?? 0}
			WHERE "id" = ${combatant.id}
			RETURNING *
		`;
		return results[0];
	}

	async delete(id: string): Promise<boolean> {
		await this.sql`DELETE FROM "Combatant" WHERE "id" = ${id}`;
		return true;
	}

	async bulkUpdate(input: CombatantInput[]): Promise<Combatant[]> {
		return await this.sql.begin((sql) => {
			return Promise.all(
				input.map((combatant) => {
					if (!combatant.id) {
						return sql<Combatant[]>`
							INSERT INTO "Combatant" (
								"campaignId",
								"encounterId",
								"playerId",
								"name",
								"public",
								"turnOrder"
							) VALUES (
								${combatant.campaignId},
								${combatant.encounterId},
								${combatant.playerId ?? null},
								${combatant.name ?? ""},
								${combatant.public ?? false},
								${combatant.turnOrder ?? 0}
							) RETURNING *
						`.then((results) => results[0]);
					} else {
						return sql<Combatant[]>`
							UPDATE "Combatant"
							SET
								"campaignId" = ${combatant.campaignId},
								"encounterId" = ${combatant.encounterId},
								"playerId" = ${combatant.playerId ?? null},
								"name" = ${combatant.name ?? ""},
								"public" = ${combatant.public ?? false},
								"turnOrder" = ${combatant.turnOrder ?? 0}
							WHERE "id" = ${combatant.id}
							RETURNING *
						`.then((results) => results[0]);
					}
				})
			);
		});
	}
}
