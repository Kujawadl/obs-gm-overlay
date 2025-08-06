import type {
	MutationResolvers,
	PlayerMutationResolvers,
	PlayerResolvers,
	QueryResolvers,
} from "@graphql/server-types";

export interface PlayerModel {
	id: string;
	campaignId: string;
	playerName: string;
	characterName?: string;
	isGM: boolean;
	inspiration: number;
	lastInspirationUsed?: string;
}

interface Resolvers {
	Query: QueryResolvers;
	Mutation: MutationResolvers;
	Player: PlayerResolvers;
	PlayerMutation: PlayerMutationResolvers;
}

const resolvers: Resolvers = {
	Query: {
		async player(_parent, args, ctx) {
			const player = await ctx.Player.get(args.id);
			return player;
		},
	},
	Mutation: {
		async player(_parent, args, ctx) {
			const player = args.id ? await ctx.Player.get(args.id) : undefined;
			return (player ?? {}) as PlayerModel;
		},
	},
	Player: {
		campaign(parent, _args, { Campaign }) {
			return Campaign.get(parent.campaignId);
		},
	},
	PlayerMutation: {
		async save(parent, { input }, { Player, Campaign }) {
			const result = parent.id
				? await Player.update(parent, input)
				: await Player.create(input);
			if (result) {
				Campaign.publishSubscription(result.campaignId);
			}
			return result;
		},
		async delete(parent, _, { Player, Campaign }) {
			const player = parent.id ? await Player.get(parent.id) : undefined;
			const result = parent.id ? await Player.delete(parent.id) : false;
			if (player && result) {
				Campaign.publishSubscription(player.campaignId);
			}
			return result;
		},
		async resetCooldown(parent, _args, { Player, Campaign }) {
			const player = parent.id ? await Player.get(parent.id) : undefined;
			const result = await Player.resetCooldown(parent.id);
			if (player && result) {
				Campaign.publishSubscription(player.campaignId);
			}
			return result;
		},
	},
};

export default resolvers;
