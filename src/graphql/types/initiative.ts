import { gql } from "apollo-server-core";

const typeDefs = gql`
	extend type Campaign {
		initiative: Initiative!
	}

	type Initiative {
		round: Int!
		initiativeCount: Float!
		combatants: [Combatant!]!
	}

	type Combatant {
		name: String!
		initiative: Float!
	}
`;

export default typeDefs;
