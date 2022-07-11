import Campaign from "./campaign";
import Player from "./player";

import Query from "./_query";
import Mutation from "./_mutation";
import Subscription from "./_subscription";

const resolvers = {
	...Campaign,
	...Player,
	Query,
	Mutation,
	Subscription,
};

export default resolvers;
