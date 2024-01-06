(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 7961:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* reexport */ Header)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: external "@mui/system"
var system_ = __webpack_require__(7986);
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: external "@mui/material/styles"
var styles_ = __webpack_require__(8442);
// EXTERNAL MODULE: external "@mui/icons-material"
var icons_material_ = __webpack_require__(7915);
// EXTERNAL MODULE: ./src/graphql/client-types.tsx
var client_types = __webpack_require__(6457);
;// CONCATENATED MODULE: ./src/components/header/header.tsx










// TODO: Better handling of mobile styles
const StyledAppBar = (0,styles_.styled)(material_.AppBar)(({ theme  })=>({
        // flexWrap: "nowrap",
        "& .MuiBreadcrumbs-separator, & .MuiBreadcrumbs-li, & a, & a:hover, & a:visited, & a:active": {
            color: theme.palette.primary.contrastText,
            textDecoration: "none",
            fontWeight: "normal"
        }
    }));
function Header() {
    const router = (0,router_.useRouter)();
    const { data: session , status  } = (0,react_.useSession)();
    const theme = (0,styles_.useTheme)();
    const isSmallView = (0,material_.useMediaQuery)(theme.breakpoints.down("md"));
    const [anchorEl, setAnchorEl] = (0,external_react_.useState)(null);
    const handleOpen = (event)=>{
        setAnchorEl(event.currentTarget);
    };
    const handleClose = ()=>{
        setAnchorEl(null);
    };
    const { campaignId , encounterId  } = router.query;
    const { data: campaignData , refetch: refetchCampaignData  } = (0,client_types/* useCampaignNameQuery */.H)({
        variables: {
            campaignId: campaignId
        },
        skip: !campaignId
    });
    const { data: encounterData  } = (0,client_types/* useEncounterNameQuery */.Jr)({
        variables: {
            campaignId: campaignId,
            encounterId: encounterId
        },
        skip: !(campaignId && encounterId)
    });
    (0,external_react_.useEffect)(()=>{
        refetchCampaignData();
    }, [
        refetchCampaignData,
        router.pathname
    ]);
    const routes = (0,external_react_.useMemo)(()=>{
        const pathname = router.pathname.replace(/\/$/, "");
        const routes = [
            {
                href: "/",
                title: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(icons_material_.Home, {
                            sx: {
                                mr: 0.25,
                                mb: -0.25
                            },
                            fontSize: "inherit"
                        }),
                        "Campaigns"
                    ]
                })
            }
        ];
        switch(pathname){
            case "/[campaignId]/edit":
                routes.push({
                    title: campaignData?.campaign?.name
                });
                break;
            case "/[campaignId]/encounter":
                routes.push({
                    href: `/${campaignId}/edit`,
                    title: campaignData?.campaign?.name
                });
                routes.push({
                    title: "Encounters"
                });
                break;
            case "/[campaignId]/encounter/run":
            case "/[campaignId]/encounter/[encounterId]/edit":
                routes.push({
                    href: `/${campaignId}/edit`,
                    title: campaignData?.campaign?.name
                });
                routes.push({
                    href: `/${campaignId}/encounter`,
                    title: "Encounters"
                });
                routes.push({
                    title: pathname.endsWith("run") ? campaignData?.campaign?.activeEncounter?.name : encounterData?.campaign?.encounter?.name
                });
                break;
        }
        return routes;
    }, [
        campaignId,
        campaignData,
        encounterData,
        router.pathname
    ]);
    return !router.pathname.includes("overlay") ? /*#__PURE__*/ jsx_runtime_.jsx(material_.Box, {
        sx: {
            flexGrow: 1,
            pb: 4
        },
        children: /*#__PURE__*/ jsx_runtime_.jsx(StyledAppBar, {
            position: "static",
            children: /*#__PURE__*/ jsx_runtime_.jsx(system_.Container, {
                maxWidth: "lg",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(material_.Toolbar, {
                    sx: {
                        ml: -4,
                        mr: -4
                    },
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(material_.Breadcrumbs, {
                            "aria-label": "breadcrumb",
                            sx: {
                                flexGrow: 1
                            },
                            maxItems: isSmallView ? 1 : undefined,
                            children: routes.map(({ href , title  })=>href ? /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: href,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Link, {
                                        component: "span",
                                        underline: "hover",
                                        color: "text.",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Typography, {
                                            noWrap: true,
                                            children: title
                                        })
                                    })
                                }, href) : /*#__PURE__*/ jsx_runtime_.jsx(material_.Typography, {
                                    noWrap: true,
                                    children: title
                                }, href || "active"))
                        }),
                        status === "unauthenticated" ? /*#__PURE__*/ jsx_runtime_.jsx(material_.Button, {
                            color: "inherit",
                            onClick: ()=>(0,react_.signIn)(),
                            children: "Login"
                        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(material_.Button, {
                                    "aria-label": "current user",
                                    "aria-controls": "menu-appbar",
                                    "aria-haspopup": "true",
                                    onClick: handleOpen,
                                    color: "inherit",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(icons_material_.AccountCircle, {
                                            sx: {
                                                mr: 0.5
                                            }
                                        }),
                                        session?.user?.name && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                "Hi, ",
                                                session.user.name.split(" ")[0],
                                                "!"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(material_.Menu, {
                                    id: "menu-appbar",
                                    anchorEl: anchorEl,
                                    keepMounted: true,
                                    open: !!anchorEl,
                                    onClose: handleClose,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(material_.MenuItem, {
                                        onClick: ()=>(0,react_.signOut)(),
                                        children: "Sign Out"
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        })
    }) : null;
}

;// CONCATENATED MODULE: ./src/components/header/index.tsx



/***/ }),

/***/ 5535:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useApolloClient)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client_link_subscriptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3761);
/* harmony import */ var _apollo_client_link_subscriptions__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client_link_subscriptions__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _apollo_client_link_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4394);
/* harmony import */ var _apollo_client_link_error__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_apollo_client_link_error__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _apollo_client_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7596);
/* harmony import */ var _apollo_client_utilities__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_apollo_client_utilities__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var graphql_ws__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2024);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([graphql_ws__WEBPACK_IMPORTED_MODULE_4__]);
graphql_ws__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






function useApolloClient() {
    const host = (protocol)=>`${protocol}${process.env.NEXT_PUBLIC_HTTPS === "true" ? "s" : ""}://${process.env.NEXT_PUBLIC_HOST}${process.env.PORT ? `:${process.env.PORT}` : ""}/api/${protocol === "http" ? "graphql" : "subscriptions"}`;
    const httpLink = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.HttpLink({
        uri: host("http")
    });
    const wsLink =  false ? 0 : null;
    const splitLink =  false ? 0 : httpLink;
    const errorLink = (0,_apollo_client_link_error__WEBPACK_IMPORTED_MODULE_2__.onError)(({ graphQLErrors  })=>{
        if (graphQLErrors?.some((error)=>error?.extensions?.code === "UNAUTHENTICATED")) {
            (0,next_auth_react__WEBPACK_IMPORTED_MODULE_5__.signIn)();
        }
    });
    return new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloClient({
        link: (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.from)([
            errorLink,
            splitLink
        ]),
        cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.InMemoryCache({
            typePolicies: {
                Campaign: {
                    fields: {
                        players: {
                            merge (_existing, incoming) {
                                /**
								 * In this case, the incoming value is the source of truth. We
								 * aren't paginating or lazy loading or anything like that, so
								 * the incoming array is always the full array.
								 *
								 * This function duplicates the default behavior, but suppresses
								 * the warning about it possibly being an error.
								 */ return incoming;
                            }
                        }
                    }
                }
            }
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6505:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7961);
/* harmony import */ var _graphql_setup_apollo_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5535);
/* harmony import */ var _global_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3524);
/* harmony import */ var _global_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_global_css__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_graphql_setup_apollo_client__WEBPACK_IMPORTED_MODULE_6__]);
_graphql_setup_apollo_client__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








function MyApp({ Component , pageProps  }) {
    const apolloClient = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(_graphql_setup_apollo_client__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_auth_react__WEBPACK_IMPORTED_MODULE_3__.SessionProvider, {
        session: pageProps.session,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_apollo_client__WEBPACK_IMPORTED_MODULE_4__.ApolloProvider, {
            client: apolloClient,
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            name: "description",
                            content: "OBS GM Overlay"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            name: "viewport",
                            content: "initial-scale=1, width=device-width"
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_header__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                    ...pageProps
                })
            ]
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3524:
/***/ (() => {



/***/ }),

/***/ 9114:
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/client");

/***/ }),

/***/ 4394:
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/client/link/error");

/***/ }),

/***/ 3761:
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/client/link/subscriptions");

/***/ }),

/***/ 7596:
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/client/utilities");

/***/ }),

/***/ 7915:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material");

/***/ }),

/***/ 5692:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material");

/***/ }),

/***/ 8442:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/styles");

/***/ }),

/***/ 7986:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system");

/***/ }),

/***/ 1649:
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 2024:
/***/ ((module) => {

"use strict";
module.exports = import("graphql-ws");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [210,676,664,457], () => (__webpack_exec__(6505)));
module.exports = __webpack_exports__;

})();