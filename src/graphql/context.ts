import { join } from "path";
import sqlite, { Database } from "better-sqlite3";
import { PubSub } from "graphql-subscriptions";
import {
	CampaignModel,
	InitiativeModel,
	NpcModel,
	PlayerModel,
} from "./models";

export interface Context {
	db: Database;
	pubsub: PubSub;
	Campaign: CampaignModel;
	Initiative: InitiativeModel;
	NPC: NpcModel;
	Player: PlayerModel;
}

export async function setupContext(): Promise<Context> {
	const db = await sqlite(join(process.cwd(), "obs-gm-overlay.db"));
	const pubsub = new PubSub();
	return {
		db,
		pubsub,
		Campaign: new CampaignModel(db, pubsub),
		Initiative: new InitiativeModel(db),
		NPC: new NpcModel(db),
		Player: new PlayerModel(db),
	};
}
