import type Model from "./_model";
import type { EncounterInput } from "../server-types";
import type { EncounterModel as Encounter } from "../resolvers/initiative";
import type { Database } from "better-sqlite3";

export default class EncounterModel
	implements Model<Encounter, EncounterInput>
{
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	async get(id: string): Promise<Encounter | undefined> {
		return await this.db
			.prepare("SELECT * FROM Encounter WHERE id = ?")
			.get(id);
	}

	async list(campaignId: string): Promise<Encounter[]> {
		const players = await this.db
			.prepare("SELECT * FROM Encounter WHERE campaignId = ?")
			.all(campaignId);
		return players.length ? players : [];
	}

	async create(input: EncounterInput): Promise<Encounter> {
		const result = await this.db
			.prepare(
				`
        INSERT INTO Encounter (
          campaignId,
          name,
          hideMonsterNames,
          round,
          turn,
          turnStart
        ) VALUES (?, ?, ?, ?, ?, ?)
      `
			)
			.run(
				input.campaignId,
				input.name ?? "n/a",
				input.hideMonsterNames ?? "never",
				input.round ?? 0,
				input.turn ?? 0,
				input.turnStart
			);
		if (!result.lastInsertRowid) {
			throw new Error("Error inserting new encounter record");
		}
		return this.get(result.lastInsertRowid.toString()) as Promise<Encounter>;
	}

	async update(
		encounter: Encounter,
		input: EncounterInput
	): Promise<Encounter> {
		await this.db
			.prepare(
				`
        UPDATE Encounter
        SET
          campaignId = ?,
          name = ?,
          hideMonsterNames = ?,
          round = ?,
          turn = ?,
          turnStart = ?
        WHERE id = ?
      `
			)
			.run(
				input.campaignId ?? encounter.campaignId,
				input.name ?? encounter.name ?? "n/a",
				input.hideMonsterNames ?? encounter.hideMonsterNames ?? "never",
				input.round ?? encounter.round ?? 0,
				input.turn ?? encounter.turn ?? 0,
				input.turnStart ?? encounter.turnStart,
				encounter.id
			);
		return this.get(encounter.id) as Promise<Encounter>;
	}

	async delete(id: string): Promise<boolean> {
		await this.db.prepare("DELETE FROM Encounter WHERE id = ?").run(id);
		return true;
	}

	async findNextTurn(
		encounterId: string,
		currentTurn: number,
		currentRound: number
	): Promise<[nextTurn: number, nextRound: number]> {
		const nextTurn = await this.db
			.prepare(
				`
					SELECT
						encounterId,
						MIN(turnOrder) turn
					FROM Combatant
					WHERE
						encounterId = ? AND
						turnOrder > ?
					GROUP BY encounterId
				`
			)
			.get(encounterId, currentTurn);
		return nextTurn?.turn
			? [nextTurn.turn, currentRound || 1]
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
		const prevTurn = await this.db
			.prepare(
				`
					SELECT
						encounterId,
						MAX(turnOrder) turn
					FROM Combatant
					WHERE
						encounterId = ? AND
						turnOrder < ?
					GROUP BY encounterId
				`
			)
			.get(encounterId, currentTurn);
		const maxTurn = await this.db
			.prepare(
				`
					SELECT
						encounterId,
						MAX(turnOrder) turn
					FROM Combatant
					WHERE
						encounterId = ?
					GROUP BY encounterId
				`
			)
			.get(encounterId);
		return prevTurn?.turn
			? [prevTurn.turn, currentRound]
			: currentRound === 1
			? [0, 0]
			: [maxTurn.turn, currentRound - 1];
	}
}
