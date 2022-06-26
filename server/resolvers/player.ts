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
    async save(parent, { input }, { Player, Campaign, pubsub }) {
      const result = parent.id
        ? await Player.update(parent, input)
        : await Player.create(input);
      if (result) {
        const campaign = await Campaign.get(result.campaignId);
        pubsub.publish("CAMPAIGN_UPDATED", { campaign });
      }
      return result;
    },
    async delete(parent, _, { Player, pubsub }): Promise<boolean> {
      const player = parent.id ? await Player.get(parent.id) : undefined;
      const result = parent.id ? await Player.delete(parent.id) : false;
      if (player && result) {
        pubsub.publish("CAMPAIGN_UPDATED", {
          campaign: { id: player.campaignId },
        });
      }
      return result;
    },
  },
};

export default resolvers;
