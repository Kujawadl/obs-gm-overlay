import merge from "lodash/merge";
import Campaign from "./campaign";
import Initiative from "./initiative";
import Player from "./player";

const resolvers = merge(Campaign, Initiative, Player);

export default resolvers;
