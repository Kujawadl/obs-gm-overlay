import { Context } from "../context";
import { Campaign } from "./campaign";
import { Player } from "./player";

const resolvers = {
  campaigns(_parent: null, _args: null, ctx: Context): Promise<Campaign[]> {
    return ctx.Campaign.list();
  },
  campaign(
    _parent: null,
    args: { id: number },
    ctx: Context
  ): Promise<Campaign | undefined> {
    return ctx.Campaign.get(args.id);
  },
  player(
    _parent: null,
    args: { id: number },
    ctx: Context
  ): Promise<Player | undefined> {
    return ctx.Player.get(args.id);
  },
};

export default resolvers;
