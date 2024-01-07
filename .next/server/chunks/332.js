"use strict";
exports.id = 332;
exports.ids = [332];
exports.modules = {

/***/ 8742:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ parseDate)
/* harmony export */ });
/* unused harmony export formatDate */
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8248);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([date_fns__WEBPACK_IMPORTED_MODULE_0__]);
date_fns__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/**
 * Formats a datetime value for SQLite use
 * @returns A date formatted as "YYYY-MM-DD HH:MM:SS"
 */ function formatDate(value) {
    if (!value) {
        value = new Date();
    } else if (typeof value === "string") {
        value = new Date(value);
    }
    return formatISO(value);
}
/**
 * Formats a datetime value from SQLite into a Date object
 */ function parseDate(value) {
    return value instanceof Date ? value : (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.parseISO)(value);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4566:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ formatTimeDuration)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8248);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([date_fns__WEBPACK_IMPORTED_MODULE_0__]);
date_fns__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

function formatTimeDuration(start, end, units = [
    "hours",
    "minutes",
    "seconds"
]) {
    const formatDistanceLocale = {
        xSeconds: "{{count}}",
        xMinutes: "{{count}}",
        xHours: "{{count}}"
    };
    const shortEnLocale = {
        formatDistance: (token, count)=>formatDistanceLocale[token]?.replace("{{count}}", count?.toString().padStart(2, "0")) ?? ""
    };
    const duration = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.intervalToDuration)({
        start,
        end
    });
    return (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.formatDuration)(duration, {
        format: units,
        locale: shortEnLocale,
        delimiter: ":",
        zero: true
    }).replace(/^0(\d)/, "$1");
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5332:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J_": () => (/* reexport safe */ _formatTimeDuration__WEBPACK_IMPORTED_MODULE_1__.J),
/* harmony export */   "qI": () => (/* reexport safe */ _useCooldown__WEBPACK_IMPORTED_MODULE_2__.q),
/* harmony export */   "sG": () => (/* reexport safe */ _formatDate__WEBPACK_IMPORTED_MODULE_0__.s),
/* harmony export */   "y1": () => (/* reexport safe */ _useDebouncedCallback__WEBPACK_IMPORTED_MODULE_3__.y)
/* harmony export */ });
/* harmony import */ var _formatDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8742);
/* harmony import */ var _formatTimeDuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4566);
/* harmony import */ var _useCooldown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9643);
/* harmony import */ var _useDebouncedCallback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8592);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_formatDate__WEBPACK_IMPORTED_MODULE_0__, _formatTimeDuration__WEBPACK_IMPORTED_MODULE_1__, _useCooldown__WEBPACK_IMPORTED_MODULE_2__]);
([_formatDate__WEBPACK_IMPORTED_MODULE_0__, _formatTimeDuration__WEBPACK_IMPORTED_MODULE_1__, _useCooldown__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9643:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ useCooldown)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9755);
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_use__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8248);
/* harmony import */ var _formatDate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8742);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([date_fns__WEBPACK_IMPORTED_MODULE_2__, _formatDate__WEBPACK_IMPORTED_MODULE_3__]);
([date_fns__WEBPACK_IMPORTED_MODULE_2__, _formatDate__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




function calculateCooldown({ player , campaign  }) {
    if (!player || !campaign || !campaign.gmInspiration && player.isGM || campaign.cooldownType === "none") {
        return 0;
    }
    const lastInspirationUsed = (0,_formatDate__WEBPACK_IMPORTED_MODULE_3__/* .parseDate */ .s)(campaign.cooldownType === "player" ? player.lastInspirationUsed : campaign.lastInspirationUsed);
    const cooldownExpiration = (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.addMinutes)(lastInspirationUsed, campaign.cooldownTime);
    const onCooldown = cooldownExpiration > new Date();
    const timeRemaining = onCooldown ? (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.differenceInSeconds)(cooldownExpiration, new Date()) : 0;
    return timeRemaining;
}
function useCooldown({ player , campaign  }) {
    const [cooldownTimeRemaining, setCooldownTimeRemaining] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(calculateCooldown({
        player,
        campaign
    }));
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        setCooldownTimeRemaining(calculateCooldown({
            player,
            campaign
        }));
    }, [
        player,
        campaign
    ]);
    (0,react_use__WEBPACK_IMPORTED_MODULE_1__.useInterval)(()=>{
        setCooldownTimeRemaining(calculateCooldown({
            player,
            campaign
        }));
    }, !campaign || campaign.cooldownType !== "none" ? 1000 : null);
    return {
        cooldownTimeRemaining,
        percentComplete: Math.round(cooldownTimeRemaining / ((campaign?.cooldownTime ?? 0) * 60) * 100),
        formattedDuration: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.formatDuration)({
            hours: Math.trunc(cooldownTimeRemaining / 60 / 60),
            minutes: Math.trunc(cooldownTimeRemaining / 60 % 60),
            seconds: Math.trunc(cooldownTimeRemaining % 60)
        }, {
            format: [
                "hours",
                "minutes",
                "seconds"
            ]
        })
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8592:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ useDebouncedCallback)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Returns a memoized function that will only call the passed function when it hasn't been called for the wait period
 * @param func The function to be called
 * @param wait Wait period after function hasn't been called for
 * @returns A memoized function that is debounced
 */ // eslint-disable-next-line unused-imports/no-unused-vars
function useDebouncedCallback(func, wait) {
    // Use a ref to store the timeout between renders
    // and prevent changes to it from causing re-renders
    const timeout = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((...args)=>{
        const later = ()=>{
            clearTimeout(timeout.current);
            func(...args);
        };
        clearTimeout(timeout.current);
        timeout.current = window.setTimeout(later, wait);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        func,
        wait
    ]);
}


/***/ })

};
;