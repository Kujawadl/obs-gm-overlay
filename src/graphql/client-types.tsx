/**
 * GENERATED FILE: DO NOT MODIFY DIRECTLY
 * `npm run generate-types` to update
 */
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
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

export type CampaignFragment = {
	__typename?: "Campaign";
	id: string;
	name: string;
	gmInspiration: boolean;
	cooldownType: CooldownType;
	cooldownTime: number;
	lastInspirationUsed?: any | null;
	hideNpcNames: NpcNameType;
	players: Array<{
		__typename?: "Player";
		id: string;
		playerName: string;
		characterName?: string | null;
		isGM: boolean;
		inspiration: number;
		lastInspirationUsed?: any | null;
		initiative: number;
	}>;
	npcs: Array<{
		__typename?: "NPC";
		id: string;
		name: string;
		public: boolean;
		initiative: number;
	}>;
	initiative: {
		__typename?: "Initiative";
		round: number;
		initiativeCount: number;
		combatants: Array<{
			__typename?: "Combatant";
			name: string;
			initiative: number;
		}>;
	};
};

export type InitiativeFragment = {
	__typename?: "Campaign";
	id: string;
	name: string;
	initiative: {
		__typename?: "Initiative";
		round: number;
		initiativeCount: number;
		combatants: Array<{
			__typename?: "Combatant";
			name: string;
			initiative: number;
		}>;
	};
};

export type NpcFragment = {
	__typename?: "NPC";
	id: string;
	name: string;
	public: boolean;
	initiative: number;
};

export type PlayerFragment = {
	__typename?: "Player";
	id: string;
	playerName: string;
	characterName?: string | null;
	isGM: boolean;
	inspiration: number;
	lastInspirationUsed?: any | null;
	initiative: number;
};

export type DeleteCampaignMutationVariables = Exact<{
	id: Scalars["ID"];
}>;

export type DeleteCampaignMutation = {
	__typename?: "Mutation";
	campaign?: { __typename?: "CampaignMutation"; delete: boolean } | null;
};

export type DeletePlayerMutationVariables = Exact<{
	id: Scalars["ID"];
}>;

export type DeletePlayerMutation = {
	__typename?: "Mutation";
	player?: { __typename?: "PlayerMutation"; delete: boolean } | null;
};

export type ResetInitiativeMutationVariables = Exact<{
	id: Scalars["ID"];
	deleteNpcs?: InputMaybe<Scalars["Boolean"]>;
	resetCombatantInitiatives?: InputMaybe<Scalars["Boolean"]>;
}>;

export type ResetInitiativeMutation = {
	__typename?: "Mutation";
	campaign?: {
		__typename?: "CampaignMutation";
		resetInitiative: boolean;
	} | null;
};

export type ResetPlayerCooldownMutationVariables = Exact<{
	id: Scalars["ID"];
}>;

export type ResetPlayerCooldownMutation = {
	__typename?: "Mutation";
	player?: { __typename?: "PlayerMutation"; resetCooldown: boolean } | null;
};

export type SaveCampaignMutationVariables = Exact<{
	id?: InputMaybe<Scalars["ID"]>;
	input: CampaignInput;
}>;

export type SaveCampaignMutation = {
	__typename?: "Mutation";
	campaign?: {
		__typename?: "CampaignMutation";
		save: {
			__typename?: "Campaign";
			id: string;
			name: string;
			gmInspiration: boolean;
			cooldownType: CooldownType;
			cooldownTime: number;
			lastInspirationUsed?: any | null;
			hideNpcNames: NpcNameType;
			players: Array<{
				__typename?: "Player";
				id: string;
				playerName: string;
				characterName?: string | null;
				isGM: boolean;
				inspiration: number;
				lastInspirationUsed?: any | null;
				initiative: number;
			}>;
			npcs: Array<{
				__typename?: "NPC";
				id: string;
				name: string;
				public: boolean;
				initiative: number;
			}>;
			initiative: {
				__typename?: "Initiative";
				round: number;
				initiativeCount: number;
				combatants: Array<{
					__typename?: "Combatant";
					name: string;
					initiative: number;
				}>;
			};
		};
	} | null;
};

export type SaveNpcMutationVariables = Exact<{
	id?: InputMaybe<Scalars["ID"]>;
	input: NpcInput;
}>;

export type SaveNpcMutation = {
	__typename?: "Mutation";
	npc?: {
		__typename?: "NpcMutation";
		save: {
			__typename?: "NPC";
			id: string;
			name: string;
			public: boolean;
			initiative: number;
		};
	} | null;
};

export type SavePlayerMutationVariables = Exact<{
	id?: InputMaybe<Scalars["ID"]>;
	input: PlayerInput;
}>;

export type SavePlayerMutation = {
	__typename?: "Mutation";
	player?: {
		__typename?: "PlayerMutation";
		save: {
			__typename?: "Player";
			id: string;
			playerName: string;
			characterName?: string | null;
			isGM: boolean;
			inspiration: number;
			lastInspirationUsed?: any | null;
			initiative: number;
		};
	} | null;
};

export type SetPlayerInspirationMutationVariables = Exact<{
	id: Scalars["ID"];
	inspiration: Scalars["Int"];
}>;

export type SetPlayerInspirationMutation = {
	__typename?: "Mutation";
	player?: {
		__typename?: "PlayerMutation";
		save: {
			__typename?: "Player";
			id: string;
			playerName: string;
			characterName?: string | null;
			isGM: boolean;
			inspiration: number;
			lastInspirationUsed?: any | null;
			initiative: number;
		};
	} | null;
};

export type ListCampaignsQueryVariables = Exact<{ [key: string]: never }>;

export type ListCampaignsQuery = {
	__typename?: "Query";
	campaigns: Array<{
		__typename?: "Campaign";
		id: string;
		name: string;
		gmInspiration: boolean;
		cooldownType: CooldownType;
		cooldownTime: number;
		lastInspirationUsed?: any | null;
		hideNpcNames: NpcNameType;
		players: Array<{
			__typename?: "Player";
			id: string;
			playerName: string;
			characterName?: string | null;
			isGM: boolean;
			inspiration: number;
			lastInspirationUsed?: any | null;
			initiative: number;
		}>;
		npcs: Array<{
			__typename?: "NPC";
			id: string;
			name: string;
			public: boolean;
			initiative: number;
		}>;
		initiative: {
			__typename?: "Initiative";
			round: number;
			initiativeCount: number;
			combatants: Array<{
				__typename?: "Combatant";
				name: string;
				initiative: number;
			}>;
		};
	}>;
};

export type CampaignSubscriptionVariables = Exact<{
	id: Scalars["ID"];
}>;

export type CampaignSubscription = {
	__typename?: "Subscription";
	campaign?: {
		__typename?: "Campaign";
		id: string;
		name: string;
		gmInspiration: boolean;
		cooldownType: CooldownType;
		cooldownTime: number;
		lastInspirationUsed?: any | null;
		hideNpcNames: NpcNameType;
		players: Array<{
			__typename?: "Player";
			id: string;
			playerName: string;
			characterName?: string | null;
			isGM: boolean;
			inspiration: number;
			lastInspirationUsed?: any | null;
			initiative: number;
		}>;
		npcs: Array<{
			__typename?: "NPC";
			id: string;
			name: string;
			public: boolean;
			initiative: number;
		}>;
		initiative: {
			__typename?: "Initiative";
			round: number;
			initiativeCount: number;
			combatants: Array<{
				__typename?: "Combatant";
				name: string;
				initiative: number;
			}>;
		};
	} | null;
};

export type InitiativeSubscriptionVariables = Exact<{
	id: Scalars["ID"];
}>;

export type InitiativeSubscription = {
	__typename?: "Subscription";
	campaign?: {
		__typename?: "Campaign";
		id: string;
		name: string;
		initiative: {
			__typename?: "Initiative";
			round: number;
			initiativeCount: number;
			combatants: Array<{
				__typename?: "Combatant";
				name: string;
				initiative: number;
			}>;
		};
	} | null;
};

export const PlayerFragmentDoc = gql`
	fragment Player on Player {
		id
		playerName
		characterName
		isGM
		inspiration
		lastInspirationUsed
		initiative
	}
`;
export const NpcFragmentDoc = gql`
	fragment NPC on NPC {
		id
		name
		public
		initiative
	}
`;
export const InitiativeFragmentDoc = gql`
	fragment Initiative on Campaign {
		id
		name
		initiative {
			round
			initiativeCount
			combatants {
				name
				initiative
			}
		}
	}
`;
export const CampaignFragmentDoc = gql`
	fragment Campaign on Campaign {
		id
		name
		gmInspiration
		cooldownType
		cooldownTime
		lastInspirationUsed
		hideNpcNames
		players {
			...Player
		}
		npcs {
			...NPC
		}
		...Initiative
	}
	${PlayerFragmentDoc}
	${NpcFragmentDoc}
	${InitiativeFragmentDoc}
`;
export const DeleteCampaignDocument = gql`
	mutation DELETE_CAMPAIGN($id: ID!) {
		campaign(id: $id) {
			delete
		}
	}
`;
export type DeleteCampaignMutationFn = Apollo.MutationFunction<
	DeleteCampaignMutation,
	DeleteCampaignMutationVariables
>;

/**
 * __useDeleteCampaignMutation__
 *
 * To run a mutation, you first call `useDeleteCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCampaignMutation, { data, loading, error }] = useDeleteCampaignMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCampaignMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteCampaignMutation,
		DeleteCampaignMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		DeleteCampaignMutation,
		DeleteCampaignMutationVariables
	>(DeleteCampaignDocument, options);
}
export type DeleteCampaignMutationHookResult = ReturnType<
	typeof useDeleteCampaignMutation
>;
export type DeleteCampaignMutationResult =
	Apollo.MutationResult<DeleteCampaignMutation>;
export type DeleteCampaignMutationOptions = Apollo.BaseMutationOptions<
	DeleteCampaignMutation,
	DeleteCampaignMutationVariables
>;
export const DeletePlayerDocument = gql`
	mutation DELETE_PLAYER($id: ID!) {
		player(id: $id) {
			delete
		}
	}
`;
export type DeletePlayerMutationFn = Apollo.MutationFunction<
	DeletePlayerMutation,
	DeletePlayerMutationVariables
>;

/**
 * __useDeletePlayerMutation__
 *
 * To run a mutation, you first call `useDeletePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlayerMutation, { data, loading, error }] = useDeletePlayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePlayerMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeletePlayerMutation,
		DeletePlayerMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		DeletePlayerMutation,
		DeletePlayerMutationVariables
	>(DeletePlayerDocument, options);
}
export type DeletePlayerMutationHookResult = ReturnType<
	typeof useDeletePlayerMutation
>;
export type DeletePlayerMutationResult =
	Apollo.MutationResult<DeletePlayerMutation>;
export type DeletePlayerMutationOptions = Apollo.BaseMutationOptions<
	DeletePlayerMutation,
	DeletePlayerMutationVariables
>;
export const ResetInitiativeDocument = gql`
	mutation RESET_INITIATIVE(
		$id: ID!
		$deleteNpcs: Boolean
		$resetCombatantInitiatives: Boolean
	) {
		campaign(id: $id) {
			resetInitiative(
				deleteNpcs: $deleteNpcs
				resetCombatantInitiatives: $resetCombatantInitiatives
			)
		}
	}
`;
export type ResetInitiativeMutationFn = Apollo.MutationFunction<
	ResetInitiativeMutation,
	ResetInitiativeMutationVariables
>;

/**
 * __useResetInitiativeMutation__
 *
 * To run a mutation, you first call `useResetInitiativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetInitiativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetInitiativeMutation, { data, loading, error }] = useResetInitiativeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      deleteNpcs: // value for 'deleteNpcs'
 *      resetCombatantInitiatives: // value for 'resetCombatantInitiatives'
 *   },
 * });
 */
export function useResetInitiativeMutation(
	baseOptions?: Apollo.MutationHookOptions<
		ResetInitiativeMutation,
		ResetInitiativeMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		ResetInitiativeMutation,
		ResetInitiativeMutationVariables
	>(ResetInitiativeDocument, options);
}
export type ResetInitiativeMutationHookResult = ReturnType<
	typeof useResetInitiativeMutation
>;
export type ResetInitiativeMutationResult =
	Apollo.MutationResult<ResetInitiativeMutation>;
export type ResetInitiativeMutationOptions = Apollo.BaseMutationOptions<
	ResetInitiativeMutation,
	ResetInitiativeMutationVariables
>;
export const ResetPlayerCooldownDocument = gql`
	mutation RESET_PLAYER_COOLDOWN($id: ID!) {
		player(id: $id) {
			resetCooldown
		}
	}
`;
export type ResetPlayerCooldownMutationFn = Apollo.MutationFunction<
	ResetPlayerCooldownMutation,
	ResetPlayerCooldownMutationVariables
>;

/**
 * __useResetPlayerCooldownMutation__
 *
 * To run a mutation, you first call `useResetPlayerCooldownMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPlayerCooldownMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPlayerCooldownMutation, { data, loading, error }] = useResetPlayerCooldownMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResetPlayerCooldownMutation(
	baseOptions?: Apollo.MutationHookOptions<
		ResetPlayerCooldownMutation,
		ResetPlayerCooldownMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		ResetPlayerCooldownMutation,
		ResetPlayerCooldownMutationVariables
	>(ResetPlayerCooldownDocument, options);
}
export type ResetPlayerCooldownMutationHookResult = ReturnType<
	typeof useResetPlayerCooldownMutation
>;
export type ResetPlayerCooldownMutationResult =
	Apollo.MutationResult<ResetPlayerCooldownMutation>;
export type ResetPlayerCooldownMutationOptions = Apollo.BaseMutationOptions<
	ResetPlayerCooldownMutation,
	ResetPlayerCooldownMutationVariables
>;
export const SaveCampaignDocument = gql`
	mutation SAVE_CAMPAIGN($id: ID, $input: CampaignInput!) {
		campaign(id: $id) {
			save(input: $input) {
				...Campaign
			}
		}
	}
	${CampaignFragmentDoc}
`;
export type SaveCampaignMutationFn = Apollo.MutationFunction<
	SaveCampaignMutation,
	SaveCampaignMutationVariables
>;

/**
 * __useSaveCampaignMutation__
 *
 * To run a mutation, you first call `useSaveCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCampaignMutation, { data, loading, error }] = useSaveCampaignMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveCampaignMutation(
	baseOptions?: Apollo.MutationHookOptions<
		SaveCampaignMutation,
		SaveCampaignMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		SaveCampaignMutation,
		SaveCampaignMutationVariables
	>(SaveCampaignDocument, options);
}
export type SaveCampaignMutationHookResult = ReturnType<
	typeof useSaveCampaignMutation
>;
export type SaveCampaignMutationResult =
	Apollo.MutationResult<SaveCampaignMutation>;
export type SaveCampaignMutationOptions = Apollo.BaseMutationOptions<
	SaveCampaignMutation,
	SaveCampaignMutationVariables
>;
export const SaveNpcDocument = gql`
	mutation SAVE_NPC($id: ID, $input: NpcInput!) {
		npc(id: $id) {
			save(input: $input) {
				...NPC
			}
		}
	}
	${NpcFragmentDoc}
`;
export type SaveNpcMutationFn = Apollo.MutationFunction<
	SaveNpcMutation,
	SaveNpcMutationVariables
>;

/**
 * __useSaveNpcMutation__
 *
 * To run a mutation, you first call `useSaveNpcMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveNpcMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveNpcMutation, { data, loading, error }] = useSaveNpcMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveNpcMutation(
	baseOptions?: Apollo.MutationHookOptions<
		SaveNpcMutation,
		SaveNpcMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<SaveNpcMutation, SaveNpcMutationVariables>(
		SaveNpcDocument,
		options
	);
}
export type SaveNpcMutationHookResult = ReturnType<typeof useSaveNpcMutation>;
export type SaveNpcMutationResult = Apollo.MutationResult<SaveNpcMutation>;
export type SaveNpcMutationOptions = Apollo.BaseMutationOptions<
	SaveNpcMutation,
	SaveNpcMutationVariables
>;
export const SavePlayerDocument = gql`
	mutation SAVE_PLAYER($id: ID, $input: PlayerInput!) {
		player(id: $id) {
			save(input: $input) {
				...Player
			}
		}
	}
	${PlayerFragmentDoc}
`;
export type SavePlayerMutationFn = Apollo.MutationFunction<
	SavePlayerMutation,
	SavePlayerMutationVariables
>;

/**
 * __useSavePlayerMutation__
 *
 * To run a mutation, you first call `useSavePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePlayerMutation, { data, loading, error }] = useSavePlayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSavePlayerMutation(
	baseOptions?: Apollo.MutationHookOptions<
		SavePlayerMutation,
		SavePlayerMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<SavePlayerMutation, SavePlayerMutationVariables>(
		SavePlayerDocument,
		options
	);
}
export type SavePlayerMutationHookResult = ReturnType<
	typeof useSavePlayerMutation
>;
export type SavePlayerMutationResult =
	Apollo.MutationResult<SavePlayerMutation>;
export type SavePlayerMutationOptions = Apollo.BaseMutationOptions<
	SavePlayerMutation,
	SavePlayerMutationVariables
>;
export const SetPlayerInspirationDocument = gql`
	mutation SET_PLAYER_INSPIRATION($id: ID!, $inspiration: Int!) {
		player(id: $id) {
			save(input: { inspiration: $inspiration }) {
				...Player
			}
		}
	}
	${PlayerFragmentDoc}
`;
export type SetPlayerInspirationMutationFn = Apollo.MutationFunction<
	SetPlayerInspirationMutation,
	SetPlayerInspirationMutationVariables
>;

/**
 * __useSetPlayerInspirationMutation__
 *
 * To run a mutation, you first call `useSetPlayerInspirationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPlayerInspirationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPlayerInspirationMutation, { data, loading, error }] = useSetPlayerInspirationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      inspiration: // value for 'inspiration'
 *   },
 * });
 */
export function useSetPlayerInspirationMutation(
	baseOptions?: Apollo.MutationHookOptions<
		SetPlayerInspirationMutation,
		SetPlayerInspirationMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		SetPlayerInspirationMutation,
		SetPlayerInspirationMutationVariables
	>(SetPlayerInspirationDocument, options);
}
export type SetPlayerInspirationMutationHookResult = ReturnType<
	typeof useSetPlayerInspirationMutation
>;
export type SetPlayerInspirationMutationResult =
	Apollo.MutationResult<SetPlayerInspirationMutation>;
export type SetPlayerInspirationMutationOptions = Apollo.BaseMutationOptions<
	SetPlayerInspirationMutation,
	SetPlayerInspirationMutationVariables
>;
export const ListCampaignsDocument = gql`
	query LIST_CAMPAIGNS {
		campaigns {
			...Campaign
		}
	}
	${CampaignFragmentDoc}
`;

/**
 * __useListCampaignsQuery__
 *
 * To run a query within a React component, call `useListCampaignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCampaignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCampaignsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListCampaignsQuery(
	baseOptions?: Apollo.QueryHookOptions<
		ListCampaignsQuery,
		ListCampaignsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<ListCampaignsQuery, ListCampaignsQueryVariables>(
		ListCampaignsDocument,
		options
	);
}
export function useListCampaignsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		ListCampaignsQuery,
		ListCampaignsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<ListCampaignsQuery, ListCampaignsQueryVariables>(
		ListCampaignsDocument,
		options
	);
}
export type ListCampaignsQueryHookResult = ReturnType<
	typeof useListCampaignsQuery
>;
export type ListCampaignsLazyQueryHookResult = ReturnType<
	typeof useListCampaignsLazyQuery
>;
export type ListCampaignsQueryResult = Apollo.QueryResult<
	ListCampaignsQuery,
	ListCampaignsQueryVariables
>;
export const CampaignDocument = gql`
	subscription CAMPAIGN($id: ID!) {
		campaign(id: $id) {
			...Campaign
		}
	}
	${CampaignFragmentDoc}
`;

/**
 * __useCampaignSubscription__
 *
 * To run a query within a React component, call `useCampaignSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCampaignSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCampaignSubscription(
	baseOptions: Apollo.SubscriptionHookOptions<
		CampaignSubscription,
		CampaignSubscriptionVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useSubscription<
		CampaignSubscription,
		CampaignSubscriptionVariables
	>(CampaignDocument, options);
}
export type CampaignSubscriptionHookResult = ReturnType<
	typeof useCampaignSubscription
>;
export type CampaignSubscriptionResult =
	Apollo.SubscriptionResult<CampaignSubscription>;
export const InitiativeDocument = gql`
	subscription INITIATIVE($id: ID!) {
		campaign(id: $id) {
			...Initiative
		}
	}
	${InitiativeFragmentDoc}
`;

/**
 * __useInitiativeSubscription__
 *
 * To run a query within a React component, call `useInitiativeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useInitiativeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitiativeSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInitiativeSubscription(
	baseOptions: Apollo.SubscriptionHookOptions<
		InitiativeSubscription,
		InitiativeSubscriptionVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useSubscription<
		InitiativeSubscription,
		InitiativeSubscriptionVariables
	>(InitiativeDocument, options);
}
export type InitiativeSubscriptionHookResult = ReturnType<
	typeof useInitiativeSubscription
>;
export type InitiativeSubscriptionResult =
	Apollo.SubscriptionResult<InitiativeSubscription>;
