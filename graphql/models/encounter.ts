import { createId } from "@paralleldrive/cuid2";
import Model from "./_model";
import type { DatabaseSync } from "node:sqlite";
import type { EncounterInput, HideMonsterNames } from "@graphql/server-types";

export interface Encounter {
	id: string;
	campaignId: string;
	name: string;
	hideMonsterNames: HideMonsterNames;
	round: number;
	turn: number;
	turnStart: string;
	dateCreated: string;
}

interface TurnQuery {
	encounterId: string;
	turn: number;
}

export class EncounterModel extends Model<Encounter, EncounterInput> {
	constructor(private sql: DatabaseSync) {
		super();
	}

	get(id: string): Encounter | undefined {
		return id
			? (this.sql
					.prepare('SELECT * FROM "Encounter" WHERE "id" = ?')
					.get(id) as unknown as Encounter)
			: undefined;
	}

	list(campaignId: string): Encounter[] {
		const results = this.sql
			.prepare(
				`
					SELECT *
					FROM "Encounter"
					WHERE "campaignId" = ?
					ORDER BY "name"
				`,
			)
			.all(campaignId) as unknown as Encounter[];
		return results?.length ? results : [];
	}

	create(input: EncounterInput): Encounter {
		const id = createId();
		this.sql
			.prepare(
				`
					INSERT INTO "Encounter" (
						"id",
						"campaignId",
						"name",
						"hideMonsterNames",
						"round",
						"turn",
						"turnStart"
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
				input.campaignId,
				input.name ?? "n/a",
				input.hideMonsterNames ?? "never",
				input.round ?? 0,
				input.turn ?? 0,
				input.turnStart ?? null,
			);
		return this.get(id) as Encounter;
	}

	update(encounter: Encounter, input: EncounterInput): Encounter {
		this.sql
			.prepare(
				`
				UPDATE "Encounter"
				SET
					"campaignId" = ?,
					"name" = ?,
					"hideMonsterNames" = ?,
					"round" = ?,
					"turn" = ?,
					"turnStart" = ?
				WHERE "id" = ?
		`,
			)
			.run(
				input.campaignId ?? encounter.campaignId,
				input.name ?? encounter.name ?? "n/a",
				input.hideMonsterNames ?? encounter.hideMonsterNames ?? "never",
				input.round ?? encounter.round ?? 0,
				input.turn ?? encounter.turn ?? 0,
				input.turnStart ?? encounter.turnStart,
				encounter.id,
			);
		return this.get(encounter.id) as Encounter;
	}

	delete(id: string): boolean {
		this.sql.prepare(`DELETE FROM "Encounter" WHERE "id" = ?`).run(id);
		return true;
	}

	findNextTurn(
		encounterId: string,
		currentTurn: number,
		currentRound: number,
	): [nextTurn: number, nextRound: number] {
		const nextTurn = this.sql
			.prepare(
				`
						SELECT
							"encounterId",
							MIN("turnOrder") turn
						FROM "Combatant"
						WHERE
							"encounterId" = ? AND
							"turnOrder" > ?
						GROUP BY "encounterId"
					`,
			)
			.get(encounterId, currentTurn) as unknown as TurnQuery | undefined;
		return nextTurn?.turn
			? [nextTurn.turn, Math.max(currentRound, 1) || 1]
			: [1, currentRound + 1];
	}

	findPrevTurn(
		encounterId: string,
		currentTurn: number,
		currentRound: number,
	): [prevTurn: number, prevRound: number] {
		if (currentTurn === 0 && currentRound === 0) {
			return [currentTurn, currentRound];
		}
		const prevTurn = this.sql
			.prepare(
				`
					SELECT
						"encounterId",
						MAX("turnOrder") turn
					FROM "Combatant"
					WHERE
						"encounterId" = ? AND
						"turnOrder" < ?
					GROUP BY "encounterId"
				`,
			)
			.get(encounterId, currentTurn) as unknown as TurnQuery | undefined;
		const maxTurn = this.sql
			.prepare(
				`
					SELECT
						"encounterId",
						MAX("turnOrder") turn
					FROM "Combatant"
					WHERE
						"encounterId" = ?
					GROUP BY "encounterId"
				`,
			)
			.get(encounterId) as unknown as TurnQuery | undefined;
		return prevTurn?.turn
			? [prevTurn.turn, currentRound]
			: currentRound === 1
				? [0, 0]
				: [maxTurn?.turn ?? 0, Math.max(currentRound - 1, 0)];
	}
}
