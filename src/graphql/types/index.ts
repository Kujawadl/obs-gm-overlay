import { gql } from "graphql-tag";
import Campaign from "./campaign";
import Initiative from "./initiative";
import Player from "./player";
import Scalars from "./scalars";

const Root = gql`
	type Query
	type Mutation
	type Subscription
`;

const typeDefs = [Root, Campaign, Initiative, Player, Scalars];

export default typeDefs;
