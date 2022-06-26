import sqlite from "sqlite";
import { Player, PlayerInput } from "../resolvers/player";

export default class PlayerModel {
  private db: sqlite.Database;

  constructor(db: sqlite.Database) {
    this.db = db;
  }

  async get(id: number): Promise<Player | undefined> {
    return this.db.get("SELECT * FROM Player WHERE id = ?", id);
  }

  async list(campaignId: number): Promise<Player[]> {
    const players = await this.db.all(
      "SELECT * FROM Player WHERE campaignId = ?",
      campaignId
    );
    return players.length ? players : [];
  }

  async create(input: PlayerInput): Promise<Player> {
    const result = await this.db.run(
      `
        INSERT INTO Player (
          campaignId,
          playerName,
          characterName,
          isGM,
          inspiration
        ) VALUES (?, ?, ?, ?, ?)
      `,
      input.campaignId,
      input.playerName,
      input.characterName,
      input.isGM ?? false,
      input.inspiration ?? 0
    );
    if (!result.lastID) {
      throw new Error("Error inserting new player record");
    }
    return this.get(result.lastID) as unknown as Player;
  }

  async update(player: Player, input: PlayerInput): Promise<Player> {
    await this.db.run(
      `
        UPDATE Player
        SET
          campaignId = ?,
          playerName = ?,
          characterName = ?,
          isGM = ?,
          inspiration = ?
        WHERE id = ?
      `,
      input.campaignId ?? player.campaignId,
      input.playerName ?? player.playerName,
      input.characterName ?? player.characterName,
      input.isGM ?? player.isGM ?? false,
      input.inspiration ?? player.inspiration ?? 0,
      player.id
    );
    return this.get(player.id) as unknown as Player;
  }

  async delete(id: number): Promise<boolean> {
    await this.db.run("DELETE FROM Player WHERE id = ?", id);
    return true;
  }
}
