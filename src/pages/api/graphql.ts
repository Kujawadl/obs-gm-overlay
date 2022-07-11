import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import type { GraphQLFormattedError } from "graphql";

type Data = {
	data?: Record<string, any> | null;
	errors?: readonly GraphQLFormattedError[];
	extensions?: Record<string, any>;
};

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { http, ...result } =
		(await (req as any).socket.server.apollo?.executeOperation(req.body)) ?? {};
	res.status(http?.status || 200).json(result);
};

export default handler;
