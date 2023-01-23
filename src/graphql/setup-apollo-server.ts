import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import typeDefs from "./types";
import resolvers from "./resolvers";

import type { Server } from "http";
import type { Context } from "./context";

function setupApolloServer(
	httpServer: Server,
	wsServer: WebSocketServer,
	context: Omit<Context, "req" | "res">
) {
	const schema = makeExecutableSchema({ typeDefs, resolvers });

	const serverCleanup = useServer({ schema, context }, wsServer);

	return new ApolloServer({
		schema,
		csrfPrevention: true,
		cache: "bounded",
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose();
							await context.sql.end();
						},
					};
				},
			},
		],
	});
}

export default setupApolloServer;
