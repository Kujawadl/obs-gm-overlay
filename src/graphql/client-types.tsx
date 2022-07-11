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
};

export type Campaign = {
	__typename?: "Campaign";
	gmInspiration: Scalars["Boolean"];
	id: Scalars["ID"];
	name: Scalars["String"];
	players: Array<Player>;
};

export type CampaignInput = {
	gmInspiration: Scalars["Boolean"];
	name: Scalars["String"];
};

export type CampaignMutation = {
	__typename?: "CampaignMutation";
	delete: Scalars["Boolean"];
	save: Campaign;
};

export type CampaignMutationSaveArgs = {
	input: CampaignInput;
};

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
	players: Array<{
		__typename?: "Player";
		id: string;
		playerName: string;
		characterName?: string | null;
		isGM: boolean;
		inspiration: number;
	}>;
};

export type PlayerFragment = {
	__typename?: "Player";
	id: string;
	playerName: string;
	characterName?: string | null;
	isGM: boolean;
	inspiration: number;
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
			players: Array<{
				__typename?: "Player";
				id: string;
				playerName: string;
				characterName?: string | null;
				isGM: boolean;
				inspiration: number;
			}>;
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
		players: Array<{
			__typename?: "Player";
			id: string;
			playerName: string;
			characterName?: string | null;
			isGM: boolean;
			inspiration: number;
		}>;
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
		players: Array<{
			__typename?: "Player";
			id: string;
			playerName: string;
			characterName?: string | null;
			isGM: boolean;
			inspiration: number;
		}>;
	} | null;
};

export const PlayerFragmentDoc = gql`
	fragment Player on Player {
		id
		playerName
		characterName
		isGM
		inspiration
	}
`;
export const CampaignFragmentDoc = gql`
	fragment Campaign on Campaign {
		id
		name
		gmInspiration
		players {
			...Player
		}
	}
	${PlayerFragmentDoc}
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
