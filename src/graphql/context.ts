import postgres, { Sql } from "postgres";
import { PubSub } from "graphql-subscriptions";
import {
	CampaignModel,
	CombatantModel,
	EncounterModel,
	PlayerModel,
} from "./models";

export interface Context {
	sql: Sql;
	pubsub: PubSub;
	Campaign: CampaignModel;
	Combatant: CombatantModel;
	Encounter: EncounterModel;
	Player: PlayerModel;
}

export async function setupContext(): Promise<Context> {
	const sql = postgres({
		host: process.env.DB_HOST,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		port: parseInt(process.env.DB_PORT || "") || 5432,
	});
	const pubsub = new PubSub();
	return {
		sql,
		pubsub,
		Campaign: new CampaignModel(sql, pubsub),
		Combatant: new CombatantModel(sql),
		Encounter: new EncounterModel(sql),
		Player: new PlayerModel(sql),
	};
}
