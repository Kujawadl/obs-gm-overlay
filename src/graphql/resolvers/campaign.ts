import { formatDate, parseDate } from "../../utils";
import {
	CampaignMutationResolvers,
	CampaignResolvers,
	CooldownType,
} from "../server-types";

export interface CampaignModel {
	id: string;
	name: string;
	gmInspiration: boolean;
	cooldownType: CooldownType;
	cooldownTime: number;
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
