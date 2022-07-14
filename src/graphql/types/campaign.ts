import { gql } from "apollo-server-core";

const typeDefs = gql`
	extend type Query {
		campaigns: [Campaign!]!
		campaign(id: ID): Campaign
	}

	extend type Subscription {
		campaign(id: ID): Campaign
	}

	type Campaign {
		id: ID!
		name: String!
		gmInspiration: Boolean!
		players: [Player!]!
		npcs: [NPC!]!
		cooldownType: CooldownType!
		cooldownTime: Int!
		lastInspirationUsed: Date
		hideNpcNames: NpcNameType!
	}

	enum CooldownType {
		none
		player
		table
	}

	enum NpcNameType {
		never
		always
		untilTurn
	}

	input CampaignInput {
		name: String!
		gmInspiration: Boolean
		cooldownType: CooldownType
		cooldownTime: Int
		hideNpcNames: NpcNameType
		round: Int
		initiativeCount: Float
	}

	type CampaignMutation {
		save(input: CampaignInput!): Campaign!
		delete: Boolean!
		resetInitiative(
			deleteNpcs: Boolean
			resetCombatantInitiatives: Boolean
		): Boolean!
	}

	extend type Mutation {
		campaign(id: ID): CampaignMutation
	}
`;

export default typeDefs;
