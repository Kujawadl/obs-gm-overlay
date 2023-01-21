import uniq from "lodash/uniq";
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
			return encounter;
		},
		async encounter(_parent, args, ctx) {
			const encounter = await ctx.Encounter.get(args.id);
			return encounter;
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
			if (!parent.id && args.input.id) {
				parent = (await ctx.Encounter.get(args.input.id)) ?? parent;
			}
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
			if (!parent.id) return false;
			const campaign = await ctx.Campaign.get(parent.campaignId);
			if (campaign?.activeEncounter === parent.id) {
				await ctx.Campaign.update(campaign, {
					activeEncounter: null,
				} as CampaignInput);
				await ctx.Campaign.publishSubscription(parent.id);
			}
			const result = await ctx.Encounter.delete(parent.id);
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
		async saveCombatants(_parent, args, ctx) {
			const result = await ctx.Combatant.bulkUpdate(args.input);
			const campaignIds = uniq(args.input.map((c) => c.campaignId));
			for (let campaignId of campaignIds) {
				await ctx.Campaign.publishSubscription(campaignId);
			}
			return result;
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
			if (!parent.id && args.input.id) {
				parent = (await ctx.Combatant.get(args.input.id)) ?? parent;
			}
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
			if (!parent.id) return false;
			const result = await ctx.Combatant.delete(parent.id);
			const campaign = await ctx.Campaign.get(parent.campaignId);
			if (campaign?.activeEncounter === parent.encounterId) {
				await ctx.Campaign.publishSubscription(campaign.id);
			}
			return result;
		},
	},
};

export default resolvers;
