import { NpcMutationResolvers, NpcResolvers } from "../server-types";

export interface NpcModel {
	id: string;
	campaignId: string;
	name: string;
	public: boolean;
	initiative: number;
}

interface Resolvers {
	NPC: NpcResolvers;
	NpcMutation: NpcMutationResolvers;
}

const resolvers: Resolvers = {
	NPC: {
		campaign(parent, _args, { Campaign }) {
			return Campaign.get(parent.campaignId);
		},
	},
	NpcMutation: {
		async save(parent, { input }, { NPC, Campaign }) {
			const result = parent.id
				? await NPC.update(parent, input)
				: await NPC.create(input);
			if (result) {
				Campaign.publishSubscription(result.campaignId);
			}
			return result;
		},
		async delete(parent, _, { NPC, Campaign }) {
			const npc = parent.id ? await NPC.get(parent.id) : undefined;
			const result = parent.id ? await NPC.delete(parent.id) : false;
			if (npc && result) {
				Campaign.publishSubscription(npc.campaignId);
			}
			return result;
		},
	},
};

export default resolvers;
