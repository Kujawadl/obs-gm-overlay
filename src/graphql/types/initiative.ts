import { gql } from "apollo-server-core";

const typeDefs = gql`
	enum HideMonsterNames {
		never
		always
		untilTurn
	}

	extend type Campaign {
		activeEncounter: Encounter
		encounters: [Encounter!]!
	}

	type Encounter {
		id: ID!
		name: String!
		hideMonsterNames: HideMonsterNames!
		round: Int!
		turn: Int!
		turnStart: Date
		combatants: [Combatant!]!
	}

	type Combatant {
		id: ID!
		campaign: Campaign!
		encounter: Encounter!
		player: Player
		name: String!
		public: Boolean!
		turnOrder: Int!
	}

	extend type CampaignMutation {
		encounter(id: ID): EncounterMutation
	}

	type EncounterMutation {
		save(input: EncounterInput!): Encounter!
		delete(encounterId: ID!): Boolean!
		setActive(active: Boolean): Boolean!
		next: Boolean
		prev: Boolean
		combatant(id: ID): CombatantMutation!
	}

	type CombatantMutation {
		save(input: CombatantInput!): Combatant!
		delete(input: CombatantInput!): Boolean!
	}

	extend input CampaignInput {
		activeEncounter: ID
	}

	input EncounterInput {
		id: ID
		campaignId: ID!
		name: String!
		hideMonsterNames: HideMonsterNames
		round: Int
		turn: Int
		turnStart: Date
	}

	input CombatantInput {
		id: ID
		campaignId: ID!
		encounterId: ID!
		playerId: ID
		name: String!
		public: Boolean
		turnOrder: Int!
	}
`;

export default typeDefs;
