import { ApolloServer } from "apollo-server";

import typeDefs from "./types";
import resolvers from "./resolvers";
import { setupContext } from "./context";

async function setupServer() {
  const context = await setupContext();
  return new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    context,
  });
}

setupServer().then((server) =>
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
);
