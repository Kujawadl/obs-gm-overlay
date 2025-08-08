export const initial = {
	name: "1-initial",
	sql: `CREATE TABLE IF NOT EXISTS "Campaign" (
	"id" TEXT PRIMARY KEY,
	"name" TEXT NOT NULL,
	"gmInspiration" BOOLEAN NOT NULL,
	"cooldownType" TEXT NOT NULL DEFAULT 'none',
	"cooldownTime" INTEGER NOT NULL DEFAULT 0,
	"activeEncounter" INTEGER DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "Player" (
	"id" TEXT PRIMARY KEY,
	"campaignId" TEXT NOT NULL,
	"playerName" TEXT NOT NULL,
	"characterName" TEXT,
	"isGM" BOOLEAN NOT NULL DEFAULT FALSE,
	"inspiration" INTEGER NOT NULL DEFAULT 0,
	"lastInspirationUsed" DATETIME DEFAULT NULL,
	CONSTRAINT Player_fk_campaignId FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Initiative tables
CREATE TABLE IF NOT EXISTS "Encounter" (
	"id" TEXT PRIMARY KEY,
	"campaignId" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"hideMonsterNames" TEXT NOT NULL DEFAULT 'never',
	"round" INTEGER DEFAULT 0,
	"turn" INTEGER DEFAULT 0,
	"turnStart" DATETIME DEFAULT NULL,
	CONSTRAINT Encounter_fk_campaignId FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Combatant" (
	"id" TEXT PRIMARY KEY,
	"campaignId" TEXT NOT NULL,
	"encounterId" TEXT NOT NULL,
	"playerId" TEXT DEFAULT NULL,
	"name" TEXT NOT NULL,
	"public" BOOLEAN NOT NULL,
	"turnOrder" INTEGER NOT NULL DEFAULT 0,
	CONSTRAINT Combatant_fk_campaignId FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT Combatant_fk_encounterId FOREIGN KEY ("encounterId") REFERENCES "Encounter" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT Combatant_fk_playerId FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);`,
};
