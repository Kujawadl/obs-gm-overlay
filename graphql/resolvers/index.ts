import merge from "lodash/merge";
import Campaign from "./campaign";
import Initiative from "./initiative";
import Player from "./player";
import type { Resolvers } from "@graphql/server-types";

const resolvers = merge(Campaign, Initiative, Player);

export default resolvers as Resolvers;
