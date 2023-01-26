import { parse } from "url";
import { WebSocketServer } from "ws";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import setupApolloServer from "../../graphql/setup-apollo-server";
import { setupContext } from "../../graphql/context";
import { initSecrets } from "../../utils";
import type { Server } from "http";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

interface NextServer extends Server {
	apolloHandler: Promise<NextApiHandler>;
}

type Data = {
	ok: boolean;
	error?: unknown;
};

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	try {
		const server = (req as any).socket.server as NextServer;
		if (!server.apolloHandler) {
			server.apolloHandler = initSecrets().then(() => {
				console.log("Initializing Apollo Next.JS API handler");

				const wsServer = new WebSocketServer({
					noServer: true,
				});

				server.on("upgrade", async function connection(req, socket, head) {
					const { pathname } = parse(req.url as string, true);
					if (pathname === "/api/subscriptions" && !(socket as any).websocket) {
						wsServer.handleUpgrade(req, socket, head, function done(ws) {
							wsServer.emit("connection", ws, req);
						});
					}
				});

				const coreContext = setupContext();

				const baseApolloServer = setupApolloServer(
					server,
					wsServer,
					coreContext
				);

				return startServerAndCreateNextHandler(baseApolloServer, {
					context: async (req, res) =>
						Promise.resolve({
							...coreContext,
							req,
							res,
						}),
				});
			});
		}

		const apolloHandler = await server.apolloHandler;
		return apolloHandler(req, res);
	} catch (error) {
		res.status(500).json({ ok: false, error });
	}
};

export default handler;
