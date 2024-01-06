"use strict";
exports.id = 137;
exports.ids = [137];
exports.modules = {

/***/ 5137:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "vG": () => (/* reexport */ AccountModel),
  "Z4": () => (/* reexport */ CampaignModel),
  "wc": () => (/* reexport */ CombatantModel),
  "ZR": () => (/* reexport */ EncounterModel),
  "Sg": () => (/* reexport */ PlayerModel),
  "T_": () => (/* reexport */ UserModel)
});

;// CONCATENATED MODULE: ./src/graphql/models/account.ts
class AccountModel {
    constructor(sql){
        this.sql = sql;
    }
    async get(provider, providerAccountId) {
        const results = await this.sql`
			SELECT *
			FROM "accounts"
			WHERE
				"provider" = ${provider} AND
				"provider_account_id" = ${providerAccountId}
		`;
        return results[0];
    }
    async create(account) {
        const results = await this.sql`
			INSERT INTO "accounts" (
				"id",
				"user_id",
				"type",
				"provider",
				"provider_account_id",
				"refresh_token",
				"access_token",
				"expires_at",
				"token_type",
				"scope",
				"id_token",
				"session_state"
			) VALUES (
				uuid_generate_v4(),
				${account.userId},
				${account.type},
				${account.provider},
				${account.providerAccountId},
				${account.refresh_token ?? null},
				${account.access_token ?? null},
				${account.expires_at ?? null},
				${account.token_type ?? null},
				${account.scope ?? null},
				${account.id_token ?? null},
				${account.session_state ?? null}
			)
		`;
        return results[0];
    }
}

;// CONCATENATED MODULE: ./src/graphql/models/campaign.ts
class CampaignModel {
    constructor(sql, pubsub){
        this.sql = sql;
        this.pubsub = pubsub;
    }
    async get(id) {
        if (!id) {
            return Promise.resolve(undefined);
        }
        const results = await this.sql`SELECT * FROM "Campaign" WHERE "id" = ${id}`;
        return results[0];
    }
    async list(userId) {
        const results = await this.sql`
			SELECT *
			FROM "Campaign"
			WHERE "userId" = ${userId}
			ORDER BY "name"
		`;
        return results.length ? results : [];
    }
    async create(input, userId) {
        const results = await this.sql`
        INSERT INTO "Campaign" (
					"userId",
          "name",
          "gmInspiration",
					"cooldownType",
					"cooldownTime",
					"activeEncounter"
        ) VALUES (
					${userId},
					${input.name}, 
					${input.gmInspiration ?? false},
					${input.cooldownType ?? "none"},
					${input.cooldownTime ?? 0},
					${input.activeEncounter ?? null}
				) RETURNING *
      `;
        return results[0];
    }
    async update(campaign, input) {
        const results = await this.sql`
        UPDATE "Campaign"
        SET
          "name" = ${input.name ?? campaign.name},
          "gmInspiration" = ${input.gmInspiration ?? campaign.gmInspiration ?? false},
					"cooldownType" = ${input.cooldownType ?? campaign.cooldownType ?? "none"},
					"cooldownTime" = ${input.cooldownTime ?? campaign.cooldownTime ?? 0},
					"activeEncounter" = ${input.activeEncounter ?? null}
        WHERE "id" = ${campaign.id}
				RETURNING *
      `;
        return results[0];
    }
    async delete(id) {
        // TODO: Verify cascade
        await this.sql.begin(async (sql)=>{
            await sql`DELETE FROM "Combatant" WHERE "campaignId" = ${id}`;
            await sql`DELETE FROM "Encounter" WHERE "campaignId" = ${id}`;
            await sql`DELETE FROM "Player" WHERE "campaignId" = ${id}`;
            await sql`DELETE FROM "Campaign" WHERE "id" = ${id}`;
        });
        return true;
    }
    async publishSubscription(id) {
        const campaign = await this.get(id);
        this.pubsub.publish("CAMPAIGN_UPDATED", {
            campaign
        });
    }
}

;// CONCATENATED MODULE: ./src/graphql/models/combatant.ts
class CombatantModel {
    constructor(sql){
        this.sql = sql;
    }
    async get(id) {
        const results = await this.sql`SELECT * FROM "Combatant" WHERE "id" = ${id}`;
        return results[0];
    }
    async list(encounterId) {
        const results = await this.sql`
			SELECT *
			FROM "Combatant"
			WHERE "encounterId" = ${encounterId}
			ORDER BY "turnOrder", "name"
		`;
        return results?.length ? results : [];
    }
    async create(input) {
        const results = await this.sql`
			INSERT INTO "Combatant" (
				"campaignId",
				"encounterId",
				"playerId",
				"name",
				"public",
				"turnOrder"
			) VALUES (
				${input.campaignId},
				${input.encounterId},
				${input.playerId ?? null},
				${(input.name ?? "").trim()},
				${input.public ?? false},
				${input.turnOrder ?? 0}
			) RETURNING *
		`;
        return results[0];
    }
    async update(combatant, input) {
        const results = await this.sql`
			UPDATE "Combatant"
			SET
				"campaignId" = ${input.campaignId ?? combatant.campaignId},
				"encounterId" = ${input.encounterId ?? combatant.encounterId},
				"playerId" = ${input.playerId ?? combatant.playerId ?? null},
				"name" = ${(input.name ?? combatant.name ?? "").trim()},
				"public" = ${input.public ?? combatant.public ?? false},
				"turnOrder" = ${input.turnOrder ?? combatant.turnOrder ?? 0}
			WHERE "id" = ${combatant.id}
			RETURNING *
		`;
        return results[0];
    }
    async delete(id) {
        await this.sql`DELETE FROM "Combatant" WHERE "id" = ${id}`;
        return true;
    }
    async bulkUpdate(input) {
        return await this.sql.begin((sql)=>{
            return Promise.all(input.map((combatant)=>{
                if (!combatant.id) {
                    return sql`
							INSERT INTO "Combatant" (
								"campaignId",
								"encounterId",
								"playerId",
								"name",
								"public",
								"turnOrder"
							) VALUES (
								${combatant.campaignId},
								${combatant.encounterId},
								${combatant.playerId ?? null},
								${(combatant.name ?? "").trim()},
								${combatant.public ?? false},
								${combatant.turnOrder ?? 0}
							) RETURNING *
						`.then((results)=>results[0]);
                } else {
                    return sql`
							UPDATE "Combatant"
							SET
								"campaignId" = ${combatant.campaignId},
								"encounterId" = ${combatant.encounterId},
								"playerId" = ${combatant.playerId ?? null},
								"name" = ${(combatant.name ?? "").trim()},
								"public" = ${combatant.public ?? false},
								"turnOrder" = ${combatant.turnOrder ?? 0}
							WHERE "id" = ${combatant.id}
							RETURNING *
						`.then((results)=>results[0]);
                }
            }));
        });
    }
}

;// CONCATENATED MODULE: ./src/graphql/models/encounter.ts
class EncounterModel {
    constructor(sql){
        this.sql = sql;
    }
    async get(id) {
        const results = await this.sql`
			SELECT *
			FROM "Encounter"
			WHERE "id" = ${id}
		`;
        return results[0];
    }
    async list(campaignId) {
        const results = await this.sql`
			SELECT *
			FROM "Encounter"
			WHERE "campaignId" = ${campaignId}
			ORDER BY "name"
		`;
        return results?.length ? results : [];
    }
    async create(input) {
        const results = await this.sql`
			INSERT INTO "Encounter" (
				"campaignId",
				"name",
				"hideMonsterNames",
				"round",
				"turn",
				"turnStart"
			) VALUES (
				${input.campaignId},
				${input.name ?? "n/a"},
				${input.hideMonsterNames ?? "never"},
				${input.round ?? 0},
				${input.turn ?? 0},
				${input.turnStart ?? null}
			) RETURNING *
		`;
        return results[0];
    }
    async update(encounter, input) {
        const results = await this.sql`
			UPDATE "Encounter"
			SET
				"campaignId" = ${input.campaignId ?? encounter.campaignId},
				"name" = ${input.name ?? encounter.name ?? "n/a"},
				"hideMonsterNames" = ${input.hideMonsterNames ?? encounter.hideMonsterNames ?? "never"},
				"round" = ${input.round ?? encounter.round ?? 0},
				"turn" = ${input.turn ?? encounter.turn ?? 0},
				"turnStart" = ${input.turnStart ?? encounter.turnStart}
			WHERE "id" = ${encounter.id}
			RETURNING *
		`;
        return results[0];
    }
    async delete(id) {
        await this.sql`DELETE FROM "Encounter" WHERE "id" = ${id}`;
        return true;
    }
    async findNextTurn(encounterId, currentTurn, currentRound) {
        const [nextTurn] = await this.sql`
				SELECT
					"encounterId",
					MIN("turnOrder") turn
				FROM "Combatant"
				WHERE
					"encounterId" = ${encounterId} AND
					"turnOrder" > ${currentTurn}
				GROUP BY "encounterId"
			` ?? [];
        return nextTurn?.turn ? [
            nextTurn.turn,
            Math.max(currentRound, 1) || 1
        ] : [
            1,
            currentRound + 1
        ];
    }
    async findPrevTurn(encounterId, currentTurn, currentRound) {
        if (currentTurn === 0 && currentRound === 0) {
            return [
                currentTurn,
                currentRound
            ];
        }
        const [prevTurn] = await this.sql`
				SELECT
					"encounterId",
					MAX("turnOrder") turn
				FROM "Combatant"
				WHERE
					"encounterId" = ${encounterId} AND
					"turnOrder" < ${currentTurn}
				GROUP BY "encounterId"
			` ?? [];
        const [maxTurn] = await this.sql`
				SELECT
					"encounterId",
					MAX("turnOrder") turn
				FROM "Combatant"
				WHERE
					"encounterId" = ${encounterId}
				GROUP BY "encounterId"
			` ?? [];
        return prevTurn?.turn ? [
            prevTurn.turn,
            currentRound
        ] : currentRound === 1 ? [
            0,
            0
        ] : [
            maxTurn?.turn ?? 0,
            Math.max(currentRound - 1, 0)
        ];
    }
}

// EXTERNAL MODULE: ./src/utils/index.ts + 4 modules
var utils = __webpack_require__(2350);
;// CONCATENATED MODULE: ./src/graphql/models/player.ts

class PlayerModel {
    constructor(sql){
        this.sql = sql;
    }
    async get(id) {
        const results = await this.sql`
			SELECT *
			FROM "Player"
			WHERE "id" = ${id}
		`;
        return results[0];
    }
    async list(campaignId) {
        const results = await this.sql`
			SELECT *
			FROM "Player"
			WHERE "campaignId" = ${campaignId}
			ORDER BY "isGM" DESC, "playerName", "characterName"
		`;
        return results?.length ? results : [];
    }
    async create(input) {
        if (!input.campaignId) {
            throw new Error("Campaign ID is required to create a player");
        }
        const results = await this.sql`
			INSERT INTO "Player" (
				"campaignId",
				"playerName",
				"characterName",
				"isGM",
				"inspiration"
			) VALUES (
				${input.campaignId},
				${input.playerName ?? null},
				${input.characterName ?? null},
				${input.isGM ?? false},
				${input.inspiration ?? 0}
			) RETURNING *
		`;
        return results[0];
    }
    async update(player, input) {
        const result = await this.sql.begin(async (sql)=>{
            const results = await sql`
				UPDATE "Player"
				SET
					"campaignId" = ${input.campaignId ?? player.campaignId},
					"playerName" = ${input.playerName ?? player.playerName},
					"characterName" = ${input.characterName ?? player.characterName ?? null},
					"isGM" = ${input.isGM ?? player.isGM ?? false},
					"inspiration" = ${input.inspiration ?? player.inspiration ?? 0},
					"lastInspirationUsed" = ${typeof input.inspiration === "number" && input.inspiration < player.inspiration ? (0,utils/* formatDate */.p6)(new Date()) : player.lastInspirationUsed ?? null}
				WHERE "id" = ${player.id}
				RETURNING *
			`;
            if (input.characterName && player.characterName !== input.characterName) {
                await sql`
					UPDATE "Combatant"
					SET "name" = ${input.characterName}
					WHERE
						"campaignId" = ${input.campaignId ?? player.campaignId} AND
						"playerId" = ${player.id}
				`;
            }
            return results?.[0];
        });
        return result;
    }
    async delete(id) {
        await this.sql.begin(async (sql)=>{
            await sql`DELETE FROM "Combatant" WHERE "playerId" = ${id}`;
            await sql`DELETE FROM "Player" WHERE "id" = ${id}`;
        });
        return true;
    }
    async resetCooldown(id) {
        await this.sql`
			UPDATE "Player"
			SET "lastInspirationUsed" = NULL
			WHERE "id" = ${id}
		`;
        return true;
    }
}

;// CONCATENATED MODULE: ./src/graphql/models/user.ts
class UserModel {
    constructor(sql){
        this.sql = sql;
    }
    async get(email) {
        const results = await this.sql`
			SELECT *
			FROM "users"
			WHERE "email" = ${email}
		`;
        return results[0];
    }
}

;// CONCATENATED MODULE: ./src/graphql/models/index.ts








/***/ }),

/***/ 2350:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "p6": () => (/* reexport */ formatDate),
  "sG": () => (/* reexport */ formatDate_parseDate)
});

// UNUSED EXPORTS: formatTimeDuration, useCooldown, useDebouncedCallback

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
    return (0,external_date_fns_.formatISO)(value);
}
/**
 * Formats a datetime value from SQLite into a Date object
 */ function formatDate_parseDate(value) {
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
    const duration = intervalToDuration({
        start,
        end
    });
    return format(duration, {
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
    const cooldownExpiration = addMinutes(lastInspirationUsed, campaign.cooldownTime);
    const onCooldown = cooldownExpiration > new Date();
    const timeRemaining = onCooldown ? differenceInSeconds(cooldownExpiration, new Date()) : 0;
    return timeRemaining;
}
function useCooldown({ player , campaign  }) {
    const [cooldownTimeRemaining, setCooldownTimeRemaining] = useState(calculateCooldown({
        player,
        campaign
    }));
    useEffect(()=>{
        setCooldownTimeRemaining(calculateCooldown({
            player,
            campaign
        }));
    }, [
        player,
        campaign
    ]);
    useInterval(()=>{
        setCooldownTimeRemaining(calculateCooldown({
            player,
            campaign
        }));
    }, !campaign || campaign.cooldownType !== "none" ? 1000 : null);
    return {
        cooldownTimeRemaining,
        percentComplete: Math.round(cooldownTimeRemaining / ((campaign?.cooldownTime ?? 0) * 60) * 100),
        formattedDuration: formatDuration({
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
    const timeout = useRef();
    return useCallback((...args)=>{
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