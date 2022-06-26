import { Context } from "../context";
import { Campaign } from "./campaign";

export interface Player {
  id: number;
  campaignId: number;
  playerName: string;
  characterName?: string;
  isGM: boolean;
  inspiration: number;
}

export type PlayerInput = Omit<Player, "id">;

interface PlayerResolvers {
  Player: {
    campaign(
      parent: Player,
      args: {},
      ctx: Context
    ): Promise<Campaign | undefined>;
  };
  PlayerMutation: {
    save(
      parent: Player,
      args: { input: PlayerInput },
      ctx: Context
    ): Promise<Player>;
    delete(parent: Player, args: {}, ctx: Context): Promise<boolean>;
  };
}

const resolvers: PlayerResolvers = {
  Player: {
    campaign(parent, _args, { Campaign }): Promise<Campaign | undefined> {
      return Campaign.get(parent.campaignId);
    },
  },
  PlayerMutation: {
    async save(parent, { input }, { Player }) {
      return parent.id ? Player.update(parent, input) : Player.create(input);
    },
    async delete(parent, _, { Player }): Promise<boolean> {
      return parent.id ? Player.delete(parent.id) : Promise.resolve(false);
    },
  },
};

export default resolvers;
