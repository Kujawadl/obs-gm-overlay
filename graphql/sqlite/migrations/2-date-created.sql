-- Backup original tables
CREATE TABLE "Campaign_backup" AS SELECT * FROM "Campaign";
CREATE TABLE "Player_backup" AS SELECT * FROM "Player";
CREATE TABLE "Encounter_backup" AS SELECT * FROM "Encounter";
CREATE TABLE "Combatant_backup" AS SELECT * FROM "Combatant";

-- Drop original tables
DROP TABLE "Combatant";
DROP TABLE "Encounter";
DROP TABLE "Player";
DROP TABLE "Campaign";


-- Recreate tables with the new column
CREATE TABLE "Campaign" (
	"id" TEXT PRIMARY KEY,
	"name" TEXT NOT NULL,
	"gmInspiration" BOOLEAN NOT NULL,
	"cooldownType" TEXT NOT NULL DEFAULT 'none',
	"cooldownTime" INTEGER NOT NULL DEFAULT 0,
	"activeEncounter" INTEGER DEFAULT NULL,
	"dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Player" (
	"id" TEXT PRIMARY KEY,
	"campaignId" TEXT NOT NULL,
	"playerName" TEXT NOT NULL,
	"characterName" TEXT,
	"isGM" BOOLEAN NOT NULL DEFAULT FALSE,
	"inspiration" INTEGER NOT NULL DEFAULT 0,
	"lastInspirationUsed" DATETIME DEFAULT NULL,
	"dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT Player_fk_campaignId FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "Encounter" (
	"id" TEXT PRIMARY KEY,
	"campaignId" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"hideMonsterNames" TEXT NOT NULL DEFAULT 'never',
	"round" INTEGER DEFAULT 0,
	"turn" INTEGER DEFAULT 0,
	"turnStart" DATETIME DEFAULT NULL,
	"dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT Encounter_fk_campaignId FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "Combatant" (
	"id" TEXT PRIMARY KEY,
	"campaignId" TEXT NOT NULL,
	"encounterId" TEXT NOT NULL,
	"playerId" TEXT DEFAULT NULL,
	"name" TEXT NOT NULL,
	"public" BOOLEAN NOT NULL,
	"turnOrder" INTEGER NOT NULL DEFAULT 0,
	"dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT Combatant_fk_campaignId FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT Combatant_fk_encounterId FOREIGN KEY ("encounterId") REFERENCES "Encounter" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT Combatant_fk_playerId FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Restore data (set dateCreated to CURRENT_TIMESTAMP for all rows)
INSERT INTO
	"Campaign" (
		id,
		name,
		"gmInspiration",
		"cooldownType",
		"cooldownTime",
		"activeEncounter"
	)
SELECT
	id,
	name,
	"gmInspiration",
	"cooldownType",
	"cooldownTime",
	"activeEncounter"
FROM
	"Campaign_backup";

INSERT INTO
	"Player" (
		id,
		"campaignId",
		"playerName",
		"characterName",
		"isGM",
		"inspiration",
		"lastInspirationUsed"
	)
SELECT
	id,
	"campaignId",
	"playerName",
	"characterName",
	"isGM",
	"inspiration",
	"lastInspirationUsed"
FROM
	"Player_backup";

INSERT INTO
	"Encounter" (
		id,
		"campaignId",
		"name",
		"hideMonsterNames",
		"round",
		"turn",
		"turnStart"
	)
SELECT
	id,
	"campaignId",
	"name",
	"hideMonsterNames",
	"round",
	"turn",
	"turnStart"
FROM
	"Encounter_backup";

INSERT INTO
	"Combatant" (
		id,
		"campaignId",
		"encounterId",
		"playerId",
		"name",
		"public",
		"turnOrder"
	)
SELECT
	id,
	"campaignId",
	"encounterId",
	"playerId",
	"name",
	"public",
	"turnOrder"
FROM
	"Combatant_backup";

-- Drop backup tables
DROP TABLE "Campaign_backup";
DROP TABLE "Player_backup";
DROP TABLE "Encounter_backup";
DROP TABLE "Combatant_backup";