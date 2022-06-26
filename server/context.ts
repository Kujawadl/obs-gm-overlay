import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import { join } from "path";
import { CampaignModel, PlayerModel } from "./models";

export interface Context {
  db: Database;
  Campaign: CampaignModel;
  Player: PlayerModel;
}

export async function setupContext(): Promise<Context> {
  const db = await open({
    filename: join(process.cwd(), "obs-gm-overlay.db"),
    driver: sqlite3.Database,
  });
  return {
    db,
    Campaign: new CampaignModel(db),
    Player: new PlayerModel(db),
  };
}
