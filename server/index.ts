import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import { AddressInfo } from "net";

import typeDefs from "./types";
import resolvers from "./resolvers";
import { setupContext } from "./context";

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const context = await setupContext();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  await httpServer.listen({ port: 4000 });
  console.log(`🚀  Server ready at port ${4000}`);
}

startApolloServer();
