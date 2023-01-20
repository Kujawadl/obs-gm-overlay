CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "Campaign" (
  "id"              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "name"            TEXT    NOT NULL,
  "gmInspiration"   BOOLEAN NOT NULL
);

CREATE TABLE "Player" (
  "id"            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "campaignId"    UUID NOT NULL,
  "playerName"    TEXT NOT NULL,
  "characterName" TEXT,
  "isGM"          BOOLEAN NOT NULL DEFAULT FALSE,
  "inspiration"   INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT Player_fk_campaignId
    FOREIGN KEY ("campaignId")
    REFERENCES "Campaign" ("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
