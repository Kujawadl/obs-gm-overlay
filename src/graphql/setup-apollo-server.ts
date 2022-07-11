import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import typeDefs from "./types";
import resolvers from "./resolvers";
import { setupContext } from "./context";

import type { Server } from "http";

async function setupApolloServer(
	httpServer: Server,
	wsServer: WebSocketServer
) {
	const context = await setupContext();
	const schema = makeExecutableSchema({ typeDefs, resolvers });

	const serverCleanup = useServer({ schema, context }, wsServer);

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

	console.log("Setting up Apollo server...");
	await server.start();
	console.log("Apollo server initialized!");
	return server;
}

export default setupApolloServer;
