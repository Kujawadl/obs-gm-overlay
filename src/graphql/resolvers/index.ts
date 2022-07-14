import Campaign from "./campaign";
import Player from "./player";
import NPC from "./npc";

import Query from "./_query";
import Mutation from "./_mutation";
import Subscription from "./_subscription";

const resolvers = {
	...Campaign,
	...Player,
	...NPC,
	Query,
	Mutation,
	Subscription,
};

export default resolvers;
