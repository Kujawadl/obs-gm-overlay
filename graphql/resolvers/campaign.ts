import { withFilter } from "graphql-subscriptions";
import type { Context } from "../context";
import type {
	Campaign,
	CampaignMutationResolvers,
	CampaignResolvers,
	CooldownType,
	MutationResolvers,
	QueryResolvers,
	SubscriptionResolvers,
} from "../server-types";
import { formatDate, parseDate } from "@utils/index";

export interface CampaignModel {
	id: string;
	name: string;
	gmInspiration: boolean;
	cooldownType: CooldownType;
	cooldownTime: number;
	activeEncounter?: string;
}

interface Resolvers {
	Query: QueryResolvers;
	Mutation: MutationResolvers;
	Subscription: SubscriptionResolvers;
	Campaign: CampaignResolvers;
	CampaignMutation: CampaignMutationResolvers;
}

const resolvers: Resolvers = {
	Query: {
		async campaigns(_parent, _args, ctx) {
			return ctx.Campaign.list();
		},
		async campaign(_parent, args, ctx) {
			return ctx.Campaign.get(args.id ?? undefined);
		},
	},
	Mutation: {
		async campaign(_parent, args, ctx) {
			const campaign = args.id ? await ctx.Campaign.get(args.id) : undefined;
			return (campaign ?? {}) as CampaignModel;
		},
	},
	Subscription: {
		campaign: {
			// @ts-expect-error graphql-subscriptions types are incorrect, but this 100% works
			subscribe: withFilter(
				// @ts-expect-error These aren't actually optional
				(
					_parent: { campaign: Campaign },
					args: { id: string },
					ctx: Context,
				) => {
					setImmediate(() => ctx.Campaign.publishSubscription(args.id));
					return ctx.pubsub.asyncIterableIterator("CAMPAIGN_UPDATED");
				},
				(payload, variables) => {
					return payload?.campaign.id === variables?.id;
				},
			),
		},
	},
	Campaign: {
		players(parent, _args, ctx) {
			return ctx.Player.list(parent.id);
		},
		async lastInspirationUsed(parent, _args, ctx) {
			const players = await ctx.Player.list(parent.id);
			const maxTimeValue = players.reduce((max: number, player) => {
				const lastInspirationUsed =
					(parent.gmInspiration || !player.isGM) && player.lastInspirationUsed
						? parseDate(player.lastInspirationUsed).getTime()
						: -1;
				return Math.max(lastInspirationUsed, max);
			}, -1);
			return maxTimeValue >= 0 ? formatDate(new Date(maxTimeValue)) : undefined;
		},
	},
	CampaignMutation: {
		async save(parent, { input }, ctx) {
			const result = parent.id
				? await ctx.Campaign.update(parent, input)
				: await ctx.Campaign.create(input);
			if (result) {
				ctx.Campaign.publishSubscription(result.id);
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
