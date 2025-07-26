import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { PubSub } from "graphql-subscriptions";
import {
	CampaignModel,
	CombatantModel,
	EncounterModel,
	PlayerModel,
} from "./models";
import { schema } from "./models/sql-schema";
import type { NextApiRequest, NextApiResponse } from "next";

export interface Context {
	sql: DatabaseSync;
	pubsub: PubSub;
	req: NextApiRequest;
	res: NextApiResponse;
	Campaign: CampaignModel;
	Combatant: CombatantModel;
	Encounter: EncounterModel;
	Player: PlayerModel;
}

export function setupContext(): Omit<Context, "req" | "res"> {
	const userDataPath =
		process.env.APPDATA ||
		(process.platform == "darwin"
			? process.env.HOME + "/Library/Preferences"
			: process.env.HOME + "/.local/share");
	const obsGmOverlayPath = path.join(userDataPath, "obs-gm-overlay");
	if (!fs.existsSync(obsGmOverlayPath)) {
		fs.mkdirSync(obsGmOverlayPath, { recursive: true });
	}
	const dbPath = path.join(userDataPath, "obs-gm-overlay", "database.sqlite");
	let newDb = false;
	if (!fs.existsSync(dbPath)) {
		fs.closeSync(fs.openSync(dbPath, "w"));
		newDb = true;
	}
	const sql = new DatabaseSync(dbPath, {
		open: true,
	});
	if (newDb) {
		console.log("Creating new database at", dbPath);
		sql.exec(schema);
	}
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
