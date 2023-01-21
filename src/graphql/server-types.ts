/**
 * GENERATED FILE: DO NOT MODIFY DIRECTLY
 * `npm run generate-types` to update
 */
/* eslint-disable */
import {
	GraphQLResolveInfo,
	GraphQLScalarType,
	GraphQLScalarTypeConfig,
} from "graphql";
import { PlayerModel } from "./resolvers/player";
import { CampaignModel } from "./resolvers/campaign";
import { CombatantModel, EncounterModel } from "./resolvers/initiative";
import { Context } from "./context";
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined | null;
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
	activeEncounter?: Maybe<Encounter>;
	cooldownTime: Scalars["Int"];
	cooldownType: CooldownType;
	encounter?: Maybe<Encounter>;
	encounters: Array<Encounter>;
	gmInspiration: Scalars["Boolean"];
	id: Scalars["ID"];
	lastInspirationUsed?: Maybe<Scalars["Date"]>;
	name: Scalars["String"];
	players: Array<Player>;
};

export type CampaignEncounterArgs = {
	id: Scalars["ID"];
};

export type CampaignInput = {
	activeEncounter?: InputMaybe<Scalars["ID"]>;
	cooldownTime?: InputMaybe<Scalars["Int"]>;
	cooldownType?: InputMaybe<CooldownType>;
	gmInspiration?: InputMaybe<Scalars["Boolean"]>;
	name: Scalars["String"];
};

export type CampaignMutation = {
	__typename?: "CampaignMutation";
	delete: Scalars["Boolean"];
	encounter?: Maybe<EncounterMutation>;
	save: Campaign;
};

export type CampaignMutationEncounterArgs = {
	id?: InputMaybe<Scalars["ID"]>;
};

export type CampaignMutationSaveArgs = {
	input: CampaignInput;
};

export type Combatant = {
	__typename?: "Combatant";
	campaign: Campaign;
	encounter: Encounter;
	id: Scalars["ID"];
	name: Scalars["String"];
	player?: Maybe<Player>;
	public: Scalars["Boolean"];
	turnOrder: Scalars["Int"];
};

export type CombatantInput = {
	campaignId: Scalars["ID"];
	encounterId: Scalars["ID"];
	id?: InputMaybe<Scalars["ID"]>;
	name: Scalars["String"];
	playerId?: InputMaybe<Scalars["ID"]>;
	public?: InputMaybe<Scalars["Boolean"]>;
	turnOrder: Scalars["Int"];
};

export type CombatantMutation = {
	__typename?: "CombatantMutation";
	delete: Scalars["Boolean"];
	save: Combatant;
};

export type CombatantMutationSaveArgs = {
	input: CombatantInput;
};

export enum CooldownType {
	None = "none",
	Player = "player",
	Table = "table",
}

export type Encounter = {
	__typename?: "Encounter";
	combatants: Array<Combatant>;
	hideMonsterNames: HideMonsterNames;
	id: Scalars["ID"];
	name: Scalars["String"];
	round: Scalars["Int"];
	turn: Scalars["Int"];
	turnStart?: Maybe<Scalars["Date"]>;
};

export type EncounterInput = {
	campaignId: Scalars["ID"];
	hideMonsterNames?: InputMaybe<HideMonsterNames>;
	id?: InputMaybe<Scalars["ID"]>;
	name: Scalars["String"];
	round?: InputMaybe<Scalars["Int"]>;
	turn?: InputMaybe<Scalars["Int"]>;
	turnStart?: InputMaybe<Scalars["Date"]>;
};

export type EncounterMutation = {
	__typename?: "EncounterMutation";
	combatant: CombatantMutation;
	delete: Scalars["Boolean"];
	next?: Maybe<Scalars["Boolean"]>;
	prev?: Maybe<Scalars["Boolean"]>;
	save: Encounter;
	saveCombatants: Array<Combatant>;
	setActive: Scalars["Boolean"];
};

export type EncounterMutationCombatantArgs = {
	id?: InputMaybe<Scalars["ID"]>;
};

export type EncounterMutationSaveArgs = {
	input: EncounterInput;
};

export type EncounterMutationSaveCombatantsArgs = {
	input: Array<CombatantInput>;
};

export type EncounterMutationSetActiveArgs = {
	active?: InputMaybe<Scalars["Boolean"]>;
};

export enum HideMonsterNames {
	Always = "always",
	Never = "never",
	UntilTurn = "untilTurn",
}

export type Mutation = {
	__typename?: "Mutation";
	campaign?: Maybe<CampaignMutation>;
	player?: Maybe<PlayerMutation>;
};

export type MutationCampaignArgs = {
	id?: InputMaybe<Scalars["ID"]>;
};

export type MutationPlayerArgs = {
	id?: InputMaybe<Scalars["ID"]>;
};

export type Player = {
	__typename?: "Player";
	campaign: Campaign;
	characterName?: Maybe<Scalars["String"]>;
	id: Scalars["ID"];
	inspiration: Scalars["Int"];
	isGM: Scalars["Boolean"];
	lastInspirationUsed?: Maybe<Scalars["Date"]>;
	playerName: Scalars["String"];
};

export type PlayerInput = {
	campaignId?: InputMaybe<Scalars["ID"]>;
	characterName?: InputMaybe<Scalars["String"]>;
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
	player?: Maybe<Player>;
};

export type QueryCampaignArgs = {
	id?: InputMaybe<Scalars["ID"]>;
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
	Combatant: ResolverTypeWrapper<CombatantModel>;
	CombatantInput: CombatantInput;
	CombatantMutation: ResolverTypeWrapper<CombatantModel>;
	CooldownType: CooldownType;
	Date: ResolverTypeWrapper<Scalars["Date"]>;
	Encounter: ResolverTypeWrapper<EncounterModel>;
	EncounterInput: EncounterInput;
	EncounterMutation: ResolverTypeWrapper<EncounterModel>;
	HideMonsterNames: HideMonsterNames;
	ID: ResolverTypeWrapper<Scalars["ID"]>;
	Int: ResolverTypeWrapper<Scalars["Int"]>;
	Mutation: ResolverTypeWrapper<{}>;
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
	Combatant: CombatantModel;
	CombatantInput: CombatantInput;
	CombatantMutation: CombatantModel;
	Date: Scalars["Date"];
	Encounter: EncounterModel;
	EncounterInput: EncounterInput;
	EncounterMutation: EncounterModel;
	ID: Scalars["ID"];
	Int: Scalars["Int"];
	Mutation: {};
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
	activeEncounter?: Resolver<
		Maybe<ResolversTypes["Encounter"]>,
		ParentType,
		ContextType
	>;
	cooldownTime?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
	cooldownType?: Resolver<
		ResolversTypes["CooldownType"],
		ParentType,
		ContextType
	>;
	encounter?: Resolver<
		Maybe<ResolversTypes["Encounter"]>,
		ParentType,
		ContextType,
		RequireFields<CampaignEncounterArgs, "id">
	>;
	encounters?: Resolver<
		Array<ResolversTypes["Encounter"]>,
		ParentType,
		ContextType
	>;
	gmInspiration?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	lastInspirationUsed?: Resolver<
		Maybe<ResolversTypes["Date"]>,
		ParentType,
		ContextType
	>;
	name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	players?: Resolver<Array<ResolversTypes["Player"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CampaignMutationResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CampaignMutation"] = ResolversParentTypes["CampaignMutation"]
> = {
	delete?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	encounter?: Resolver<
		Maybe<ResolversTypes["EncounterMutation"]>,
		ParentType,
		ContextType,
		Partial<CampaignMutationEncounterArgs>
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
	campaign?: Resolver<ResolversTypes["Campaign"], ParentType, ContextType>;
	encounter?: Resolver<ResolversTypes["Encounter"], ParentType, ContextType>;
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	player?: Resolver<Maybe<ResolversTypes["Player"]>, ParentType, ContextType>;
	public?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	turnOrder?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CombatantMutationResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["CombatantMutation"] = ResolversParentTypes["CombatantMutation"]
> = {
	delete?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	save?: Resolver<
		ResolversTypes["Combatant"],
		ParentType,
		ContextType,
		RequireFields<CombatantMutationSaveArgs, "input">
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
	name: "Date";
}

export type EncounterResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Encounter"] = ResolversParentTypes["Encounter"]
> = {
	combatants?: Resolver<
		Array<ResolversTypes["Combatant"]>,
		ParentType,
		ContextType
	>;
	hideMonsterNames?: Resolver<
		ResolversTypes["HideMonsterNames"],
		ParentType,
		ContextType
	>;
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	round?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
	turn?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
	turnStart?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EncounterMutationResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["EncounterMutation"] = ResolversParentTypes["EncounterMutation"]
> = {
	combatant?: Resolver<
		ResolversTypes["CombatantMutation"],
		ParentType,
		ContextType,
		Partial<EncounterMutationCombatantArgs>
	>;
	delete?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	next?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
	prev?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
	save?: Resolver<
		ResolversTypes["Encounter"],
		ParentType,
		ContextType,
		RequireFields<EncounterMutationSaveArgs, "input">
	>;
	saveCombatants?: Resolver<
		Array<ResolversTypes["Combatant"]>,
		ParentType,
		ContextType,
		RequireFields<EncounterMutationSaveCombatantsArgs, "input">
	>;
	setActive?: Resolver<
		ResolversTypes["Boolean"],
		ParentType,
		ContextType,
		Partial<EncounterMutationSetActiveArgs>
	>;
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
	player?: Resolver<
		Maybe<ResolversTypes["PlayerMutation"]>,
		ParentType,
		ContextType,
		Partial<MutationPlayerArgs>
	>;
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
	CombatantMutation?: CombatantMutationResolvers<ContextType>;
	Date?: GraphQLScalarType;
	Encounter?: EncounterResolvers<ContextType>;
	EncounterMutation?: EncounterMutationResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
	Player?: PlayerResolvers<ContextType>;
	PlayerMutation?: PlayerMutationResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	Subscription?: SubscriptionResolvers<ContextType>;
};
