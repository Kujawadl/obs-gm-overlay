import { MutationResolvers } from "../graphql";
import { CampaignModel } from "./campaign";
import { PlayerModel } from "./player";

const resolvers: MutationResolvers = {
  async campaign(_parent, args, ctx) {
    const campaign = args.id ? await ctx.Campaign.get(args.id) : undefined;
    return (campaign ?? {}) as CampaignModel;
  },
  async player(_parent, args, ctx) {
    const player = args.id ? await ctx.Player.get(args.id) : undefined;
    return (player ?? {}) as PlayerModel;
  },
};

export default resolvers;
