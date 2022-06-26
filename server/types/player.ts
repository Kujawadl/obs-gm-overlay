import { gql } from "apollo-server";

const typeDefs = gql`
  type Player {
    id: ID!
    campaign: Campaign!
    playerName: String!
    characterName: String
    isGM: Boolean!
    inspiration: Int!
  }

  extend type Query {
    player(id: ID!): Player
  }

  input PlayerInput {
    campaignId: ID
    playerName: String
    characterName: String
    isGM: Boolean
    inspiration: Int
  }

  type PlayerMutation {
    save(input: PlayerInput!): Player!
    delete: Boolean!
  }

  extend type Mutation {
    player(id: ID): PlayerMutation
  }
`;

export default typeDefs;
