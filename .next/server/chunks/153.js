"use strict";
exports.id = 153;
exports.ids = [153];
exports.modules = {

/***/ 2153:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ InitiativeList)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9755);
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_use__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _graphql_client_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6457);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4505);








function InitiativeList({ campaign , style ="overlay" , forceShowMonsterNames =false  }) {
    const { hideMonsterNames , round , turn , turnStart  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useMemo)(()=>campaign?.activeEncounter ?? {
            hideMonsterNames: _graphql_client_types__WEBPACK_IMPORTED_MODULE_6__/* .HideMonsterNames.Always */ .NJ.Always,
            round: 0,
            turn: 0,
            turnStart: null
        }, [
        campaign
    ]);
    const combatants = (0,react__WEBPACK_IMPORTED_MODULE_4__.useMemo)(()=>{
        return campaign?.activeEncounter?.combatants.sort((a, b)=>a.turnOrder - b.turnOrder) ?? [];
    }, [
        campaign
    ]);
    const [turnDuration, setTurnDuration] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
    const [overTime, setOverTime] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    (0,react_use__WEBPACK_IMPORTED_MODULE_5__.useInterval)(()=>{
        if ((round > 0 || turn > 0) && turnStart) {
            const currentTime = new Date();
            const startTime = (0,_utils__WEBPACK_IMPORTED_MODULE_7__/* .parseDate */ .sG)(turnStart);
            setTurnDuration((0,_utils__WEBPACK_IMPORTED_MODULE_7__/* .formatTimeDuration */ .J_)(currentTime, (0,_utils__WEBPACK_IMPORTED_MODULE_7__/* .parseDate */ .sG)(turnStart), [
                "minutes",
                "seconds"
            ]));
            setOverTime(currentTime.getTime() - startTime.getTime() > 60 * 1000);
        } else if (turnDuration) {
            setTurnDuration(null);
            setOverTime(false);
        }
    }, 1000);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                    children: `${campaign?.name ?? "Campaign"} Initiative | OBS GM Overlay`
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Typography, {
                variant: "h5",
                sx: style === "overlay" ? {
                    marginLeft: 2,
                    marginRight: 2
                } : {
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingLeft: 4,
                    paddingRight: 4,
                    border: 0,
                    borderStyle: "solid",
                    borderTop: 2,
                    borderTopColor: "primary.light",
                    borderBottom: 1,
                    borderBottomColor: "grey.400"
                },
                children: [
                    round ? `Round ${round}` : "Combat Not Started",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Box, {
                        className: overTime ? "blink" : undefined,
                        sx: {
                            color: overTime ? "error.main" : "text.secondary",
                            display: "inline-flex"
                        },
                        children: turnDuration ? `(${turnDuration})` : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Box, {
                            sx: {
                                display: "inline-block",
                                width: 62
                            }
                        })
                    })
                ]
            }),
            style === "overlay" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                style: {
                    width: "100%",
                    padding: 0,
                    border: "none",
                    borderTop: "medium double #333",
                    color: "#333"
                }
            }),
            combatants.map((combatant, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Box, {
                    sx: style === "overlay" ? {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        height: 32
                    } : {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        height: 32,
                        marginTop: 2,
                        paddingBottom: 2,
                        border: 0,
                        borderBottom: 1,
                        borderStyle: "solid",
                        borderColor: "grey.400"
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Box, {
                            sx: {
                                width: 32,
                                display: "inline-block",
                                marginBottom: "-6px"
                            },
                            children: combatant.turnOrder === turn && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                                src: "/d20.png",
                                alt: "d20",
                                height: 32,
                                width: 32
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Box, {
                            sx: {
                                fontWeight: combatant.turnOrder === turn ? "bold" : undefined,
                                textDecoration: combatant.turnOrder === turn ? "underline" : undefined
                            },
                            children: forceShowMonsterNames ? combatant.name : function() {
                                switch(hideMonsterNames){
                                    case _graphql_client_types__WEBPACK_IMPORTED_MODULE_6__/* .HideMonsterNames.Always */ .NJ.Always:
                                        if (!combatant.public) return "???";
                                    case _graphql_client_types__WEBPACK_IMPORTED_MODULE_6__/* .HideMonsterNames.UntilTurn */ .NJ.UntilTurn:
                                        if (!combatant.public && turn < combatant.turnOrder && round <= 1) return "???";
                                    default:
                                        return combatant.name;
                                }
                            }()
                        })
                    ]
                }, `combatant_${i}_${combatant}`))
        ]
    });
}


/***/ })

};
;