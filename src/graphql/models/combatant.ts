import { createId } from "@paralleldrive/cuid2";
import { CombatantModel as Combatant } from "../resolvers/initiative";
import { CombatantInput } from "../server-types";
import Model from "./_model";
import type { DatabaseSync } from "node:sqlite";

export default class CombatantModel extends Model<Combatant, CombatantInput> {
	constructor(private sql: DatabaseSync) {
		super();
	}

	get(id: string): Combatant | undefined {
		return id
			? (this.sql
					.prepare(`SELECT * FROM "Combatant" WHERE "id" = ?`)
					.get(id) as unknown as Combatant)
			: undefined;
	}

	list(encounterId: string): Combatant[] {
		const results = this.sql
			.prepare(
				`
					SELECT *
					FROM "Combatant"
					WHERE "encounterId" = ?
					ORDER BY "turnOrder", "name"
				`,
			)
			.all(encounterId) as unknown as Combatant[];
		return results?.length ? results : [];
	}

	create(input: CombatantInput): Combatant {
		const id = createId();
		this.sql
			.prepare(
				`
					INSERT INTO "Combatant" (
						"id",
						"campaignId",
						"encounterId",
						"playerId",
						"name",
						"public",
						"turnOrder"
					) VALUES (
						?,
						?,
						?,
						?,
						?,
						?,
						?
					);
				`,
			)
			.run(
				id,
				input.campaignId,
				input.encounterId,
				input.playerId ?? null,
				(input.name ?? "").trim(),
				this.boolean(input.public ?? false),
				input.turnOrder ?? 0,
			);
		return this.get(id) as Combatant;
	}

	update(combatant: Combatant, input: CombatantInput): Combatant {
		this.sql
			.prepare(
				`
					UPDATE "Combatant"
					SET
						"campaignId" = ?,
						"encounterId" = ?,
						"playerId" = ?,
						"name" = ?,
						"public" = ?,
						"turnOrder" = ?
					WHERE "id" = ?
					RETURNING *
				`,
			)
			.run(
				input.campaignId ?? combatant.campaignId,
				input.encounterId ?? combatant.encounterId,
				input.playerId ?? combatant.playerId ?? null,
				(input.name ?? combatant.name ?? "").trim(),
				this.boolean(input.public ?? combatant.public ?? false),
				input.turnOrder ?? combatant.turnOrder ?? 0,
				combatant.id,
			);
		return this.get(combatant.id) as Combatant;
	}

	delete(id: string): boolean {
		this.sql.prepare(`DELETE FROM "Combatant" WHERE "id" = ?`).run(id);
		return true;
	}

	bulkUpdate(input: CombatantInput[]): Combatant[] {
		return input.map((combatant) => {
			let id = combatant.id;
			if (!id) {
				id = createId();
				this.sql
					.prepare(
						`
					INSERT INTO "Combatant" (
					  "id",
						"campaignId",
						"encounterId",
						"playerId",
						"name",
						"public",
						"turnOrder"
					) VALUES (
					  ?,
						?,
						?,
						?,
						?,
						?,
						?
					)
				`,
					)
					.run(
						id,
						combatant.campaignId,
						combatant.encounterId,
						combatant.playerId ?? null,
						(combatant.name ?? "").trim(),
						this.boolean(combatant.public ?? false),
						combatant.turnOrder ?? 0,
					);
			} else {
				this.sql
					.prepare(
						`
							UPDATE "Combatant"
							SET
								"campaignId" = ?,
								"encounterId" = ?,
								"playerId" = ?,
								"name" = ?,
								"public" = ?,
								"turnOrder" = ?
							WHERE "id" = ?;
						`,
					)
					.run(
						combatant.campaignId,
						combatant.encounterId,
						combatant.playerId ?? null,
						(combatant.name ?? "").trim(),
						this.boolean(combatant.public ?? false),
						combatant.turnOrder ?? 0,
						id,
					);
			}
			return this.get(id) as Combatant;
		});
	}
}
