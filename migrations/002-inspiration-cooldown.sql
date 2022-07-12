--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

ALTER TABLE Campaign ADD COLUMN cooldownType  TEXT CHECK(cooldownType IN ('none', 'player', 'table')) NOT NULL DEFAULT 'none';
ALTER TABLE Campaign ADD COLUMN cooldownTime   INTEGER NOT NULL DEFAULT 0;

ALTER TABLE Player ADD COLUMN lastInspirationUsed TEXT CHECK(lastInspirationUsed IS DATETIME(lastInspirationUsed)) DEFAULT NULL;

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

ALTER TABLE Campaign RENAME TO CampaignBackup;

ALTER TABLE Player RENAME TO PlayerBackup;

CREATE TABLE Campaign (
  id              INTEGER PRIMARY KEY,
  name            TEXT    NOT NULL,
  gmInspiration   BOOLEAN NOT NULL
);

CREATE TABLE Player (
  id            INTEGER PRIMARY KEY,
  campaignId    INTEGER NOT NULL,
  playerName    TEXT    NOT NULL,
  characterName TEXT,
  isGM          BOOLEAN NOT NULL DEFAULT FALSE,
  inspiration   INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT Player_fk_campaignId FOREIGN KEY (campaignId)
    REFERENCES Campaign (id) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO Campaign (id, name, gmInspiration)
SELECT id, name, gmInspiration
FROM CampaignBackup;

INSERT INTO Player (id, campaignId, playerName, characterName, isGM, inspiration)
SELECT id, campaignId, playerName, characterName, isGM, inspiration
FROM PlayerBackup;

DROP TABLE CampaignBackup;

DROP TABLE PlayerBackup;

CREATE INDEX Player_ix_campaignId ON Player (campaignId);
