import { DatabaseSync } from "node:sqlite";
import { PubSub } from "graphql-subscriptions";

import {
	CampaignModel,
	CombatantModel,
	EncounterModel,
	PlayerModel,
} from "./models";
import { getSqliteDb } from "./sqlite";

import type { Request, Response } from "express";

export interface Context {
	sql: DatabaseSync;
	pubsub: PubSub;
	req: Request;
	res: Response;
	Campaign: CampaignModel;
	Combatant: CombatantModel;
	Encounter: EncounterModel;
	Player: PlayerModel;
}

export function setupContext(): Omit<Context, "req" | "res"> {
	const sql = getSqliteDb();
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
