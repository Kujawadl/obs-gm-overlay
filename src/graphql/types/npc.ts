import { gql } from "apollo-server-core";

const typeDefs = gql`
	extend type Query {
		npc(id: ID!): NPC
	}

	extend type Mutation {
		npc(id: ID): NpcMutation
	}

	type NPC {
		id: ID!
		campaign: Campaign!
		name: String!
		public: Boolean!
		initiative: Float!
	}

	input NpcInput {
		campaignId: ID
		name: String
		public: Boolean
		initiative: Float
	}

	type NpcMutation {
		save(input: NpcInput!): NPC!
		delete: Boolean!
	}
`;

export default typeDefs;
