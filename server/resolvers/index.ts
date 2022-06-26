import Campaign from "./campaign";
import Player from "./player";

import Query from "./_query";
import Mutation from "./_mutation";

const resolvers = {
  ...Campaign,
  ...Player,
  Query,
  Mutation,
};

export default resolvers;
