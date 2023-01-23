import { withFilter } from "graphql-subscriptions";
import checkAuth from "../checkAuth";
import { formatDate, parseDate } from "../../utils";
import type { Context } from "../context";
import type {
	CampaignMutationResolvers,
	CampaignResolvers,
	CooldownType,
	MutationResolvers,
	QueryResolvers,
	SubscriptionResolvers,
} from "../server-types";

export interface CampaignModel {
	id: string;
	userId: string;
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
			const userId = await checkAuth(ctx);
			if (!userId) return [];
			return ctx.Campaign.list(userId);
		},
		async campaign(_parent, args, ctx) {
			return ctx.Campaign.get(args.id ?? undefined);
		},
	},
	Mutation: {
		async campaign(_parent, args, ctx) {
			const userId = await checkAuth(ctx, args.id);
			if (!userId) return {} as CampaignModel;
			const campaign = args.id ? await ctx.Campaign.get(args.id) : undefined;
			return (campaign ?? {}) as CampaignModel;
		},
	},
	Subscription: {
		campaign: {
			// @ts-expect-error graphql-subscriptions types are incorrect, but this 100% works
			subscribe: withFilter(
				(_parent: null, args: { id: string }, ctx: Context) => {
					setImmediate(() => ctx.Campaign.publishSubscription(args.id));
					return ctx.pubsub.asyncIterator("CAMPAIGN_UPDATED");
				},
				(payload, variables) => {
					return payload.campaign.id === variables.id;
				}
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
			const userId = await checkAuth(ctx);
			if (!userId) return undefined;
			const result = parent.id
				? await ctx.Campaign.update(parent, input)
				: await ctx.Campaign.create(input, userId);
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
