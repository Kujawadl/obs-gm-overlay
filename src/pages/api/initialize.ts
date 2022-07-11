import { parse } from "url";
import { WebSocketServer } from "ws";
import setupApolloServer from "../../graphql/setup-apollo-server";
import type { ApolloServer } from "apollo-server-micro";
import type { Server } from "http";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

interface NextServer extends Server {
	apollo?: ApolloServer;
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
		if (!server.apollo) {
			const wss = new WebSocketServer({
				noServer: true,
			});

			server.on("upgrade", async function connection(req, socket, head) {
				const { pathname } = parse(req.url as string, true);
				if (pathname === "/api/subscriptions" && !(socket as any).websocket) {
					wss.handleUpgrade(req, socket, head, function done(ws) {
						wss.emit("connection", ws, req);
					});
				}
			});

			const apollo = await setupApolloServer(server, wss);
			server.apollo = apollo;
		}
		res.status(200).json({ ok: true });
	} catch (error) {
		res.status(500).json({ ok: false, error });
	}
};

export default handler;
