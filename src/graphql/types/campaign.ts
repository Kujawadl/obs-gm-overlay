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
		cooldownType: CooldownType!
		cooldownTime: Int!
		lastInspirationUsed: Date
	}

	enum CooldownType {
		none
		player
		table
	}

	input CampaignInput {
		name: String!
		gmInspiration: Boolean
		cooldownType: CooldownType
		cooldownTime: Int
	}

	type CampaignMutation {
		save(input: CampaignInput!): Campaign!
		delete: Boolean!
	}

	extend type Mutation {
		campaign(id: ID): CampaignMutation
	}
`;

export default typeDefs;
