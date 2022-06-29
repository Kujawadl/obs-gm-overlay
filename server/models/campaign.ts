import { PubSub } from "graphql-subscriptions";
import sqlite from "sqlite";
import { Campaign, CampaignInput } from "../resolvers/campaign";

export default class CampaignModel {
  private db: sqlite.Database;
  private pubsub: PubSub;

  constructor(db: sqlite.Database, pubsub: PubSub) {
    this.db = db;
    this.pubsub = pubsub;
  }

  get(id: number): Promise<Campaign | undefined> {
    return this.db.get("SELECT * FROM Campaign WHERE id = ?", id);
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
    return this.get(result.lastID) as unknown as Campaign;
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
    return this.get(campaign.id) as unknown as Campaign;
  }

  async delete(id: number): Promise<boolean> {
    await this.db.run("DELETE FROM Campaign WHERE id = ?", id);
    return true;
  }

  async publishSubscription(id: number) {
    const campaign = await this.get(id);
    this.pubsub.publish("CAMPAIGN_UPDATED", { campaign });
  }
}
