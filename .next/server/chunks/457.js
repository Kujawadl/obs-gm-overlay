"use strict";
exports.id = 457;
exports.ids = [457];
exports.modules = {

/***/ 6457:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$p": () => (/* binding */ useSaveEncounterMutation),
/* harmony export */   "Co": () => (/* binding */ useSetActiveEncounterMutation),
/* harmony export */   "DM": () => (/* binding */ useDeleteEncounterMutation),
/* harmony export */   "H": () => (/* binding */ useCampaignNameQuery),
/* harmony export */   "Jr": () => (/* binding */ useEncounterNameQuery),
/* harmony export */   "N8": () => (/* binding */ EncounterDetailDocument),
/* harmony export */   "NJ": () => (/* binding */ HideMonsterNames),
/* harmony export */   "UB": () => (/* binding */ useSetPlayerInspirationMutation),
/* harmony export */   "VV": () => (/* binding */ useEncounterDetailQuery),
/* harmony export */   "Wd": () => (/* binding */ useDeleteCampaignMutation),
/* harmony export */   "g8": () => (/* binding */ useListEncountersQuery),
/* harmony export */   "hU": () => (/* binding */ useSaveCombatantsMutation),
/* harmony export */   "if": () => (/* binding */ useListCampaignsQuery),
/* harmony export */   "kU": () => (/* binding */ useDeleteCombatantMutation),
/* harmony export */   "kf": () => (/* binding */ useAdvanceInitiativeMutation),
/* harmony export */   "ks": () => (/* binding */ useDeletePlayerMutation),
/* harmony export */   "mU": () => (/* binding */ useCampaignSubscription),
/* harmony export */   "oY": () => (/* binding */ useSaveCombatantMutation),
/* harmony export */   "os": () => (/* binding */ useResetPlayerCooldownMutation),
/* harmony export */   "u9": () => (/* binding */ useSaveCampaignMutation),
/* harmony export */   "x8": () => (/* binding */ useSavePlayerMutation)
/* harmony export */ });
/* unused harmony exports CooldownType, PlayerFragmentDoc, CombatantFragmentDoc, EncounterFragmentDoc, CampaignFragmentDoc, AdvanceInitiativeDocument, DeleteCampaignDocument, DeleteCombatantDocument, DeleteEncounterDocument, DeletePlayerDocument, ResetPlayerCooldownDocument, SaveCampaignDocument, SaveCombatantDocument, SaveCombatantsDocument, SaveEncounterDocument, SavePlayerDocument, SetActiveEncounterDocument, SetPlayerInspirationDocument, CampaignNameDocument, useCampaignNameLazyQuery, useEncounterDetailLazyQuery, EncounterNameDocument, useEncounterNameLazyQuery, ListCampaignsDocument, useListCampaignsLazyQuery, ListEncountersDocument, useListEncountersLazyQuery, CampaignDocument */
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);
/**
 * GENERATED FILE: DO NOT MODIFY DIRECTLY
 * `npm run generate-types` to update
 */ /* eslint-disable */ 

const defaultOptions = {};
var CooldownType;
(function(CooldownType) {
    CooldownType["None"] = "none";
    CooldownType["Player"] = "player";
    CooldownType["Table"] = "table";
})(CooldownType || (CooldownType = {}));
var HideMonsterNames;
(function(HideMonsterNames) {
    HideMonsterNames["Always"] = "always";
    HideMonsterNames["Never"] = "never";
    HideMonsterNames["UntilTurn"] = "untilTurn";
})(HideMonsterNames || (HideMonsterNames = {}));
const PlayerFragmentDoc = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
	fragment Player on Player {
		id
		playerName
		characterName
		isGM
		inspiration
		lastInspirationUsed
	}
`;
const CombatantFragmentDoc = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
	fragment Combatant on Combatant {
		id
		name
		public
		turnOrder
		player {
			id
			playerName
		}
	}
`;
const EncounterFragmentDoc = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
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
const CampaignFragmentDoc = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
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
const AdvanceInitiativeDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
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
 */ function useAdvanceInitiativeMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(AdvanceInitiativeDocument, options);
}
const DeleteCampaignDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
	mutation DELETE_CAMPAIGN($id: ID!) {
		campaign(id: $id) {
			delete
		}
	}
`;
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
 */ function useDeleteCampaignMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(DeleteCampaignDocument, options);
}
const DeleteCombatantDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
	mutation DELETE_COMBATANT($id: ID!) {
		campaign {
			encounter {
				combatant(id: $id) {
					delete
				}
			}
		}
	}
`;
/**
 * __useDeleteCombatantMutation__
 *
 * To run a mutation, you first call `useDeleteCombatantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCombatantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCombatantMutation, { data, loading, error }] = useDeleteCombatantMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */ function useDeleteCombatantMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(DeleteCombatantDocument, options);
}
const DeleteEncounterDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
	mutation DELETE_ENCOUNTER($campaignId: ID!, $encounterId: ID!) {
		campaign(id: $campaignId) {
			encounter(id: $encounterId) {
				delete
			}
		}
	}
`;
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
 */ function useDeleteEncounterMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(DeleteEncounterDocument, options);
}
const DeletePlayerDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
	mutation DELETE_PLAYER($id: ID!) {
		player(id: $id) {
			delete
		}
	}
`;
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
 */ function useDeletePlayerMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(DeletePlayerDocument, options);
}
const ResetPlayerCooldownDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
	mutation RESET_PLAYER_COOLDOWN($id: ID!) {
		player(id: $id) {
			resetCooldown
		}
	}
`;
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
 */ function useResetPlayerCooldownMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(ResetPlayerCooldownDocument, options);
}
const SaveCampaignDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
	mutation SAVE_CAMPAIGN($id: ID, $input: CampaignInput!) {
		campaign(id: $id) {
			save(input: $input) {
				...Campaign
			}
		}
	}
	${CampaignFragmentDoc}
`;
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
 */ function useSaveCampaignMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(SaveCampaignDocument, options);
}
const SaveCombatantDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
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
 */ function useSaveCombatantMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(SaveCombatantDocument, options);
}
const SaveCombatantsDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
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
 */ function useSaveCombatantsMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(SaveCombatantsDocument, options);
}
const SaveEncounterDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
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
 */ function useSaveEncounterMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(SaveEncounterDocument, options);
}
const SavePlayerDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
	mutation SAVE_PLAYER($id: ID, $input: PlayerInput!) {
		player(id: $id) {
			save(input: $input) {
				...Player
			}
		}
	}
	${PlayerFragmentDoc}
`;
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
 */ function useSavePlayerMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(SavePlayerDocument, options);
}
const SetActiveEncounterDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
	mutation SET_ACTIVE_ENCOUNTER($campaignId: ID!, $encounterId: ID!) {
		campaign(id: $campaignId) {
			encounter(id: $encounterId) {
				setActive(active: true)
			}
		}
	}
`;
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
 */ function useSetActiveEncounterMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(SetActiveEncounterDocument, options);
}
const SetPlayerInspirationDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
	mutation SET_PLAYER_INSPIRATION($id: ID!, $inspiration: Int!) {
		player(id: $id) {
			save(input: { inspiration: $inspiration }) {
				...Player
			}
		}
	}
	${PlayerFragmentDoc}
`;
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
 */ function useSetPlayerInspirationMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(SetPlayerInspirationDocument, options);
}
const CampaignNameDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
	query CAMPAIGN_NAME($campaignId: ID!) {
		campaign(id: $campaignId) {
			name
			activeEncounter {
				name
			}
		}
	}
`;
/**
 * __useCampaignNameQuery__
 *
 * To run a query within a React component, call `useCampaignNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignNameQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */ function useCampaignNameQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useQuery(CampaignNameDocument, options);
}
function useCampaignNameLazyQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return Apollo.useLazyQuery(CampaignNameDocument, options);
}
const EncounterDetailDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
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
 */ function useEncounterDetailQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useQuery(EncounterDetailDocument, options);
}
function useEncounterDetailLazyQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return Apollo.useLazyQuery(EncounterDetailDocument, options);
}
const EncounterNameDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
	query ENCOUNTER_NAME($campaignId: ID!, $encounterId: ID!) {
		campaign(id: $campaignId) {
			encounter(id: $encounterId) {
				name
			}
		}
	}
`;
/**
 * __useEncounterNameQuery__
 *
 * To run a query within a React component, call `useEncounterNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useEncounterNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEncounterNameQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *      encounterId: // value for 'encounterId'
 *   },
 * });
 */ function useEncounterNameQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useQuery(EncounterNameDocument, options);
}
function useEncounterNameLazyQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return Apollo.useLazyQuery(EncounterNameDocument, options);
}
const ListCampaignsDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
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
 */ function useListCampaignsQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useQuery(ListCampaignsDocument, options);
}
function useListCampaignsLazyQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return Apollo.useLazyQuery(ListCampaignsDocument, options);
}
const ListEncountersDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
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
 */ function useListEncountersQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useQuery(ListEncountersDocument, options);
}
function useListEncountersLazyQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return Apollo.useLazyQuery(ListEncountersDocument, options);
}
const CampaignDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
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
 */ function useCampaignSubscription(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useSubscription(CampaignDocument, options);
}


/***/ })

};
;