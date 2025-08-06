import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLFormattedError } from "graphql";
import { useServer } from "graphql-ws/use/ws";
import { WebSocketServer } from "ws";

import resolvers from "./resolvers";
import typeDefs from "./types";

import type { Server } from "http";
import type { Context } from "./context";

function setupApolloServer(
	httpServer: Server,
	wsServer: WebSocketServer,
	context: Omit<Context, "req" | "res">,
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
							context.sql.close();
						},
					};
				},
			},
		],
		formatError: (formattedError: GraphQLFormattedError, err: unknown) => {
			console.error(formattedError ?? err);
			return {
				message: formattedError?.message ?? "Internal server error",
				extensions: formattedError?.extensions ?? {},
			};
		},
	});
}

export default setupApolloServer;
