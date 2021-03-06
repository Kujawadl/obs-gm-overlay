import { withFilter } from "graphql-subscriptions";
import { Context } from "../context";

// TODO: Use the generated resolver types
const resolvers = {
	campaign: {
		subscribe: withFilter(
			(_parent: null, args: { id: string }, ctx: Context) => {
				setImmediate(() => ctx.Campaign.publishSubscription(args.id));
				return ctx.pubsub.asyncIterator("CAMPAIGN_UPDATED");
			},
			(payload, variables) => {
				return payload.campaign.id === parseInt(variables.id);
			}
		),
	},
};

export default resolvers;
