import { PubSub } from "graphql-subscriptions";
import sqlite from "sqlite";
import { CampaignInput } from "../server-types";
import { CampaignModel as Campaign } from "../resolvers/campaign";

export default class CampaignModel {
	private db: sqlite.Database;
	private pubsub: PubSub;

	constructor(db: sqlite.Database, pubsub: PubSub) {
		this.db = db;
		this.pubsub = pubsub;
	}

	get(id?: string): Promise<Campaign | undefined> {
		return id
			? this.db.get("SELECT * FROM Campaign WHERE id = ?", id)
			: Promise.resolve(undefined);
	}

	async list(): Promise<Campaign[]> {
		const campaigns = await this.db.all("SELECT * FROM Campaign");
		return campaigns.length ? campaigns : [];
	}

	async create(input: CampaignInput): Promise<Campaign> {
		const result = await this.db.run(
			`
        INSERT INTO Campaign (
          name,
          gmInspiration
        ) VALUES (?, ?)
      `,
			input.name,
			input.gmInspiration ?? false
		);
		if (!result.lastID) {
			throw new Error("Error inserting new player record");
		}
		return this.get(result.lastID.toString()) as Promise<Campaign>;
	}

	async update(campaign: Campaign, input: CampaignInput): Promise<Campaign> {
		await this.db.run(
			`
        UPDATE Campaign
        SET
          name = ?,
          gmInspiration = ?
        WHERE id = ?
      `,
			input.name ?? campaign.name,
			input.gmInspiration ?? campaign.gmInspiration ?? false,
			campaign.id
		);
		return this.get(campaign.id) as Promise<Campaign>;
	}

	async delete(id: string): Promise<boolean> {
		await this.db.run("DELETE FROM Player WHERE campaignId = ?", id);
		await this.db.run("DELETE FROM Campaign WHERE id = ?", id);
		return true;
	}

	async publishSubscription(id: string) {
		const campaign = await this.get(id);
		this.pubsub.publish("CAMPAIGN_UPDATED", { campaign });
	}
}
