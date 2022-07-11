import { QueryResolvers } from "../server-types";

const resolvers: QueryResolvers = {
	campaigns(_parent, _args, ctx) {
		return ctx.Campaign.list();
	},
	campaign(_parent, args, ctx) {
		return ctx.Campaign.get(args.id);
	},
	player(_parent, args, ctx) {
		return ctx.Player.get(args.id);
	},
};

export default resolvers;
