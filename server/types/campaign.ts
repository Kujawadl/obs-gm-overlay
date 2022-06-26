import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Campaign {
    id: ID!
    name: String!
    gmInspiration: Boolean!
    players: [Player!]!
  }

  extend type Query {
    campaigns: [Campaign!]!
    campaign(id: ID): Campaign
  }

  extend type Subscription {
    campaign(id: ID): Campaign
  }

  input CampaignInput {
    name: String
    gmInspiration: Boolean
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
