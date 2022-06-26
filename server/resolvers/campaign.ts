import { Context } from "../context";
import { Player } from "./player";

export interface Campaign {
  id: number;
  name: string;
  gmInspiration: boolean;
}

export type CampaignInput = Omit<Campaign, "id">;

interface CampaignResolvers {
  Campaign: {};
  CampaignMutation: {
    save(
      parent: Campaign,
      args: { input: CampaignInput },
      ctx: Context
    ): Promise<Campaign>;
    delete(parent: Campaign, args: {}, ctx: Context): Promise<boolean>;
  };
}

const resolvers: CampaignResolvers = {
  Campaign: {
    players(parent: Campaign, _args: null, ctx: Context): Promise<Player[]> {
      return ctx.Player.list(parent.id);
    },
  },
  CampaignMutation: {
    async save(parent, { input }, { Campaign, pubsub }): Promise<Campaign> {
      const result = parent.id
        ? await Campaign.update(parent, input)
        : await Campaign.create(input);
      if (result) {
        pubsub.publish("CAMPAIGN_UPDATED", { campaign: result });
      }
      return result;
    },
    async delete(parent, _, { Campaign, pubsub }): Promise<boolean> {
      const result = parent.id ? await Campaign.delete(parent.id) : false;
      if (result) {
        pubsub.publish("CAMPAIGN_UPDATED", { campaign: { id: parent.id } });
      }
      return result;
    },
  },
};

export default resolvers;
