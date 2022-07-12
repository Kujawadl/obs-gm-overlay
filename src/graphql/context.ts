import { join } from "path";
import sqlite, { Database } from "better-sqlite3";
import { PubSub } from "graphql-subscriptions";
import { CampaignModel, PlayerModel } from "./models";

export interface Context {
	db: Database;
	pubsub: PubSub;
	Campaign: CampaignModel;
	Player: PlayerModel;
}

export async function setupContext(): Promise<Context> {
	const db = await sqlite(join(process.cwd(), "obs-gm-overlay.db"));
	const pubsub = new PubSub();
	return {
		db,
		pubsub,
		Campaign: new CampaignModel(db, pubsub),
		Player: new PlayerModel(db),
	};
}
