import { gql } from "apollo-server-core";
import Campaign from "./campaign";
import Initiative from "./initiative";
import NPC from "./npc";
import Player from "./player";
import Scalars from "./scalars";

const Root = gql`
	type Query
	type Mutation
	type Subscription
`;

const typeDefs = [Root, Campaign, Initiative, NPC, Player, Scalars];

export default typeDefs;
