import { withFilter } from "graphql-subscriptions";
import { Context } from "../context";
import { Campaign } from "./campaign";

const resolvers = {
  campaign(_parent: null, _args: null, ctx: Context) {
    return {
      subscribe: withFilter(
        () => ctx.pubsub.asyncIterator("CAMPAIGN_UPDATED"),
        (payload, variables) => payload.campaign.id === variables.id
      ),
    };
  },
};

export default resolvers;
