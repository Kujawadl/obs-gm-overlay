import { GraphQLError } from "graphql";
import { getToken } from "next-auth/jwt";
import type { Context } from "./context";

export default async function checkAuth(
	context: Context,
	campaignId?: string | null
): Promise<string | undefined> {
	const token = await getToken({
		req: context.req,
		secret: process.env.NEXTAUTH_SECRET,
	});
	if (token?.sub) {
		if (campaignId) {
			const userId = await token.sub;
			const campaign = await context.Campaign.get(campaignId);
			if (campaign?.userId !== userId) {
				return undefined;
			}
		}
		return token.sub;
	}

	throw new GraphQLError("You must be logged in to view this resource", {
		extensions: {
			code: "UNAUTHENTICATED",
		},
	});
}
