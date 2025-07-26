import { createId } from "@paralleldrive/cuid2";
import { PubSub } from "graphql-subscriptions";
import { CampaignModel as Campaign } from "../resolvers/campaign";
import { CampaignInput } from "../server-types";
import Model from "./_model";
import type { DatabaseSync } from "node:sqlite";

export default class CampaignModel extends Model<Campaign, CampaignInput> {
	constructor(
		private sql: DatabaseSync,
		private pubsub: PubSub,
	) {
		super();
	}

	get(id?: string): Campaign | undefined {
		return id
			? (this.sql
					.prepare(`SELECT * FROM "Campaign" WHERE "id" = ?`)
					.get(id) as unknown as Campaign)
			: undefined;
	}

	list(): Campaign[] {
		const results = this.sql
			.prepare(
				`
					SELECT *
					FROM "Campaign"
					ORDER BY "name"
				`,
			)
			.all() as unknown as Campaign[];
		return results.length ? results : [];
	}

	create(input: CampaignInput): Campaign {
		const id = createId();
		this.sql
			.prepare(
				`
					INSERT INTO "Campaign" (
					  "id",
						"name",
						"gmInspiration",
						"cooldownType",
						"cooldownTime",
						"activeEncounter"
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
				input.name,
				this.boolean(input.gmInspiration ?? false),
				(input.cooldownType as string) ?? "none",
				input.cooldownTime ?? 0,
				input.activeEncounter ?? null,
			);
		return this.get(id) as Campaign;
	}

	update(campaign: Campaign, input: CampaignInput): Campaign {
		this.sql
			.prepare(
				`
        UPDATE "Campaign"
        SET
          "name" = ?,
          "gmInspiration" = ?,
					"cooldownType" = ?,
					"cooldownTime" = ?,
					"activeEncounter" = ?
        WHERE "id" = ?
				RETURNING *
      `,
			)
			.run(
				input.name ?? campaign.name,
				this.boolean(input.gmInspiration ?? campaign.gmInspiration ?? false),
				input.cooldownType ?? campaign.cooldownType ?? "none",
				input.cooldownTime ?? campaign.cooldownTime ?? 0,
				input.activeEncounter ?? null,
				campaign.id,
			);
		const results = this.sql
			.prepare(`SELECT * FROM "Campaign" WHERE "id" = ?`)
			.all(campaign.id) as unknown as Campaign[];
		return results[0];
	}

	delete(id: string): boolean {
		this.sql.prepare(`DELETE FROM "Combatant" WHERE "campaignId" = ?`).run(id);
		this.sql.prepare(`DELETE FROM "Encounter" WHERE "campaignId" = ?`).run(id);
		this.sql.prepare(`DELETE FROM "Player" WHERE "campaignId" = ?`).run(id);
		this.sql.prepare(`DELETE FROM "Campaign" WHERE "id" = ?`).run(id);
		return true;
	}

	async publishSubscription(id: string) {
		const campaign = this.get(id);
		this.pubsub.publish("CAMPAIGN_UPDATED", { campaign });
	}
}
