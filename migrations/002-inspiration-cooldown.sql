CREATE TYPE "CooldownTypes" AS ENUM('none', 'player', 'table');

ALTER TABLE "Campaign" ADD COLUMN "cooldownType"  "CooldownTypes" NOT NULL DEFAULT 'none';
ALTER TABLE "Campaign" ADD COLUMN "cooldownTime"  INTEGER         NOT NULL DEFAULT 0;

ALTER TABLE "Player"   ADD COLUMN "lastInspirationUsed" TIMESTAMPTZ DEFAULT NULL;
