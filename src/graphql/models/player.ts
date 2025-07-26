import { DatabaseSync } from "node:sqlite";
import { createId } from "@paralleldrive/cuid2";
import { formatDate } from "../../utils";
import Model from "./_model";
import type { PlayerModel as Player } from "../resolvers/player";
import type { PlayerInput } from "../server-types";

export default class PlayerModel extends Model<Player, PlayerInput> {
	constructor(private sql: DatabaseSync) {
		super();
	}

	get(id: string): Player | undefined {
		return id
			? (this.sql
					.prepare(
						`
			SELECT *
			FROM "Player"
			WHERE "id" = ?
		`,
					)
					.get(id) as unknown as Player)
			: undefined;
	}

	list(campaignId: string): Player[] {
		const results = this.sql
			.prepare(
				`
					SELECT *
					FROM "Player"
					WHERE "campaignId" = ?
					ORDER BY "isGM" DESC, "playerName", "characterName"
				`,
			)
			.all(campaignId) as unknown as Player[];
		return results?.length ? results : [];
	}

	create(input: PlayerInput): Player {
		if (!input.campaignId) {
			throw new Error("Campaign ID is required to create a player");
		}
		const id = createId();
		this.sql
			.prepare(
				`
			INSERT INTO "Player" (
				"id",
				"campaignId",
				"playerName",
				"characterName",
				"isGM",
				"inspiration"
			) VALUES (
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
				input.playerName ?? null,
				input.characterName ?? null,
				this.boolean(input.isGM ?? false),
				input.inspiration ?? 0,
			);
		return this.get(id) as Player;
	}

	update(player: Player, input: PlayerInput): Player {
		this.sql
			.prepare(
				`
				UPDATE "Player"
				SET
					"campaignId" = ?,
					"playerName" = ?,
					"characterName" = ?,
					"isGM" = ?,
					"inspiration" = ?,
					"lastInspirationUsed" = ?
				WHERE "id" = ?
				RETURNING *
			`,
			)
			.run(
				input.campaignId ?? player.campaignId,
				input.playerName ?? player.playerName,
				input.characterName ?? player.characterName ?? null,
				this.boolean(input.isGM ?? player.isGM ?? false),
				input.inspiration ?? player.inspiration ?? 0,
				typeof input.inspiration === "number" &&
					input.inspiration < player.inspiration
					? formatDate(new Date())
					: (player.lastInspirationUsed ?? null),
				player.id,
			);
		if (input.characterName && player.characterName !== input.characterName) {
			this.sql
				.prepare(
					`
						UPDATE "Combatant"
						SET "name" = ?
						WHERE
							"campaignId" = ? AND
							"playerId" = ?
					`,
				)
				.run(
					input.characterName,
					input.campaignId ?? player.campaignId,
					player.id,
				);
		}
		return this.get(player.id) as Player;
	}

	delete(id: string): boolean {
		this.sql.prepare(`DELETE FROM "Combatant" WHERE "playerId" = ?`).run(id);
		this.sql.prepare(`DELETE FROM "Player" WHERE "id" = ?`).run(id);
		return true;
	}

	resetCooldown(id: string): boolean {
		this.sql
			.prepare(
				`
					UPDATE "Player"
					SET "lastInspirationUsed" = NULL
					WHERE "id" = ?
				`,
			)
			.run(id);
		return true;
	}
}
