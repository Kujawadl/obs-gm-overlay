--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE NPC (
  id          INTEGER PRIMARY KEY,
  campaignId  INTEGER NOT NULL,
  name        TEXT    NOT NULL,
  public      BOOLEAN NOT NULL,
  initiative  REAL NOT NULL DEFAULT 0
);

CREATE INDEX NPC_ix_campaignId ON NPC (campaignId);

ALTER TABLE Player ADD COLUMN initiative REAL NOT NULL DEFAULT 0;

ALTER TABLE Campaign ADD COLUMN hideNpcNames    TEXT CHECK(hideNpcNames IN ('never', 'always', 'untilTurn')) NOT NULL DEFAULT 'never';
ALTER TABLE Campaign ADD COLUMN round           INTEGER NOT NULL DEFAULT 0;
ALTER TABLE Campaign ADD COLUMN initiativeCount REAL NOT NULL DEFAULT 0;

CREATE VIEW Combatant (
  campaignId,
  name,
  public,
  initiative
) AS SELECT
  campaignId,
  COALESCE(NULLIF(characterName, ''), playerName) AS name,
  1 AS public,
  initiative
FROM Player
WHERE isGM = 0 AND initiative > 0
UNION ALL SELECT
  campaignId,
  name,
  public,
  initiative
FROM NPC
WHERE initiative > 0;

CREATE VIEW Initiative (
  campaignId,
  round,
  initiativeCount,
  name,
  initiative
) AS SELECT
  Campaign.id,
  Campaign.round,
  Campaign.initiativeCount,
  IIF(
    (
      Campaign.hideNpcNames = 'never' OR
      Combatant.public OR (
        Campaign.hideNpcNames = 'untilTurn' AND 
        Campaign.round > 0 AND
        Campaign.initiativeCount <= Combatant.initiative
      )
    ),
    Combatant.name,
    '???'
  ),
  Combatant.initiative
FROM Campaign
LEFT JOIN Combatant ON Campaign.id = Combatant.campaignId;

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP VIEW Initiative;
DROP VIEW Combatant;

ALTER TABLE Campaign RENAME TO CampaignBackup;

ALTER TABLE Player RENAME TO PlayerBackup;

CREATE TABLE Campaign (
  id              INTEGER PRIMARY KEY,
  name            TEXT    NOT NULL,
  gmInspiration   BOOLEAN NOT NULL,
  cooldownType  TEXT CHECK(cooldownType IN ('none', 'player', 'table')) NOT NULL DEFAULT 'none',
  cooldownTime  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE Player (
  id            INTEGER PRIMARY KEY,
  campaignId    INTEGER NOT NULL,
  playerName    TEXT    NOT NULL,
  characterName TEXT,
  isGM          BOOLEAN NOT NULL DEFAULT FALSE,
  inspiration   INTEGER NOT NULL DEFAULT 0,
  lastInspirationUsed TEXT CHECK(lastInspirationUsed IS DATETIME(lastInspirationUsed)) DEFAULT NULL,
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

CREATE INDEX PLAYER_ix_campaignId ON Player (campaignId);

DROP INDEX NPC_ix_campaignId;

DROP TABLE NPC;
