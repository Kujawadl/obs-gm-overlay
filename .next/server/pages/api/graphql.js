"use strict";
(() => {
var exports = {};
exports.id = 702;
exports.ids = [702];
exports.modules = {

/***/ 8083:
/***/ ((module) => {

module.exports = require("@apollo/server");

/***/ }),

/***/ 1283:
/***/ ((module) => {

module.exports = require("graphql-subscriptions");

/***/ }),

/***/ 8086:
/***/ ((module) => {

module.exports = require("lodash/merge");

/***/ }),

/***/ 8459:
/***/ ((module) => {

module.exports = require("lodash/uniq");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 9755:
/***/ ((module) => {

module.exports = require("react-use");

/***/ }),

/***/ 4349:
/***/ ((module) => {

module.exports = import("@apollo/server");;

/***/ }),

/***/ 8786:
/***/ ((module) => {

module.exports = import("@apollo/server/plugin/drainHttpServer");;

/***/ }),

/***/ 6550:
/***/ ((module) => {

module.exports = import("@graphql-tools/schema");;

/***/ }),

/***/ 8248:
/***/ ((module) => {

module.exports = import("date-fns");;

/***/ }),

/***/ 9647:
/***/ ((module) => {

module.exports = import("graphql-ws/lib/use/ws");;

/***/ }),

/***/ 6235:
/***/ ((module) => {

module.exports = import("postgres");;

/***/ }),

/***/ 9814:
/***/ ((module) => {

module.exports = import("ws");;

/***/ }),

/***/ 7310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 1648:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ checkAuth)
});

;// CONCATENATED MODULE: external "graphql"
const external_graphql_namespaceObject = require("graphql");
;// CONCATENATED MODULE: external "next-auth/jwt"
const jwt_namespaceObject = require("next-auth/jwt");
;// CONCATENATED MODULE: ./src/graphql/checkAuth.ts


async function checkAuth(context, campaignId) {
    const token = await (0,jwt_namespaceObject.getToken)({
        req: context.req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: "true" === "true"
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
    throw new external_graphql_namespaceObject.GraphQLError("You must be logged in to view this resource", {
        extensions: {
            code: "UNAUTHENTICATED"
        }
    });
}


/***/ }),

/***/ 9044:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ setupContext)
/* harmony export */ });
/* harmony import */ var postgres__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6235);
/* harmony import */ var graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1283);
/* harmony import */ var graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5798);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([postgres__WEBPACK_IMPORTED_MODULE_0__, _models__WEBPACK_IMPORTED_MODULE_2__]);
([postgres__WEBPACK_IMPORTED_MODULE_0__, _models__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



function setupContext() {
    const sql = (0,postgres__WEBPACK_IMPORTED_MODULE_0__["default"])({
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || "") || 5432
    });
    const pubsub = new graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__.PubSub();
    return {
        sql,
        pubsub,
        Campaign: new _models__WEBPACK_IMPORTED_MODULE_2__/* .CampaignModel */ .Z4(sql, pubsub),
        Combatant: new _models__WEBPACK_IMPORTED_MODULE_2__/* .CombatantModel */ .wc(sql),
        Encounter: new _models__WEBPACK_IMPORTED_MODULE_2__/* .EncounterModel */ .ZR(sql),
        Player: new _models__WEBPACK_IMPORTED_MODULE_2__/* .PlayerModel */ .Sg(sql)
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6796:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var graphql_subscriptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1283);
/* harmony import */ var graphql_subscriptions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_subscriptions__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _checkAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1648);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9660);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils__WEBPACK_IMPORTED_MODULE_2__]);
_utils__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const resolvers = {
    Query: {
        async campaigns (_parent, _args, ctx) {
            const userId = await (0,_checkAuth__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(ctx);
            if (!userId) return [];
            return ctx.Campaign.list(userId);
        },
        async campaign (_parent, args, ctx) {
            return ctx.Campaign.get(args.id ?? undefined);
        }
    },
    Mutation: {
        async campaign (_parent, args, ctx) {
            const userId = await (0,_checkAuth__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(ctx, args.id);
            if (!userId) return {};
            const campaign = args.id ? await ctx.Campaign.get(args.id) : undefined;
            return campaign ?? {};
        }
    },
    Subscription: {
        campaign: {
            // @ts-expect-error graphql-subscriptions types are incorrect, but this 100% works
            subscribe: (0,graphql_subscriptions__WEBPACK_IMPORTED_MODULE_0__.withFilter)((_parent, args, ctx)=>{
                setImmediate(()=>ctx.Campaign.publishSubscription(args.id));
                return ctx.pubsub.asyncIterator("CAMPAIGN_UPDATED");
            }, (payload, variables)=>{
                return payload.campaign.id === variables.id;
            })
        }
    },
    Campaign: {
        players (parent, _args, ctx) {
            return ctx.Player.list(parent.id);
        },
        async lastInspirationUsed (parent, _args, ctx) {
            const players = await ctx.Player.list(parent.id);
            const maxTimeValue = players.reduce((max, player)=>{
                const lastInspirationUsed = (parent.gmInspiration || !player.isGM) && player.lastInspirationUsed ? (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .parseDate */ .sG)(player.lastInspirationUsed).getTime() : -1;
                return Math.max(lastInspirationUsed, max);
            }, -1);
            return maxTimeValue >= 0 ? (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .formatDate */ .p6)(new Date(maxTimeValue)) : undefined;
        }
    },
    CampaignMutation: {
        async save (parent, { input  }, ctx) {
            const userId = await (0,_checkAuth__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(ctx);
            if (!userId) return undefined;
            const result = parent.id ? await ctx.Campaign.update(parent, input) : await ctx.Campaign.create(input, userId);
            if (result) {
                ctx.Campaign.publishSubscription(result.id);
            }
            return result;
        },
        async delete (parent, _, { Campaign  }) {
            const result = parent.id ? await Campaign.delete(parent.id) : false;
            if (result) {
                Campaign.publishSubscription(parent.id);
            }
            return result;
        }
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (resolvers);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2139:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8086);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _campaign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6796);
/* harmony import */ var _initiative__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6420);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9065);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_campaign__WEBPACK_IMPORTED_MODULE_1__, _initiative__WEBPACK_IMPORTED_MODULE_2__]);
([_campaign__WEBPACK_IMPORTED_MODULE_1__, _initiative__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const resolvers = lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()(_campaign__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, _initiative__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, _player__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (resolvers);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6420:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8459);
/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_uniq__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _checkAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1648);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9660);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils__WEBPACK_IMPORTED_MODULE_2__]);
_utils__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const resolvers = {
    Campaign: {
        async activeEncounter (parent, _args, ctx) {
            const encounter = parent.activeEncounter ? await ctx.Encounter.get(parent.activeEncounter) : undefined;
            return encounter;
        },
        async encounter (_parent, args, ctx) {
            const encounter = await ctx.Encounter.get(args.id);
            return encounter;
        },
        async encounters (parent, _args, ctx) {
            return ctx.Encounter.list(parent.id);
        }
    },
    CampaignMutation: {
        async encounter (_parent, args, ctx) {
            if (args.id) {
                const encounter = await ctx.Encounter.get(args.id);
                const userId = await (0,_checkAuth__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(ctx, encounter?.campaignId);
                if (!userId) return {};
                return encounter;
            } else {
                return {};
            }
        }
    },
    Encounter: {
        async combatants (parent, _args, ctx) {
            const combatants = await ctx.Combatant.list(parent.id);
            return combatants ?? [];
        }
    },
    EncounterMutation: {
        async save (parent, args, ctx) {
            if (!parent.id && args.input.id) {
                parent = await ctx.Encounter.get(args.input.id) ?? parent;
            }
            const result = parent.id ? await ctx.Encounter.update(parent, args.input) : await ctx.Encounter.create(args.input);
            const campaign = await ctx.Campaign.get(result.campaignId);
            if (campaign?.activeEncounter === result.id) {
                await ctx.Campaign.publishSubscription(campaign.id);
            }
            return result;
        },
        async delete (parent, _args, ctx) {
            if (!parent.id) return false;
            const campaign = await ctx.Campaign.get(parent.campaignId);
            if (campaign?.activeEncounter === parent.id) {
                await ctx.Campaign.update(campaign, {
                    activeEncounter: null
                });
                await ctx.Campaign.publishSubscription(parent.id);
            }
            const result = await ctx.Encounter.delete(parent.id);
            return result;
        },
        async setActive (parent, args, ctx) {
            const campaign = await ctx.Campaign.get(parent.campaignId);
            if (!campaign) {
                throw new Error(`Invalid campaign ID ${parent.campaignId} for encounter ${parent.id}`);
            }
            if (args.active) {
                await ctx.Campaign.update(campaign, {
                    activeEncounter: parent.id
                });
            } else if (campaign.activeEncounter === parent.id) {
                await ctx.Campaign.update(campaign, {
                    activeEncounter: null
                });
            }
            await ctx.Campaign.publishSubscription(campaign.id);
            return true;
        },
        async next (parent, _, ctx) {
            const [nextTurn, nextRound] = await ctx.Encounter.findNextTurn(parent.id, parent.turn, parent.round);
            // @ts-ignore
            await ctx.Encounter.update(parent, {
                turn: nextTurn,
                round: nextRound,
                turnStart: (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .formatDate */ .p6)(new Date())
            });
            const campaign = await ctx.Campaign.get(parent.campaignId);
            if (campaign?.activeEncounter === parent.id) {
                await ctx.Campaign.publishSubscription(campaign.id);
            }
            return true;
        },
        async prev (parent, _, ctx) {
            const [prevTurn, prevRound] = await ctx.Encounter.findPrevTurn(parent.id, parent.turn, parent.round);
            // @ts-ignore
            await ctx.Encounter.update(parent, {
                turn: prevTurn,
                round: prevRound,
                turnStart: (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .formatDate */ .p6)(new Date())
            });
            const campaign = await ctx.Campaign.get(parent.campaignId);
            if (campaign?.activeEncounter === parent.id) {
                await ctx.Campaign.publishSubscription(campaign.id);
            }
            return true;
        },
        async combatant (_parent, args, ctx) {
            if (args.id) {
                const combatant = await ctx.Combatant.get(args.id);
                const encounter = _parent ?? (combatant && await ctx.Encounter.get(combatant?.encounterId));
                const userId = await (0,_checkAuth__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(ctx, encounter?.campaignId);
                if (!userId) return {};
                return combatant;
            } else {
                return {};
            }
        },
        async saveCombatants (_parent, args, ctx) {
            const result = await ctx.Combatant.bulkUpdate(args.input);
            const campaignIds = lodash_uniq__WEBPACK_IMPORTED_MODULE_0___default()(args.input.map((c)=>c.campaignId));
            for (let campaignId of campaignIds){
                await ctx.Campaign.publishSubscription(campaignId);
            }
            return result;
        }
    },
    Combatant: {
        async campaign (parent, _args, ctx) {
            const campaign = await ctx.Campaign.get(parent.campaignId);
            return campaign ?? {};
        },
        async player (parent, _args, ctx) {
            return parent.playerId ? ctx.Player.get(parent.playerId) : undefined;
        }
    },
    CombatantMutation: {
        async save (parent, args, ctx) {
            if (!parent.id && args.input.id) {
                parent = await ctx.Combatant.get(args.input.id) ?? parent;
            }
            const result = parent.id ? await ctx.Combatant.update(parent, args.input) : await ctx.Combatant.create(args.input);
            const campaign = await ctx.Campaign.get(result.campaignId);
            if (campaign?.activeEncounter === result.encounterId) {
                await ctx.Campaign.publishSubscription(campaign.id);
            }
            return result;
        },
        async delete (parent, _args, ctx) {
            if (!parent.id) return false;
            const result = await ctx.Combatant.delete(parent.id);
            const campaign = await ctx.Campaign.get(parent.campaignId);
            if (campaign?.activeEncounter === parent.encounterId) {
                await ctx.Campaign.publishSubscription(campaign.id);
            }
            return result;
        }
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (resolvers);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9065:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _checkAuth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1648);

const resolvers = {
    Query: {
        async player (_parent, args, ctx) {
            const player = await ctx.Player.get(args.id);
            const userId = await (0,_checkAuth__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(ctx, player?.campaignId);
            if (!userId) return await undefined;
            return player;
        }
    },
    Mutation: {
        async player (_parent, args, ctx) {
            const player = args.id ? await ctx.Player.get(args.id) : undefined;
            const userId = await (0,_checkAuth__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(ctx, player?.campaignId);
            if (!userId) return {};
            return player ?? {};
        }
    },
    Player: {
        campaign (parent, _args, { Campaign  }) {
            return Campaign.get(parent.campaignId);
        }
    },
    PlayerMutation: {
        async save (parent, { input  }, { Player , Campaign  }) {
            const result = parent.id ? await Player.update(parent, input) : await Player.create(input);
            if (result) {
                Campaign.publishSubscription(result.campaignId);
            }
            return result;
        },
        async delete (parent, _, { Player , Campaign  }) {
            const player = parent.id ? await Player.get(parent.id) : undefined;
            const result = parent.id ? await Player.delete(parent.id) : false;
            if (player && result) {
                Campaign.publishSubscription(player.campaignId);
            }
            return result;
        },
        async resetCooldown (parent, _args, { Player , Campaign  }) {
            const player = parent.id ? await Player.get(parent.id) : undefined;
            const result = await Player.resetCooldown(parent.id);
            if (player && result) {
                Campaign.publishSubscription(player.campaignId);
            }
            return result;
        }
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (resolvers);


/***/ }),

/***/ 6330:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _apollo_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4349);
/* harmony import */ var _apollo_server_plugin_drainHttpServer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8786);
/* harmony import */ var _graphql_tools_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6550);
/* harmony import */ var graphql_ws_lib_use_ws__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9647);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7895);
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2139);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_apollo_server__WEBPACK_IMPORTED_MODULE_0__, _apollo_server_plugin_drainHttpServer__WEBPACK_IMPORTED_MODULE_1__, _graphql_tools_schema__WEBPACK_IMPORTED_MODULE_2__, graphql_ws_lib_use_ws__WEBPACK_IMPORTED_MODULE_3__, _resolvers__WEBPACK_IMPORTED_MODULE_5__]);
([_apollo_server__WEBPACK_IMPORTED_MODULE_0__, _apollo_server_plugin_drainHttpServer__WEBPACK_IMPORTED_MODULE_1__, _graphql_tools_schema__WEBPACK_IMPORTED_MODULE_2__, graphql_ws_lib_use_ws__WEBPACK_IMPORTED_MODULE_3__, _resolvers__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function setupApolloServer(httpServer, wsServer, context) {
    const schema = (0,_graphql_tools_schema__WEBPACK_IMPORTED_MODULE_2__.makeExecutableSchema)({
        typeDefs: _types__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z,
        resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z
    });
    const serverCleanup = (0,graphql_ws_lib_use_ws__WEBPACK_IMPORTED_MODULE_3__.useServer)({
        schema,
        context
    }, wsServer);
    return new _apollo_server__WEBPACK_IMPORTED_MODULE_0__.ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            (0,_apollo_server_plugin_drainHttpServer__WEBPACK_IMPORTED_MODULE_1__.ApolloServerPluginDrainHttpServer)({
                httpServer
            }),
            {
                async serverWillStart () {
                    return {
                        async drainServer () {
                            await serverCleanup.dispose();
                            await context.sql.end();
                        }
                    };
                }
            }
        ],
        formatError: (err)=>{
            console.error(err);
            return err;
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setupApolloServer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7895:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ types)
});

;// CONCATENATED MODULE: external "graphql-tag"
const external_graphql_tag_namespaceObject = require("graphql-tag");
;// CONCATENATED MODULE: ./src/graphql/types/campaign.ts

const typeDefs = external_graphql_tag_namespaceObject.gql`
	extend type Query {
		campaigns: [Campaign!]!
		campaign(id: ID): Campaign
	}

	extend type Subscription {
		campaign(id: ID): Campaign
	}

	type Campaign {
		id: ID!
		name: String!
		gmInspiration: Boolean!
		players: [Player!]!
		cooldownType: CooldownType!
		cooldownTime: Int!
		lastInspirationUsed: Date
	}

	enum CooldownType {
		none
		player
		table
	}

	input CampaignInput {
		name: String!
		gmInspiration: Boolean
		cooldownType: CooldownType
		cooldownTime: Int
	}

	type CampaignMutation {
		save(input: CampaignInput!): Campaign!
		delete: Boolean!
	}

	extend type Mutation {
		campaign(id: ID): CampaignMutation
	}
`;
/* harmony default export */ const campaign = (typeDefs);

;// CONCATENATED MODULE: ./src/graphql/types/initiative.ts

const initiative_typeDefs = external_graphql_tag_namespaceObject.gql`
	enum HideMonsterNames {
		never
		always
		untilTurn
	}

	extend type Campaign {
		activeEncounter: Encounter
		encounter(id: ID!): Encounter
		encounters: [Encounter!]!
	}

	type Encounter {
		id: ID!
		name: String!
		hideMonsterNames: HideMonsterNames!
		round: Int!
		turn: Int!
		turnStart: Date
		combatants: [Combatant!]!
	}

	type Combatant {
		id: ID!
		campaign: Campaign!
		encounter: Encounter!
		player: Player
		name: String!
		public: Boolean!
		turnOrder: Int!
	}

	extend type CampaignMutation {
		encounter(id: ID): EncounterMutation
	}

	type EncounterMutation {
		save(input: EncounterInput!): Encounter!
		delete: Boolean!
		setActive(active: Boolean): Boolean!
		next: Boolean
		prev: Boolean
		combatant(id: ID): CombatantMutation!
		saveCombatants(input: [CombatantInput!]!): [Combatant!]!
	}

	type CombatantMutation {
		save(input: CombatantInput!): Combatant!
		delete: Boolean!
	}

	extend input CampaignInput {
		activeEncounter: ID
	}

	input EncounterInput {
		id: ID
		campaignId: ID!
		name: String!
		hideMonsterNames: HideMonsterNames
		round: Int
		turn: Int
		turnStart: Date
	}

	input CombatantInput {
		id: ID
		campaignId: ID!
		encounterId: ID!
		playerId: ID
		name: String!
		public: Boolean
		turnOrder: Int!
	}
`;
/* harmony default export */ const initiative = (initiative_typeDefs);

;// CONCATENATED MODULE: ./src/graphql/types/player.ts

const player_typeDefs = external_graphql_tag_namespaceObject.gql`
	extend type Query {
		player(id: ID!): Player
	}

	extend type Mutation {
		player(id: ID): PlayerMutation
	}

	type Player {
		id: ID!
		campaign: Campaign!
		playerName: String!
		characterName: String
		isGM: Boolean!
		inspiration: Int!
		lastInspirationUsed: Date
	}

	input PlayerInput {
		campaignId: ID
		playerName: String
		characterName: String
		isGM: Boolean
		inspiration: Int
	}

	type PlayerMutation {
		save(input: PlayerInput!): Player!
		delete: Boolean!
		resetCooldown: Boolean!
	}
`;
/* harmony default export */ const player = (player_typeDefs);

;// CONCATENATED MODULE: ./src/graphql/types/scalars.ts

const scalars_typeDefs = external_graphql_tag_namespaceObject.gql`
	scalar Date
`;
/* harmony default export */ const scalars = (scalars_typeDefs);

;// CONCATENATED MODULE: ./src/graphql/types/index.ts





const Root = external_graphql_tag_namespaceObject.gql`
	type Query
	type Mutation
	type Subscription
`;
const types_typeDefs = [
    Root,
    campaign,
    initiative,
    player,
    scalars
];
/* harmony default export */ const types = (types_typeDefs);


/***/ }),

/***/ 32:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7310);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9814);
/* harmony import */ var _as_integrations_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1456);
/* harmony import */ var _as_integrations_next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_as_integrations_next__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _graphql_setup_apollo_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6330);
/* harmony import */ var _graphql_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9044);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([ws__WEBPACK_IMPORTED_MODULE_1__, _graphql_setup_apollo_server__WEBPACK_IMPORTED_MODULE_3__, _graphql_context__WEBPACK_IMPORTED_MODULE_4__]);
([ws__WEBPACK_IMPORTED_MODULE_1__, _graphql_setup_apollo_server__WEBPACK_IMPORTED_MODULE_3__, _graphql_context__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const handler = async (req, res)=>{
    try {
        const server = req.socket.server;
        if (!server.apolloHandler) {
            server.apolloHandler = new Promise((resolve)=>{
                console.log("Initializing Apollo Next.JS API handler");
                const wsServer = new ws__WEBPACK_IMPORTED_MODULE_1__.WebSocketServer({
                    noServer: true
                });
                server.on("upgrade", async function connection(req, socket, head) {
                    const { pathname  } = (0,url__WEBPACK_IMPORTED_MODULE_0__.parse)(req.url, true);
                    if (pathname === "/api/subscriptions" && !socket.websocket) {
                        wsServer.handleUpgrade(req, socket, head, function done(ws) {
                            wsServer.emit("connection", ws, req);
                        });
                    }
                });
                const coreContext = (0,_graphql_context__WEBPACK_IMPORTED_MODULE_4__/* .setupContext */ .H)();
                const baseApolloServer = (0,_graphql_setup_apollo_server__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(server, wsServer, coreContext);
                const apolloHandler = (0,_as_integrations_next__WEBPACK_IMPORTED_MODULE_2__.startServerAndCreateNextHandler)(baseApolloServer, {
                    context: async (req, res)=>Promise.resolve({
                            ...coreContext,
                            req,
                            res
                        })
                });
                resolve(apolloHandler);
            });
        }
        const apolloHandler = await server.apolloHandler;
        return apolloHandler(req, res);
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [456,798], () => (__webpack_exec__(32)));
module.exports = __webpack_exports__;

})();