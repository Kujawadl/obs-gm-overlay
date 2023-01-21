/**
 * GENERATED FILE: DO NOT MODIFY DIRECTLY
 * `npm run generate-types` to update
 */
/* eslint-disable */
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

export type CampaignFragment = {
	__typename?: "Campaign";
	id: string;
	name: string;
	gmInspiration: boolean;
	cooldownType: CooldownType;
	cooldownTime: number;
	lastInspirationUsed?: any | null;
	players: Array<{
		__typename?: "Player";
		id: string;
		playerName: string;
		characterName?: string | null;
		isGM: boolean;
		inspiration: number;
		lastInspirationUsed?: any | null;
	}>;
	activeEncounter?: {
		__typename?: "Encounter";
		id: string;
		name: string;
		hideMonsterNames: HideMonsterNames;
		round: number;
		turn: number;
		turnStart?: any | null;
		combatants: Array<{
			__typename?: "Combatant";
			id: string;
			name: string;
			public: boolean;
			turnOrder: number;
			player?: { __typename?: "Player"; playerName: string } | null;
		}>;
	} | null;
};

export type CombatantFragment = {
	__typename?: "Combatant";
	id: string;
	name: string;
	public: boolean;
	turnOrder: number;
	player?: { __typename?: "Player"; playerName: string } | null;
};

export type EncounterFragment = {
	__typename?: "Encounter";
	id: string;
	name: string;
	hideMonsterNames: HideMonsterNames;
	round: number;
	turn: number;
	turnStart?: any | null;
	combatants: Array<{
		__typename?: "Combatant";
		id: string;
		name: string;
		public: boolean;
		turnOrder: number;
		player?: { __typename?: "Player"; playerName: string } | null;
	}>;
};

export type PlayerFragment = {
	__typename?: "Player";
	id: string;
	playerName: string;
	characterName?: string | null;
	isGM: boolean;
	inspiration: number;
	lastInspirationUsed?: any | null;
};

export type AdvanceInitiativeMutationVariables = Exact<{
	campaignId: Scalars["ID"];
	encounterId: Scalars["ID"];
	forward?: InputMaybe<Scalars["Boolean"]>;
}>;

export type AdvanceInitiativeMutation = {
	__typename?: "Mutation";
	campaign?: {
		__typename?: "CampaignMutation";
		encounter?: {
			__typename?: "EncounterMutation";
			next?: boolean | null;
			prev?: boolean | null;
		} | null;
	} | null;
};

export type DeleteCampaignMutationVariables = Exact<{
	id: Scalars["ID"];
}>;

export type DeleteCampaignMutation = {
	__typename?: "Mutation";
	campaign?: { __typename?: "CampaignMutation"; delete: boolean } | null;
};

export type DeleteEncounterMutationVariables = Exact<{
	campaignId: Scalars["ID"];
	encounterId: Scalars["ID"];
}>;

export type DeleteEncounterMutation = {
	__typename?: "Mutation";
	campaign?: {
		__typename?: "CampaignMutation";
		encounter?: { __typename?: "EncounterMutation"; delete: boolean } | null;
	} | null;
};

export type DeletePlayerMutationVariables = Exact<{
	id: Scalars["ID"];
}>;

export type DeletePlayerMutation = {
	__typename?: "Mutation";
	player?: { __typename?: "PlayerMutation"; delete: boolean } | null;
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
			players: Array<{
				__typename?: "Player";
				id: string;
				playerName: string;
				characterName?: string | null;
				isGM: boolean;
				inspiration: number;
				lastInspirationUsed?: any | null;
			}>;
			activeEncounter?: {
				__typename?: "Encounter";
				id: string;
				name: string;
				hideMonsterNames: HideMonsterNames;
				round: number;
				turn: number;
				turnStart?: any | null;
				combatants: Array<{
					__typename?: "Combatant";
					id: string;
					name: string;
					public: boolean;
					turnOrder: number;
					player?: { __typename?: "Player"; playerName: string } | null;
				}>;
			} | null;
		};
	} | null;
};

export type SaveCombatantMutationVariables = Exact<{
	combatant: CombatantInput;
}>;

export type SaveCombatantMutation = {
	__typename?: "Mutation";
	campaign?: {
		__typename?: "CampaignMutation";
		encounter?: {
			__typename?: "EncounterMutation";
			combatant: {
				__typename?: "CombatantMutation";
				save: {
					__typename?: "Combatant";
					id: string;
					name: string;
					public: boolean;
					turnOrder: number;
					player?: { __typename?: "Player"; playerName: string } | null;
				};
			};
		} | null;
	} | null;
};

export type SaveCombatantsMutationVariables = Exact<{
	combatants: Array<CombatantInput> | CombatantInput;
}>;

export type SaveCombatantsMutation = {
	__typename?: "Mutation";
	campaign?: {
		__typename?: "CampaignMutation";
		encounter?: {
			__typename?: "EncounterMutation";
			saveCombatants: Array<{
				__typename?: "Combatant";
				id: string;
				name: string;
				public: boolean;
				turnOrder: number;
				player?: { __typename?: "Player"; playerName: string } | null;
			}>;
		} | null;
	} | null;
};

export type SaveEncounterMutationVariables = Exact<{
	encounter: EncounterInput;
}>;

export type SaveEncounterMutation = {
	__typename?: "Mutation";
	campaign?: {
		__typename?: "CampaignMutation";
		encounter?: {
			__typename?: "EncounterMutation";
			save: {
				__typename?: "Encounter";
				id: string;
				name: string;
				hideMonsterNames: HideMonsterNames;
				round: number;
				turn: number;
				turnStart?: any | null;
				combatants: Array<{
					__typename?: "Combatant";
					id: string;
					name: string;
					public: boolean;
					turnOrder: number;
					player?: { __typename?: "Player"; playerName: string } | null;
				}>;
			};
		} | null;
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
		};
	} | null;
};

export type SetActiveEncounterMutationVariables = Exact<{
	campaignId: Scalars["ID"];
	encounterId: Scalars["ID"];
}>;

export type SetActiveEncounterMutation = {
	__typename?: "Mutation";
	campaign?: {
		__typename?: "CampaignMutation";
		encounter?: { __typename?: "EncounterMutation"; setActive: boolean } | null;
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
		};
	} | null;
};

export type EncounterDetailQueryVariables = Exact<{
	campaignId: Scalars["ID"];
	encounterId: Scalars["ID"];
}>;

export type EncounterDetailQuery = {
	__typename?: "Query";
	campaign?: {
		__typename?: "Campaign";
		encounter?: {
			__typename?: "Encounter";
			id: string;
			name: string;
			hideMonsterNames: HideMonsterNames;
			round: number;
			turn: number;
			turnStart?: any | null;
			combatants: Array<{
				__typename?: "Combatant";
				id: string;
				name: string;
				public: boolean;
				turnOrder: number;
				player?: { __typename?: "Player"; playerName: string } | null;
			}>;
		} | null;
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
		players: Array<{
			__typename?: "Player";
			id: string;
			playerName: string;
			characterName?: string | null;
			isGM: boolean;
			inspiration: number;
			lastInspirationUsed?: any | null;
		}>;
		activeEncounter?: {
			__typename?: "Encounter";
			id: string;
			name: string;
			hideMonsterNames: HideMonsterNames;
			round: number;
			turn: number;
			turnStart?: any | null;
			combatants: Array<{
				__typename?: "Combatant";
				id: string;
				name: string;
				public: boolean;
				turnOrder: number;
				player?: { __typename?: "Player"; playerName: string } | null;
			}>;
		} | null;
	}>;
};

export type ListEncountersQueryVariables = Exact<{
	campaignId: Scalars["ID"];
}>;

export type ListEncountersQuery = {
	__typename?: "Query";
	campaign?: {
		__typename?: "Campaign";
		encounters: Array<{
			__typename?: "Encounter";
			id: string;
			name: string;
			hideMonsterNames: HideMonsterNames;
			round: number;
			turn: number;
			turnStart?: any | null;
			combatants: Array<{
				__typename?: "Combatant";
				id: string;
				name: string;
				public: boolean;
				turnOrder: number;
				player?: { __typename?: "Player"; playerName: string } | null;
			}>;
		}>;
	} | null;
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
		players: Array<{
			__typename?: "Player";
			id: string;
			playerName: string;
			characterName?: string | null;
			isGM: boolean;
			inspiration: number;
			lastInspirationUsed?: any | null;
		}>;
		activeEncounter?: {
			__typename?: "Encounter";
			id: string;
			name: string;
			hideMonsterNames: HideMonsterNames;
			round: number;
			turn: number;
			turnStart?: any | null;
			combatants: Array<{
				__typename?: "Combatant";
				id: string;
				name: string;
				public: boolean;
				turnOrder: number;
				player?: { __typename?: "Player"; playerName: string } | null;
			}>;
		} | null;
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
	}
`;
export const CombatantFragmentDoc = gql`
	fragment Combatant on Combatant {
		id
		name
		public
		turnOrder
		player {
			playerName
		}
	}
`;
export const EncounterFragmentDoc = gql`
	fragment Encounter on Encounter {
		id
		name
		hideMonsterNames
		round
		turn
		turnStart
		combatants {
			...Combatant
		}
	}
	${CombatantFragmentDoc}
`;
export const CampaignFragmentDoc = gql`
	fragment Campaign on Campaign {
		id
		name
		gmInspiration
		cooldownType
		cooldownTime
		lastInspirationUsed
		players {
			...Player
		}
		activeEncounter {
			...Encounter
		}
	}
	${PlayerFragmentDoc}
	${EncounterFragmentDoc}
`;
export const AdvanceInitiativeDocument = gql`
	mutation ADVANCE_INITIATIVE(
		$campaignId: ID!
		$encounterId: ID!
		$forward: Boolean = true
	) {
		campaign(id: $campaignId) {
			encounter(id: $encounterId) {
				next @include(if: $forward)
				prev @skip(if: $forward)
			}
		}
	}
`;
export type AdvanceInitiativeMutationFn = Apollo.MutationFunction<
	AdvanceInitiativeMutation,
	AdvanceInitiativeMutationVariables
>;

/**
 * __useAdvanceInitiativeMutation__
 *
 * To run a mutation, you first call `useAdvanceInitiativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdvanceInitiativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [advanceInitiativeMutation, { data, loading, error }] = useAdvanceInitiativeMutation({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *      encounterId: // value for 'encounterId'
 *      forward: // value for 'forward'
 *   },
 * });
 */
export function useAdvanceInitiativeMutation(
	baseOptions?: Apollo.MutationHookOptions<
		AdvanceInitiativeMutation,
		AdvanceInitiativeMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		AdvanceInitiativeMutation,
		AdvanceInitiativeMutationVariables
	>(AdvanceInitiativeDocument, options);
}
export type AdvanceInitiativeMutationHookResult = ReturnType<
	typeof useAdvanceInitiativeMutation
>;
export type AdvanceInitiativeMutationResult =
	Apollo.MutationResult<AdvanceInitiativeMutation>;
export type AdvanceInitiativeMutationOptions = Apollo.BaseMutationOptions<
	AdvanceInitiativeMutation,
	AdvanceInitiativeMutationVariables
>;
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
export const DeleteEncounterDocument = gql`
	mutation DELETE_ENCOUNTER($campaignId: ID!, $encounterId: ID!) {
		campaign(id: $campaignId) {
			encounter(id: $encounterId) {
				delete
			}
		}
	}
`;
export type DeleteEncounterMutationFn = Apollo.MutationFunction<
	DeleteEncounterMutation,
	DeleteEncounterMutationVariables
>;

/**
 * __useDeleteEncounterMutation__
 *
 * To run a mutation, you first call `useDeleteEncounterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEncounterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEncounterMutation, { data, loading, error }] = useDeleteEncounterMutation({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *      encounterId: // value for 'encounterId'
 *   },
 * });
 */
export function useDeleteEncounterMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteEncounterMutation,
		DeleteEncounterMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		DeleteEncounterMutation,
		DeleteEncounterMutationVariables
	>(DeleteEncounterDocument, options);
}
export type DeleteEncounterMutationHookResult = ReturnType<
	typeof useDeleteEncounterMutation
>;
export type DeleteEncounterMutationResult =
	Apollo.MutationResult<DeleteEncounterMutation>;
export type DeleteEncounterMutationOptions = Apollo.BaseMutationOptions<
	DeleteEncounterMutation,
	DeleteEncounterMutationVariables
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
export const SaveCombatantDocument = gql`
	mutation SAVE_COMBATANT($combatant: CombatantInput!) {
		campaign {
			encounter {
				combatant {
					save(input: $combatant) {
						...Combatant
					}
				}
			}
		}
	}
	${CombatantFragmentDoc}
`;
export type SaveCombatantMutationFn = Apollo.MutationFunction<
	SaveCombatantMutation,
	SaveCombatantMutationVariables
>;

/**
 * __useSaveCombatantMutation__
 *
 * To run a mutation, you first call `useSaveCombatantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveCombatantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCombatantMutation, { data, loading, error }] = useSaveCombatantMutation({
 *   variables: {
 *      combatant: // value for 'combatant'
 *   },
 * });
 */
export function useSaveCombatantMutation(
	baseOptions?: Apollo.MutationHookOptions<
		SaveCombatantMutation,
		SaveCombatantMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		SaveCombatantMutation,
		SaveCombatantMutationVariables
	>(SaveCombatantDocument, options);
}
export type SaveCombatantMutationHookResult = ReturnType<
	typeof useSaveCombatantMutation
>;
export type SaveCombatantMutationResult =
	Apollo.MutationResult<SaveCombatantMutation>;
export type SaveCombatantMutationOptions = Apollo.BaseMutationOptions<
	SaveCombatantMutation,
	SaveCombatantMutationVariables
>;
export const SaveCombatantsDocument = gql`
	mutation SAVE_COMBATANTS($combatants: [CombatantInput!]!) {
		campaign {
			encounter {
				saveCombatants(input: $combatants) {
					...Combatant
				}
			}
		}
	}
	${CombatantFragmentDoc}
`;
export type SaveCombatantsMutationFn = Apollo.MutationFunction<
	SaveCombatantsMutation,
	SaveCombatantsMutationVariables
>;

/**
 * __useSaveCombatantsMutation__
 *
 * To run a mutation, you first call `useSaveCombatantsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveCombatantsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCombatantsMutation, { data, loading, error }] = useSaveCombatantsMutation({
 *   variables: {
 *      combatants: // value for 'combatants'
 *   },
 * });
 */
export function useSaveCombatantsMutation(
	baseOptions?: Apollo.MutationHookOptions<
		SaveCombatantsMutation,
		SaveCombatantsMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		SaveCombatantsMutation,
		SaveCombatantsMutationVariables
	>(SaveCombatantsDocument, options);
}
export type SaveCombatantsMutationHookResult = ReturnType<
	typeof useSaveCombatantsMutation
>;
export type SaveCombatantsMutationResult =
	Apollo.MutationResult<SaveCombatantsMutation>;
export type SaveCombatantsMutationOptions = Apollo.BaseMutationOptions<
	SaveCombatantsMutation,
	SaveCombatantsMutationVariables
>;
export const SaveEncounterDocument = gql`
	mutation SAVE_ENCOUNTER($encounter: EncounterInput!) {
		campaign {
			encounter {
				save(input: $encounter) {
					...Encounter
				}
			}
		}
	}
	${EncounterFragmentDoc}
`;
export type SaveEncounterMutationFn = Apollo.MutationFunction<
	SaveEncounterMutation,
	SaveEncounterMutationVariables
>;

/**
 * __useSaveEncounterMutation__
 *
 * To run a mutation, you first call `useSaveEncounterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveEncounterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveEncounterMutation, { data, loading, error }] = useSaveEncounterMutation({
 *   variables: {
 *      encounter: // value for 'encounter'
 *   },
 * });
 */
export function useSaveEncounterMutation(
	baseOptions?: Apollo.MutationHookOptions<
		SaveEncounterMutation,
		SaveEncounterMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		SaveEncounterMutation,
		SaveEncounterMutationVariables
	>(SaveEncounterDocument, options);
}
export type SaveEncounterMutationHookResult = ReturnType<
	typeof useSaveEncounterMutation
>;
export type SaveEncounterMutationResult =
	Apollo.MutationResult<SaveEncounterMutation>;
export type SaveEncounterMutationOptions = Apollo.BaseMutationOptions<
	SaveEncounterMutation,
	SaveEncounterMutationVariables
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
export const SetActiveEncounterDocument = gql`
	mutation SET_ACTIVE_ENCOUNTER($campaignId: ID!, $encounterId: ID!) {
		campaign(id: $campaignId) {
			encounter(id: $encounterId) {
				setActive(active: true)
			}
		}
	}
`;
export type SetActiveEncounterMutationFn = Apollo.MutationFunction<
	SetActiveEncounterMutation,
	SetActiveEncounterMutationVariables
>;

/**
 * __useSetActiveEncounterMutation__
 *
 * To run a mutation, you first call `useSetActiveEncounterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetActiveEncounterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setActiveEncounterMutation, { data, loading, error }] = useSetActiveEncounterMutation({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *      encounterId: // value for 'encounterId'
 *   },
 * });
 */
export function useSetActiveEncounterMutation(
	baseOptions?: Apollo.MutationHookOptions<
		SetActiveEncounterMutation,
		SetActiveEncounterMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		SetActiveEncounterMutation,
		SetActiveEncounterMutationVariables
	>(SetActiveEncounterDocument, options);
}
export type SetActiveEncounterMutationHookResult = ReturnType<
	typeof useSetActiveEncounterMutation
>;
export type SetActiveEncounterMutationResult =
	Apollo.MutationResult<SetActiveEncounterMutation>;
export type SetActiveEncounterMutationOptions = Apollo.BaseMutationOptions<
	SetActiveEncounterMutation,
	SetActiveEncounterMutationVariables
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
export const EncounterDetailDocument = gql`
	query ENCOUNTER_DETAIL($campaignId: ID!, $encounterId: ID!) {
		campaign(id: $campaignId) {
			encounter(id: $encounterId) {
				...Encounter
			}
		}
	}
	${EncounterFragmentDoc}
`;

/**
 * __useEncounterDetailQuery__
 *
 * To run a query within a React component, call `useEncounterDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useEncounterDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEncounterDetailQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *      encounterId: // value for 'encounterId'
 *   },
 * });
 */
export function useEncounterDetailQuery(
	baseOptions: Apollo.QueryHookOptions<
		EncounterDetailQuery,
		EncounterDetailQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<EncounterDetailQuery, EncounterDetailQueryVariables>(
		EncounterDetailDocument,
		options
	);
}
export function useEncounterDetailLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		EncounterDetailQuery,
		EncounterDetailQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		EncounterDetailQuery,
		EncounterDetailQueryVariables
	>(EncounterDetailDocument, options);
}
export type EncounterDetailQueryHookResult = ReturnType<
	typeof useEncounterDetailQuery
>;
export type EncounterDetailLazyQueryHookResult = ReturnType<
	typeof useEncounterDetailLazyQuery
>;
export type EncounterDetailQueryResult = Apollo.QueryResult<
	EncounterDetailQuery,
	EncounterDetailQueryVariables
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
export const ListEncountersDocument = gql`
	query LIST_ENCOUNTERS($campaignId: ID!) {
		campaign(id: $campaignId) {
			encounters {
				...Encounter
			}
		}
	}
	${EncounterFragmentDoc}
`;

/**
 * __useListEncountersQuery__
 *
 * To run a query within a React component, call `useListEncountersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListEncountersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListEncountersQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */
export function useListEncountersQuery(
	baseOptions: Apollo.QueryHookOptions<
		ListEncountersQuery,
		ListEncountersQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<ListEncountersQuery, ListEncountersQueryVariables>(
		ListEncountersDocument,
		options
	);
}
export function useListEncountersLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		ListEncountersQuery,
		ListEncountersQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<ListEncountersQuery, ListEncountersQueryVariables>(
		ListEncountersDocument,
		options
	);
}
export type ListEncountersQueryHookResult = ReturnType<
	typeof useListEncountersQuery
>;
export type ListEncountersLazyQueryHookResult = ReturnType<
	typeof useListEncountersLazyQuery
>;
export type ListEncountersQueryResult = Apollo.QueryResult<
	ListEncountersQuery,
	ListEncountersQueryVariables
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
