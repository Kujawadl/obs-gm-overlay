import { Context } from "../context";
import { Campaign } from "./campaign";
import { Player } from "./player";

const resolvers = {
  async campaign(
    _parent: null,
    args: { id?: number },
    ctx: Context
  ): Promise<Campaign | {}> {
    const campaign = args.id && (await ctx.Campaign.get(args.id));
    return campaign ?? {};
  },
  async player(
    _parent: null,
    args: { id?: number },
    ctx: Context
  ): Promise<Player | {}> {
    const player = args.id && (await ctx.Player.get(args.id));
    return player ?? {};
  },
};

export default resolvers;
