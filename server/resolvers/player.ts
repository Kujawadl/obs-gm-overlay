import { PlayerMutationResolvers, PlayerResolvers } from "../graphql";

export interface PlayerModel {
	id: string;
	campaignId: string;
	playerName: string;
	characterName?: string;
	isGM: boolean;
	inspiration: number;
}

interface Resolvers {
	Player: PlayerResolvers;
	PlayerMutation: PlayerMutationResolvers;
}

const resolvers: Resolvers = {
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
		async delete(parent, _, { Player, Campaign }): Promise<boolean> {
			const player = parent.id ? await Player.get(parent.id) : undefined;
			const result = parent.id ? await Player.delete(parent.id) : false;
			if (player && result) {
				Campaign.publishSubscription(player.campaignId);
			}
			return result;
		},
	},
};

export default resolvers;
