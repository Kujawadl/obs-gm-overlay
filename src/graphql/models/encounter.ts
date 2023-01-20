import type Model from "./_model";
import type { EncounterInput } from "../server-types";
import type { EncounterModel as Encounter } from "../resolvers/initiative";
import type { Sql } from "postgres";

interface TurnQuery {
	encounterId: string;
	turn: number;
}

export default class EncounterModel
	implements Model<Encounter, EncounterInput>
{
	private sql: Sql;

	constructor(sql: Sql) {
		this.sql = sql;
	}

	async get(id: string): Promise<Encounter | undefined> {
		const results = await this.sql<Encounter[]>`
			SELECT *
			FROM "Encounter"
			WHERE "id" = ${id}
		`;
		return results[0];
	}

	async list(campaignId: string): Promise<Encounter[]> {
		const results = await this.sql<Encounter[]>`
			SELECT *
			FROM "Encounter"
			WHERE "campaignId" = ${campaignId}
			ORDER BY "name"
		`;
		return results?.length ? results : [];
	}

	async create(input: EncounterInput): Promise<Encounter> {
		const results = await this.sql<Encounter[]>`
			INSERT INTO "Encounter" (
				"campaignId",
				"name",
				"hideMonsterNames",
				"round",
				"turn",
				"turnStart"
			) VALUES (
				${input.campaignId},
				${input.name ?? "n/a"},
				${input.hideMonsterNames ?? "never"},
				${input.round ?? 0},
				${input.turn ?? 0},
				${input.turnStart ?? null}
			) RETURNING *
		`;
		return results[0];
	}

	async update(
		encounter: Encounter,
		input: EncounterInput
	): Promise<Encounter> {
		const results = await this.sql<Encounter[]>`
			UPDATE "Encounter"
			SET
				"campaignId" = ${input.campaignId ?? encounter.campaignId},
				"name" = ${input.name ?? encounter.name ?? "n/a"},
				"hideMonsterNames" = ${
					input.hideMonsterNames ?? encounter.hideMonsterNames ?? "never"
				},
				"round" = ${input.round ?? encounter.round ?? 0},
				"turn" = ${input.turn ?? encounter.turn ?? 0},
				"turnStart" = ${input.turnStart ?? encounter.turnStart}
			WHERE "id" = ${encounter.id}
			RETURNING *
		`;
		return results[0];
	}

	async delete(id: string): Promise<boolean> {
		await this.sql`DELETE FROM "Encounter" WHERE "id" = ${id}`;
		return true;
	}

	async findNextTurn(
		encounterId: string,
		currentTurn: number,
		currentRound: number
	): Promise<[nextTurn: number, nextRound: number]> {
		const [nextTurn] =
			(await this.sql<TurnQuery[]>`
				SELECT
					"encounterId",
					MIN("turnOrder") turn
				FROM "Combatant"
				WHERE
					"encounterId" = ${encounterId} AND
					"turnOrder" > ${currentTurn}
				GROUP BY "encounterId"
			`) ?? [];
		return nextTurn?.turn
			? [nextTurn.turn, Math.max(currentRound, 1) || 1]
			: [1, currentRound + 1];
	}

	async findPrevTurn(
		encounterId: string,
		currentTurn: number,
		currentRound: number
	): Promise<[prevTurn: number, prevRound: number]> {
		if (currentTurn === 0 && currentRound === 0) {
			return [currentTurn, currentRound];
		}
		const [prevTurn] =
			(await this.sql<TurnQuery[]>`
				SELECT
					"encounterId",
					MAX("turnOrder") turn
				FROM "Combatant"
				WHERE
					"encounterId" = ${encounterId} AND
					"turnOrder" < ${currentTurn}
				GROUP BY "encounterId"
			`) ?? [];
		const [maxTurn] =
			(await this.sql<TurnQuery[]>`
				SELECT
					"encounterId",
					MAX("turnOrder") turn
				FROM "Combatant"
				WHERE
					"encounterId" = ${encounterId}
				GROUP BY "encounterId"
			`) ?? [];
		return prevTurn?.turn
			? [prevTurn.turn, currentRound]
			: currentRound === 1
			? [0, 0]
			: [maxTurn?.turn ?? 0, Math.max(currentRound - 1, 0)];
	}
}
