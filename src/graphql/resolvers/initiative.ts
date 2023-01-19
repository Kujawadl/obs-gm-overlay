// import { formatDate, parseDate } from "../../utils";
import { formatDate } from "../../utils";
import { CampaignInput } from "../client-types";
import {
	CampaignMutationResolvers,
	CampaignResolvers,
	CombatantMutationResolvers,
	CombatantResolvers,
	EncounterMutationResolvers,
	EncounterResolvers,
	HideMonsterNames,
} from "../server-types";
import { CampaignModel } from "./campaign";

export interface CombatantModel {
	id: string;
	campaignId: string;
	encounterId: string;
	playerId?: string;
	name: string;
	public: boolean;
	turnOrder: number;
}

export interface EncounterModel {
	id: string;
	campaignId: string;
	name: string;
	hideMonsterNames: HideMonsterNames;
	round: number;
	turn: number;
	turnStart: string;
}

interface Resolvers {
	Campaign: CampaignResolvers;
	CampaignMutation: CampaignMutationResolvers;
	Combatant: CombatantResolvers;
	CombatantMutation: CombatantMutationResolvers;
	Encounter: EncounterResolvers;
	EncounterMutation: EncounterMutationResolvers;
}

const resolvers: Resolvers = {
	Campaign: {
		async activeEncounter(parent, _args, ctx) {
			const encounter = parent.activeEncounter
				? await ctx.Encounter.get(parent.activeEncounter)
				: undefined;
			return encounter as EncounterModel;
		},
		async encounters(parent, _args, ctx) {
			return ctx.Encounter.list(parent.id);
		},
	},
	CampaignMutation: {
		async encounter(_parent, args, ctx) {
			if (args.id) {
				return await ctx.Encounter.get(args.id);
			} else {
				return {} as EncounterModel;
			}
		},
	},
	Encounter: {
		async combatants(parent, _args, ctx) {
			const combatants = await ctx.Combatant.list(parent.id);
			return (combatants ?? []) as CombatantModel[];
		},
	},
	EncounterMutation: {
		async save(parent, args, ctx) {
			const result = parent.id
				? await ctx.Encounter.update(parent, args.input)
				: await ctx.Encounter.create(args.input);
			const campaign = await ctx.Campaign.get(result.campaignId);
			if (campaign?.activeEncounter === result.id) {
				await ctx.Campaign.publishSubscription(campaign.id);
			}
			return result;
		},
		async delete(parent, _args, ctx) {
			const campaign = await ctx.Campaign.get(parent.campaignId);
			if (campaign?.activeEncounter === parent.id) {
				await ctx.Campaign.update(campaign, {
					activeEncounter: null,
				} as CampaignInput);
				await ctx.Campaign.publishSubscription(parent.id);
			}
			const result = parent.id ? await ctx.Encounter.delete(parent.id) : false;
			return result;
		},
		async setActive(parent, args, ctx) {
			const campaign = await ctx.Campaign.get(parent.campaignId);
			if (!campaign) {
				throw new Error(
					`Invalid campaign ID ${parent.campaignId} for encounter ${parent.id}`
				);
			}
			if (args.active) {
				await ctx.Campaign.update(campaign, {
					activeEncounter: parent.id,
				} as CampaignInput);
			} else if (campaign.activeEncounter === parent.id) {
				await ctx.Campaign.update(campaign, {
					activeEncounter: null,
				} as CampaignInput);
			}
			await ctx.Campaign.publishSubscription(campaign.id);
			return true;
		},
		async next(parent, _, ctx) {
			const [nextTurn, nextRound] = await ctx.Encounter.findNextTurn(
				parent.id,
				parent.turn,
				parent.round
			);
			// @ts-ignore
			await ctx.Encounter.update(parent, {
				turn: nextTurn,
				round: nextRound,
				turnStart: formatDate(new Date()),
			});
			const campaign = await ctx.Campaign.get(parent.campaignId);
			if (campaign?.activeEncounter === parent.id) {
				await ctx.Campaign.publishSubscription(campaign.id);
			}
			return true;
		},
		async prev(parent, _, ctx) {
			const [prevTurn, prevRound] = await ctx.Encounter.findPrevTurn(
				parent.id,
				parent.turn,
				parent.round
			);
			// @ts-ignore
			await ctx.Encounter.update(parent, {
				turn: prevTurn,
				round: prevRound,
				turnStart: formatDate(new Date()),
			});
			const campaign = await ctx.Campaign.get(parent.campaignId);
			if (campaign?.activeEncounter === parent.id) {
				await ctx.Campaign.publishSubscription(campaign.id);
			}
			return true;
		},
		async combatant(_parent, args, ctx) {
			if (args.id) {
				return await ctx.Combatant.get(args.id);
			} else {
				return {} as CombatantModel;
			}
		},
	},
	Combatant: {
		async campaign(parent, _args, ctx) {
			const campaign = await ctx.Campaign.get(parent.campaignId);
			return (campaign ?? {}) as CampaignModel;
		},
		async player(parent, _args, ctx) {
			return parent.playerId ? ctx.Player.get(parent.playerId) : undefined;
		},
	},
	CombatantMutation: {
		async save(parent, args, ctx) {
			const result = parent.id
				? await ctx.Combatant.update(parent, args.input)
				: await ctx.Combatant.create(args.input);
			const campaign = await ctx.Campaign.get(result.campaignId);
			if (campaign?.activeEncounter === result.encounterId) {
				await ctx.Campaign.publishSubscription(campaign.id);
			}
			return result;
		},
		async delete(parent, _args, ctx) {
			const result = parent.id ? await ctx.Combatant.delete(parent.id) : false;
			const campaign = await ctx.Campaign.get(parent.campaignId);
			if (campaign?.activeEncounter === parent.encounterId) {
				await ctx.Campaign.publishSubscription(campaign.id);
			}
			return result;
		},
	},
};

export default resolvers;
