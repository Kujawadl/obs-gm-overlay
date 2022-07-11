import setupApolloServer from "../../graphql/setup-apollo-server";
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

type Data = {
	ok: boolean;
	error?: unknown;
};

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	try {
		const server = (req as any).socket.server;
		if (!server.apollo) {
			const apollo = await setupApolloServer(server);
			server.apollo = apollo;
		}
		res.status(200).json({ ok: true });
	} catch (error) {
		res.status(500).json({ ok: false, error });
	}
};

export default handler;
