--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

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

CREATE INDEX Player_ix_campaignId ON Player (campaignId);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX Player_ix_campaignId;
DROP TABLE Player;
DROP TABLE Campaign;