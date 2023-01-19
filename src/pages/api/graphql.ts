import { parse } from "url";
import { WebSocketServer } from "ws";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import setupApolloServer from "../../graphql/setup-apollo-server";
import { setupContext } from "../../graphql/context";
import type { Server } from "http";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

interface NextServer extends Server {
	apolloHandler?: Promise<NextApiHandler>;
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
			server.apolloHandler = new Promise((resolve, reject) => {
				console.log("Initializing Apollo Next.JS API handler");
				setupContext()
					.then((context) => {
						const wss = new WebSocketServer({
							noServer: true,
						});

						server.on("upgrade", async function connection(req, socket, head) {
							const { pathname } = parse(req.url as string, true);
							if (
								pathname === "/api/subscriptions" &&
								!(socket as any).websocket
							) {
								wss.handleUpgrade(req, socket, head, function done(ws) {
									wss.emit("connection", ws, req);
								});
							}
						});

						return setupApolloServer(server, wss, context).then(
							(server) => [server, context] as const
						);
					})
					.then(([server, context]) => {
						const apolloHandler = startServerAndCreateNextHandler(server, {
							context: () => Promise.resolve(context ?? {}),
						});
						resolve(apolloHandler);
					})
					.catch(reject);
			});
		}
		const apolloHandler = await server.apolloHandler;
		return apolloHandler(req, res);
	} catch (error) {
		res.status(500).json({ ok: false, error });
	}
};

export default handler;
