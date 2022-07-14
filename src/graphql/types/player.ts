import { gql } from "apollo-server-core";

const typeDefs = gql`
	extend type Query {
		player(id: ID!): Player
	}

	extend type Mutation {
		player(id: ID): PlayerMutation
	}

	type Player {
		id: ID!
		campaign: Campaign!
		playerName: String!
		characterName: String
		isGM: Boolean!
		inspiration: Int!
		lastInspirationUsed: Date
		initiative: Float!
	}

	input PlayerInput {
		campaignId: ID
		playerName: String
		characterName: String
		isGM: Boolean
		inspiration: Int
		initiative: Float
	}

	type PlayerMutation {
		save(input: PlayerInput!): Player!
		delete: Boolean!
		resetCooldown: Boolean!
	}
`;

export default typeDefs;
