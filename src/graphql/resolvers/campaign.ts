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
	hideNpcNames: boolean;
	round: number;
	initiativeCount: number;
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
		npcs(parent, _args, ctx) {
			return ctx.NPC.list(parent.id);
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
		async initiative(parent, _args, ctx) {
			const combatants = await ctx.Initiative.get(parent.id);
			return {
				round: combatants[0]?.round ?? 0,
				initiativeCount: combatants[0]?.initiativeCount ?? 0,
				combatants: combatants
					.map((c) => ({
						name: c.name,
						initiative: c.initiative,
					}))
					.filter((c) => Boolean(c.name)),
			};
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
		async resetInitiative(
			parent,
			{ deleteNpcs, resetCombatantInitiatives },
			{ Campaign, NPC, Player }
		) {
			await Campaign.update(parent, {
				name: parent.name,
				round: 0,
				initiativeCount: 0,
			});
			if (deleteNpcs) {
				await NPC.deleteAll(parent.id);
			}
			if (resetCombatantInitiatives) {
				await Player.resetInitiativeForCampaign(parent.id);
				await NPC.resetInitiativeForCampaign(parent.id);
			}
			return true;
		},
	},
};

export default resolvers;
