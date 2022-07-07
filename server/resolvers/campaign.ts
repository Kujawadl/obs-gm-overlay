import { CampaignMutationResolvers, CampaignResolvers } from "../graphql";

export interface CampaignModel {
  id: string;
  name: string;
  gmInspiration: boolean;
}

interface Resolvers {
  Campaign: CampaignResolvers;
  CampaignMutation: CampaignMutationResolvers;
}

const resolvers: Resolvers = {
  Campaign: {
    players(parent, _args, ctx) {
      return ctx.Player.list(parent.id);
    },
  },
  CampaignMutation: {
    async save(parent, { input }, { Campaign }) {
      const result = parent.id
        ? await Campaign.update(parent, input)
        : await Campaign.create(input);
      if (result) {
        Campaign.publishSubscription(result.id);
      }
      return result;
    },
    async delete(parent, _, { Campaign }) {
      const result = parent.id ? await Campaign.delete(parent.id) : false;
      if (result) {
        Campaign.publishSubscription(parent.id);
      }
      return result;
    },
  },
};

export default resolvers;
