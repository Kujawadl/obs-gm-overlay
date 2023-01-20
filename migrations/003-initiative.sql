CREATE TYPE "HideMonsterNamesOptions" AS ENUM('never', 'always', 'untilTurn');

CREATE TABLE "Encounter" (
  "id"                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "campaignId"        UUID NOT NULL,
  "name"              TEXT NOT NULL,
  "hideMonsterNames"  "HideMonsterNamesOptions" NOT NULL DEFAULT 'never',
  "round"             INTEGER DEFAULT 0,
  "turn"              INTEGER DEFAULT 0,
  "turnStart"         TIMESTAMPTZ DEFAULT NULL,
  CONSTRAINT Encounter_fk_campaignId
    FOREIGN KEY ("campaignId")
    REFERENCES "Campaign" ("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE "Combatant" (
  "id"          UUID DEFAULT uuid_generate_v4()  PRIMARY KEY,
  "campaignId"  UUID NOT NULL,
  "encounterId" UUID NOT NULL,
  "playerId"    UUID DEFAULT NULL,
  "name"        TEXT    NOT NULL,
  "public"      BOOLEAN NOT NULL,
  "turnOrder"   INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT Combatant_fk_campaignId
    FOREIGN KEY ("campaignId")
    REFERENCES "Campaign" ("id")
    ON UPDATE CASCADE 
    ON DELETE CASCADE,
  CONSTRAINT Combatant_fk_encounterId
    FOREIGN KEY ("encounterId")
    REFERENCES "Encounter" ("id")
    ON UPDATE CASCADE 
    ON DELETE CASCADE,
  CONSTRAINT Combatant_fk_playerId
    FOREIGN KEY ("playerId")
    REFERENCES "Player" ("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

ALTER TABLE "Campaign"
  ADD COLUMN "activeEncounter" UUID DEFAULT NULL
  CONSTRAINT Campaign_fk_activeEncounter
    REFERENCES "Encounter" ("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE;
