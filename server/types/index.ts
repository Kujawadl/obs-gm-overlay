import { gql } from "apollo-server";
import Campaign from "./campaign";
import Player from "./player";

const Root = gql`
  type Query
  type Mutation
  # type Subscription
`;

const typeDefs = [Root, Campaign, Player];

export default typeDefs;
