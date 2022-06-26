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
    async save(parent, { input }, { Campaign }): Promise<Campaign> {
      return parent.id
        ? Campaign.update(parent, input)
        : Campaign.create(input);
    },
    async delete(parent, _, { Campaign }): Promise<boolean> {
      return parent.id ? Campaign.delete(parent.id) : Promise.resolve(false);
    },
  },
};

export default resolvers;
