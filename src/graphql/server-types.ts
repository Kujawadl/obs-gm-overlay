/**
 * GENERATED FILE: DO NOT MODIFY DIRECTLY
 * `npm run generate-types` to update
 */
import {
	GraphQLResolveInfo,
	GraphQLScalarType,
	GraphQLScalarTypeConfig,
} from "graphql";
import { CampaignModel } from "./resolvers/campaign";
import { NpcModel } from "./resolvers/npc";
import { PlayerModel } from "./resolvers/player";
import { Context } from "./context";

export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
	[P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Date: any;
};

export type Campaign = {
	__typename?: "Campaign";
	cooldownTime: Scalars["Int"];
	cooldownType: CooldownType;
	gmInspiration: Scalars["Boolean"];
	hideNpcNames: NpcNameType;
	id: Scalars["ID"];
	initiative: Initiative;
	lastInspirationUsed?: Maybe<Scalars["Date"]>;
	name: Scalars["String"];
	npcs: Array<Npc>;
	players: Array<Player>;
};

export type CampaignInput = {
	cooldownTime?: InputMaybe<Scalars["Int"]>;
	cooldownType?: InputMaybe<CooldownType>;
	gmInspiration?: InputMaybe<Scalars["Boolean"]>;
	hideNpcNames?: InputMaybe<NpcNameType>;
	initiativeCount?: InputMaybe<Scalars["Float"]>;
	name: Scalars["String"];
	round?: InputMaybe<Scalars["Int"]>;
};

export type CampaignMutation = {
	__typename?: "CampaignMutation";
	delete: Scalars["Boolean"];
	resetInitiative: Scalars["Boolean"];
	save: Campaign;
};

export type CampaignMutationResetInitiativeArgs = {
	deleteNpcs?: InputMaybe<Scalars["Boolean"]>;
	resetCombatantInitiatives?: InputMaybe<Scalars["Boolean"]>;
};

export type CampaignMutationSaveArgs = {
	input: CampaignInput;
};

export type Combatant = {
	__typename?: "Combatant";
	initiative: Scalars["Float"];
	name: Scalars["String"];
};

export enum CooldownType {
	None = "none",
	Player = "player",
	Table = "table",
}

export type Initiative = {
	__typename?: "Initiative";
	combatants: Array<Combatant>;
	initiativeCount: Scalars["Float"];
	round: Scalars["Int"];
};

export type Mutation = {
	__typename?: "Mutation";
	campaign?: Maybe<CampaignMutation>;
	npc?: Maybe<NpcMutation>;
	player?: Maybe<PlayerMutation>;
};

export type MutationCampaignArgs = {
	id?: InputMaybe<Scalars["ID"]>;
};

export type MutationNpcArgs = {
	id?: InputMaybe<Scalars["ID"]>;
};

export type MutationPlayerArgs = {
	id?: InputMaybe<Scalars["ID"]>;
};

export type Npc = {
	__typename?: "NPC";
	campaign: Campaign;
	id: Scalars["ID"];
	initiative: Scalars["Float"];
	name: Scalars["String"];
	public: Scalars["Boolean"];
};

export type NpcInput = {
	campaignId?: InputMaybe<Scalars["ID"]>;
	initiative?: InputMaybe<Scalars["Float"]>;
	name?: InputMaybe<Scalars["String"]>;
	public?: InputMaybe<Scalars["Boolean"]>;
};

export type NpcMutation = {
	__typename?: "NpcMutation";
	delete: Scalars["Boolean"];
	save: Npc;
};

export type NpcMutationSaveArgs = {
	input: NpcInput;
};

export enum NpcNameType {
	Always = "always",
	Never = "never",
	UntilTurn = "untilTurn",
}

export type Player = {
	__typename?: "Player";
	campaign: Campaign;
	characterName?: Maybe<Scalars["String"]>;
	id: Scalars["ID"];
	initiative: Scalars["Float"];
	inspiration: Scalars["Int"];
	isGM: Scalars["Boolean"];
	lastInspirationUsed?: Maybe<Scalars["Date"]>;
	playerName: Scalars["String"];
};

export type PlayerInput = {
	campaignId?: InputMaybe<Scalars["ID"]>;
	characterName?: InputMaybe<Scalars["String"]>;
	initiative?: InputMaybe<Scalars["Float"]>;
	inspiration?: InputMaybe<Scalars["Int"]>;
	isGM?: InputMaybe<Scalars["Boolean"]>;
	playerName?: InputMaybe<Scalars["String"]>;
};

export type PlayerMutation = {
	__typename?: "PlayerMutation";
	delete: Scalars["Boolean"];
	resetCooldown: Scalars["Boolean"];
	save: Player;
};

export type PlayerMutationSaveArgs = {
	input: PlayerInput;
};

export type Query = {
	__typename?: "Query";
	campaign?: Maybe<Campaign>;
	campaigns: Array<Campaign>;
	npc?: Maybe<Npc>;
	player?: Maybe<Player>;
};

export type QueryCampaignArgs = {
	id?: InputMaybe<Scalars["ID"]>;
};

export type QueryNpcArgs = {
	id: Scalars["ID"];
};

export type QueryPlayerArgs = {
	id: Scalars["ID"];
};

export type Subscription = {
	__typename?: "Subscription";
	campaign?: Maybe<Campaign>;
};

export type SubscriptionCampaignArgs = {
	id?: InputMaybe<Scalars["ID"]>;
};

export type ResolverTypeWrapper<T> =
	| Promise<T>
	| T
	| Promise<undefined>
	| undefined;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> {
	subscribe: SubscriptionSubscribeFn<
		{ [key in TKey]: TResult },
		TParent,
		TContext,
		TArgs
	>;
	resolve?: SubscriptionResolveFn<
		TResult,
		{ [key in TKey]: TResult },
		TContext,
		TArgs
	>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {}
> =
	| ((
			...args: any[]
	  ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
	TResult = {},
	TParent = {},
	TContext = {},
	TArgs = {}
> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
	Campaign: ResolverTypeWrapper<CampaignModel>;
	CampaignInput: CampaignInput;
	CampaignMutation: ResolverTypeWrapper<CampaignModel>;
	Combatant: ResolverTypeWrapper<Combatant>;
	CooldownType: CooldownType;
	Date: ResolverTypeWrapper<Scalars["Date"]>;
	Float: ResolverTypeWrapper<Scalars["Float"]>;
	ID: ResolverTypeWrapper<Scalars["ID"]>;
	Initiative: ResolverTypeWrapper<Initiative>;
	Int: ResolverTypeWrapper<Scalars["Int"]>;
	Mutation: ResolverTypeWrapper<{}>;
	NPC: ResolverTypeWrapper<NpcModel>;
	NpcInput: NpcInput;
	NpcMutation: ResolverTypeWrapper<NpcModel>;
	NpcNameType: NpcNameType;
	Player: ResolverTypeWrapper<PlayerModel>;
	PlayerInput: PlayerInput;
	PlayerMutation: ResolverTypeWrapper<PlayerModel>;
	Query: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars["String"]>;
	Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Boolean: Scalars["Boolean"];
	Campaign: CampaignModel;
	CampaignInput: CampaignInput;
	CampaignMutation: CampaignModel;
	Combatant: Combatant;
	Date: Scalars["Date"];
	Float: Scalars["Float"];
	ID: Scalars["ID"];
	Initiative: Initiative;
	Int: Scalars["Int"];
	Mutation: {};
	NPC: NpcModel;
	NpcInput: NpcInput;
	NpcMutation: NpcModel;
	Player: PlayerModel;
	PlayerInput: PlayerInput;
	PlayerMutation: PlayerModel;
	Query: {};
	String: Scalars["String"];
	Subscription: {};
};

export type CampaignResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Campaign"] = ResolversParentTypes["Campaign"]
> = {
	cooldownTime?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
	cooldownType?: Resolver<
		ResolversTypes["CooldownType"],
		ParentType,
		ContextType
	>;
	gmInspiration?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	hideNpcNames?: Resolver<
		ResolversTypes["NpcNameType"],
		ParentType,
		ContextType
	>;
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	initiative?: Resolver<ResolversTypes["Initiative"], ParentType, ContextType>;
	lastInspirationUsed?: Resolver<
		Maybe<ResolversTypes["Date"]>,
		ParentType,
		ContextType
	>;
	name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	npcs?: Resolver<Array<ResolversTypes["NPC"]>, ParentType, ContextType>;
	players?: Resolver<Array<ResolversTypes["Player"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CampaignMutationResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CampaignMutation"] = ResolversParentTypes["CampaignMutation"]
> = {
	delete?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	resetInitiative?: Resolver<
		ResolversTypes["Boolean"],
		ParentType,
		ContextType,
		Partial<CampaignMutationResetInitiativeArgs>
	>;
	save?: Resolver<
		ResolversTypes["Campaign"],
		ParentType,
		ContextType,
		RequireFields<CampaignMutationSaveArgs, "input">
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CombatantResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Combatant"] = ResolversParentTypes["Combatant"]
> = {
	initiative?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
	name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
	name: "Date";
}

export type InitiativeResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Initiative"] = ResolversParentTypes["Initiative"]
> = {
	combatants?: Resolver<
		Array<ResolversTypes["Combatant"]>,
		ParentType,
		ContextType
	>;
	initiativeCount?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
	round?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
	campaign?: Resolver<
		Maybe<ResolversTypes["CampaignMutation"]>,
		ParentType,
		ContextType,
		Partial<MutationCampaignArgs>
	>;
	npc?: Resolver<
		Maybe<ResolversTypes["NpcMutation"]>,
		ParentType,
		ContextType,
		Partial<MutationNpcArgs>
	>;
	player?: Resolver<
		Maybe<ResolversTypes["PlayerMutation"]>,
		ParentType,
		ContextType,
		Partial<MutationPlayerArgs>
	>;
};

export type NpcResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["NPC"] = ResolversParentTypes["NPC"]
> = {
	campaign?: Resolver<ResolversTypes["Campaign"], ParentType, ContextType>;
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	initiative?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
	name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	public?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NpcMutationResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["NpcMutation"] = ResolversParentTypes["NpcMutation"]
> = {
	delete?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	save?: Resolver<
		ResolversTypes["NPC"],
		ParentType,
		ContextType,
		RequireFields<NpcMutationSaveArgs, "input">
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Player"] = ResolversParentTypes["Player"]
> = {
	campaign?: Resolver<ResolversTypes["Campaign"], ParentType, ContextType>;
	characterName?: Resolver<
		Maybe<ResolversTypes["String"]>,
		ParentType,
		ContextType
	>;
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	initiative?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
	inspiration?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
	isGM?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	lastInspirationUsed?: Resolver<
		Maybe<ResolversTypes["Date"]>,
		ParentType,
		ContextType
	>;
	playerName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerMutationResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["PlayerMutation"] = ResolversParentTypes["PlayerMutation"]
> = {
	delete?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	resetCooldown?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	save?: Resolver<
		ResolversTypes["Player"],
		ParentType,
		ContextType,
		RequireFields<PlayerMutationSaveArgs, "input">
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
	campaign?: Resolver<
		Maybe<ResolversTypes["Campaign"]>,
		ParentType,
		ContextType,
		Partial<QueryCampaignArgs>
	>;
	campaigns?: Resolver<
		Array<ResolversTypes["Campaign"]>,
		ParentType,
		ContextType
	>;
	npc?: Resolver<
		Maybe<ResolversTypes["NPC"]>,
		ParentType,
		ContextType,
		RequireFields<QueryNpcArgs, "id">
	>;
	player?: Resolver<
		Maybe<ResolversTypes["Player"]>,
		ParentType,
		ContextType,
		RequireFields<QueryPlayerArgs, "id">
	>;
};

export type SubscriptionResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = {
	campaign?: SubscriptionResolver<
		Maybe<ResolversTypes["Campaign"]>,
		"campaign",
		ParentType,
		ContextType,
		Partial<SubscriptionCampaignArgs>
	>;
};

export type Resolvers<ContextType = Context> = {
	Campaign?: CampaignResolvers<ContextType>;
	CampaignMutation?: CampaignMutationResolvers<ContextType>;
	Combatant?: CombatantResolvers<ContextType>;
	Date?: GraphQLScalarType;
	Initiative?: InitiativeResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
	NPC?: NpcResolvers<ContextType>;
	NpcMutation?: NpcMutationResolvers<ContextType>;
	Player?: PlayerResolvers<ContextType>;
	PlayerMutation?: PlayerMutationResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	Subscription?: SubscriptionResolvers<ContextType>;
};
