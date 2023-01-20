import { PubSub } from "graphql-subscriptions";
import { CampaignInput } from "../server-types";
import { CampaignModel as Campaign } from "../resolvers/campaign";
import type { Sql } from "postgres";
import type Model from "./_model";

export default class CampaignModel implements Model<Campaign, CampaignInput> {
	private sql: Sql;
	private pubsub: PubSub;

	constructor(sql: Sql, pubsub: PubSub) {
		this.sql = sql;
		this.pubsub = pubsub;
	}

	async get(id?: string): Promise<Campaign | undefined> {
		if (!id) {
			return Promise.resolve(undefined);
		}
		const results = await this.sql<
			Campaign[]
		>`SELECT * FROM "Campaign" WHERE "id" = ${id}`;
		return results[0];
	}

	async list(): Promise<Campaign[]> {
		const results = await this.sql<Campaign[]>`
			SELECT *
			FROM "Campaign"
			ORDER BY "name"
		`;
		return results.length ? results : [];
	}

	async create(input: CampaignInput): Promise<Campaign> {
		const results = await this.sql<Campaign[]>`
        INSERT INTO "Campaign" (
          "name",
          "gmInspiration",
					"cooldownType",
					"cooldownTime",
					"activeEncounter"
        ) VALUES (
					${input.name}, 
					${input.gmInspiration ?? false},
					${input.cooldownType ?? "none"},
					${input.cooldownTime ?? 0},
					${input.activeEncounter ?? null}
				) RETURNING *
      `;
		return results[0];
	}

	async update(campaign: Campaign, input: CampaignInput): Promise<Campaign> {
		const results = await this.sql<Campaign[]>`
        UPDATE "Campaign"
        SET
          "name" = ${input.name ?? campaign.name},
          "gmInspiration" = ${
						input.gmInspiration ?? campaign.gmInspiration ?? false
					},
					"cooldownType" = ${input.cooldownType ?? campaign.cooldownType ?? "none"},
					"cooldownTime" = ${input.cooldownTime ?? campaign.cooldownTime ?? 0},
					"activeEncounter" = ${input.activeEncounter ?? null}
        WHERE "id" = ${campaign.id}
				RETURNING *
      `;
		return results[0];
	}

	async delete(id: string): Promise<boolean> {
		// TODO: Verify cascade
		await this.sql.begin(async (sql) => {
			await sql`DELETE FROM "Combatant" WHERE "campaignId" = ${id}`;
			await sql`DELETE FROM "Encounter" WHERE "campaignId" = ${id}`;
			await sql`DELETE FROM "Player" WHERE "campaignId" = ${id}`;
			await sql`DELETE FROM "Campaign" WHERE "id" = ${id}`;
		});
		return true;
	}

	async publishSubscription(id: string) {
		const campaign = await this.get(id);
		this.pubsub.publish("CAMPAIGN_UPDATED", { campaign });
	}
}
