import { MutationResolvers } from "../server-types";
import { CampaignModel } from "./campaign";
import { NpcModel } from "./npc";
import { PlayerModel } from "./player";

const resolvers: MutationResolvers = {
	async campaign(_parent, args, ctx) {
		const campaign = args.id ? await ctx.Campaign.get(args.id) : undefined;
		return (campaign ?? {}) as CampaignModel;
	},
	async npc(_parent, args, ctx) {
		const npc = args.id ? await ctx.NPC.get(args.id) : undefined;
		return (npc ?? {}) as NpcModel;
	},
	async player(_parent, args, ctx) {
		const player = args.id ? await ctx.Player.get(args.id) : undefined;
		return (player ?? {}) as PlayerModel;
	},
};

export default resolvers;
