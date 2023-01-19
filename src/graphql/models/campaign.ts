import { PubSub } from "graphql-subscriptions";
import { CampaignInput } from "../server-types";
import { CampaignModel as Campaign } from "../resolvers/campaign";
import type { Database } from "better-sqlite3";
import type Model from "./_model";

export default class CampaignModel implements Model<Campaign, CampaignInput> {
	private db: Database;
	private pubsub: PubSub;

	constructor(db: Database, pubsub: PubSub) {
		this.db = db;
		this.pubsub = pubsub;
	}

	get(id?: string): Promise<Campaign | undefined> {
		return id
			? this.db.prepare("SELECT * FROM Campaign WHERE id = ?").get(id)
			: Promise.resolve(undefined);
	}

	async list(): Promise<Campaign[]> {
		const campaigns = await this.db.prepare("SELECT * FROM Campaign").all();
		return campaigns.length ? campaigns : [];
	}

	async create(input: CampaignInput): Promise<Campaign> {
		const result = await this.db
			.prepare(
				`
        INSERT INTO Campaign (
          name,
          gmInspiration,
					cooldownType,
					cooldownTime,
					activeEncounter
        ) VALUES (?, ?, ?, ?, ?)
      `
			)
			.run(
				input.name,
				input.gmInspiration ?? false ? 1 : 0,
				input.cooldownType ?? "none",
				input.cooldownTime ?? 0,
				input.activeEncounter
			);
		if (!result.lastInsertRowid) {
			throw new Error("Error inserting new player record");
		}
		return this.get(result.lastInsertRowid.toString()) as Promise<Campaign>;
	}

	async update(campaign: Campaign, input: CampaignInput): Promise<Campaign> {
		await this.db
			.prepare(
				`
        UPDATE Campaign
        SET
          name = ?,
          gmInspiration = ?,
					cooldownType = ?,
					cooldownTime = ?,
					activeEncounter = ?
        WHERE id = ?
      `
			)
			.run(
				input.name ?? campaign.name,
				input.gmInspiration ?? campaign.gmInspiration ?? false ? 1 : 0,
				input.cooldownType ?? campaign.cooldownType ?? "none",
				input.cooldownTime ?? campaign.cooldownTime ?? 0,
				input.activeEncounter,
				campaign.id
			);
		return this.get(campaign.id) as Promise<Campaign>;
	}

	async delete(id: string): Promise<boolean> {
		// TODO: Verify cascade
		await this.db.prepare("DELETE FROM Combatant WHERE campaignId = ?").run(id);
		await this.db.prepare("DELETE FROM Encounter WHERE campaignId = ?").run(id);
		await this.db.prepare("DELETE FROM Player WHERE campaignId = ?").run(id);
		await this.db.prepare("DELETE FROM Campaign WHERE id = ?").run(id);
		return true;
	}

	async publishSubscription(id: string) {
		const campaign = await this.get(id);
		this.pubsub.publish("CAMPAIGN_UPDATED", { campaign });
	}
}
