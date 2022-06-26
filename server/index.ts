import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import express from "express";
import http from "http";

import typeDefs from "./types";
import resolvers from "./resolvers";
import { setupContext } from "./context";

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const context = await setupContext();
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    context,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
              await context.db.close();
            },
          };
        },
      },
    ],
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
