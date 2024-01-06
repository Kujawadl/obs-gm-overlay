"use strict";
exports.id = 505;
exports.ids = [505];
exports.modules = {

/***/ 4505:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "J_": () => (/* reexport */ formatTimeDuration),
  "sG": () => (/* reexport */ parseDate),
  "qI": () => (/* reexport */ useCooldown),
  "y1": () => (/* reexport */ useDebouncedCallback)
});

// UNUSED EXPORTS: formatDate

// EXTERNAL MODULE: external "date-fns"
var external_date_fns_ = __webpack_require__(4146);
;// CONCATENATED MODULE: ./src/utils/formatDate.ts

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
    return (0,external_date_fns_.parseISO)(value);
}

;// CONCATENATED MODULE: ./src/utils/formatTimeDuration.ts

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
        formatDistance: (token, count)=>formatDistanceLocale[token].replace("{{count}}", count?.toString().padStart(2, "0"))
    };
    const duration = (0,external_date_fns_.intervalToDuration)({
        start,
        end
    });
    return (0,external_date_fns_.formatDuration)(duration, {
        format: units,
        locale: shortEnLocale,
        delimiter: ":",
        zero: true
    }).replace(/^0(\d)/, "$1");
}

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-use"
var external_react_use_ = __webpack_require__(9755);
;// CONCATENATED MODULE: ./src/utils/useCooldown.tsx




function calculateCooldown({ player , campaign  }) {
    if (!player || !campaign || !campaign.gmInspiration && player.isGM || campaign.cooldownType === "none") {
        return 0;
    }
    const lastInspirationUsed = parseDate(campaign.cooldownType === "player" ? player.lastInspirationUsed : campaign.lastInspirationUsed);
    const cooldownExpiration = (0,external_date_fns_.addMinutes)(lastInspirationUsed, campaign.cooldownTime);
    const onCooldown = cooldownExpiration > new Date();
    const timeRemaining = onCooldown ? (0,external_date_fns_.differenceInSeconds)(cooldownExpiration, new Date()) : 0;
    return timeRemaining;
}
function useCooldown({ player , campaign  }) {
    const [cooldownTimeRemaining, setCooldownTimeRemaining] = (0,external_react_.useState)(calculateCooldown({
        player,
        campaign
    }));
    (0,external_react_.useEffect)(()=>{
        setCooldownTimeRemaining(calculateCooldown({
            player,
            campaign
        }));
    }, [
        player,
        campaign
    ]);
    (0,external_react_use_.useInterval)(()=>{
        setCooldownTimeRemaining(calculateCooldown({
            player,
            campaign
        }));
    }, !campaign || campaign.cooldownType !== "none" ? 1000 : null);
    return {
        cooldownTimeRemaining,
        percentComplete: Math.round(cooldownTimeRemaining / ((campaign?.cooldownTime ?? 0) * 60) * 100),
        formattedDuration: (0,external_date_fns_.formatDuration)({
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

;// CONCATENATED MODULE: ./src/utils/useDebouncedCallback.ts

/**
 * Returns a memoized function that will only call the passed function when it hasn't been called for the wait period
 * @param func The function to be called
 * @param wait Wait period after function hasn't been called for
 * @returns A memoized function that is debounced
 */ // eslint-disable-next-line unused-imports/no-unused-vars
function useDebouncedCallback(func, wait) {
    // Use a ref to store the timeout between renders
    // and prevent changes to it from causing re-renders
    const timeout = (0,external_react_.useRef)();
    return (0,external_react_.useCallback)((...args)=>{
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

;// CONCATENATED MODULE: ./src/utils/index.ts






/***/ })

};
;