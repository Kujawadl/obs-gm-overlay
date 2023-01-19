--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Encounter (
  id                INTEGER PRIMARY KEY,
  campaignId        INTEGER NOT NULL,
  name              TEXT    NOT NULL,
  hideMonsterNames  TEXT CHECK(hideMonsterNames IN ('never', 'always', 'untilTurn')) NOT NULL DEFAULT 'never',
  round             INTEGER DEFAULT 0,
  turn              INTEGER DEFAULT 0,
  turnStart         TEXT CHECK(turnStart IS DATETIME(turnStart)) DEFAULT NULL
);

CREATE INDEX Encounter_ix_campaignId ON Encounter (campaignId);

ALTER TABLE Campaign RENAME TO CampaignBackup;

ALTER TABLE Player RENAME TO PlayerBackup;

CREATE TABLE Campaign (
  id              INTEGER PRIMARY KEY,
  name            TEXT    NOT NULL,
  gmInspiration   BOOLEAN NOT NULL,
  cooldownType    TEXT CHECK(cooldownType IN ('none', 'player', 'table')) NOT NULL DEFAULT 'none',
  cooldownTime    INTEGER NOT NULL DEFAULT 0,
  activeEncounter INTEGER DEFAULT NULL,
  CONSTRAINT Campaign_fk_activeEncounter
    FOREIGN KEY (activeEncounter)
    REFERENCES Encounter (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE Player (
  id                  INTEGER PRIMARY KEY,
  campaignId          INTEGER NOT NULL,
  playerName          TEXT    NOT NULL,
  characterName       TEXT,
  isGM                BOOLEAN NOT NULL DEFAULT FALSE,
  inspiration         INTEGER NOT NULL DEFAULT 0,
  lastInspirationUsed TEXT CHECK(lastInspirationUsed IS DATETIME(lastInspirationUsed)) DEFAULT NULL,
  CONSTRAINT Player_fk_campaignId FOREIGN KEY (campaignId)
    REFERENCES Campaign (id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO Campaign (id, name, gmInspiration, cooldownType, cooldownTime)
SELECT id, name, gmInspiration, cooldownType, cooldownTime
FROM CampaignBackup;

INSERT INTO Player (id, campaignId, playerName, characterName, isGM, inspiration)
SELECT id, campaignId, playerName, characterName, isGM, inspiration
FROM PlayerBackup;

DROP TABLE CampaignBackup;

DROP TABLE PlayerBackup;

CREATE INDEX Player_ix_campaignId ON Player (campaignId);

CREATE TABLE Combatant (
  id          INTEGER PRIMARY KEY,
  campaignId  INTEGER NOT NULL,
  encounterId INTEGER NOT NULL,
  playerId    INTEGER DEFAULT NULL,
  name        TEXT    NOT NULL,
  public      BOOLEAN NOT NULL,
  turnOrder   INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT Combatant_fk_campaignId
    FOREIGN KEY (campaignId)
    REFERENCES Campaign (id)
    ON UPDATE CASCADE 
    ON DELETE CASCADE,
  CONSTRAINT Combatant_fk_encounterId
    FOREIGN KEY (encounterId)
    REFERENCES Encounter (id)
    ON UPDATE CASCADE 
    ON DELETE CASCADE,
  CONSTRAINT Combatant_fk_playerId
    FOREIGN KEY (playerId)
    REFERENCES Player (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE INDEX Combatant_ix_campaignId ON Combatant (campaignId);
CREATE INDEX Combatant_ix_encounter ON Combatant (encounterId);
CREATE INDEX Combatant_ix_playerId ON Combatant (playerId);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

-- TODO: Write the down migration script
