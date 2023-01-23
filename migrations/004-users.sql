CREATE TABLE IF NOT EXISTS users
(
  id              UUID          NOT NULL,
  name            VARCHAR(255),
  email           VARCHAR(255),
  email_verified  TIMESTAMPTZ,
  image           VARCHAR(255),
  CONSTRAINT users_pkey         PRIMARY KEY (id),
  CONSTRAINT users_email_key    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS sessions
(
  id              UUID          NOT NULL,
  expires         TIMESTAMPTZ   NOT NULL,
  session_token   VARCHAR(255)  NOT NULL,
  user_id         UUID,
  CONSTRAINT sessions_pkey                PRIMARY KEY (id),
  CONSTRAINT sessions_session_token_key   UNIQUE (session_token),
  CONSTRAINT sessions_user_id_fkey        FOREIGN KEY (user_id)
    REFERENCES users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS verification_tokens
(
  token       VARCHAR(255)   NOT NULL,
  identifier  VARCHAR(255)   NOT NULL,
  expires     TIMESTAMPTZ    NOT NULL,
  CONSTRAINT verification_tokens_pkey PRIMARY KEY (token)
);

CREATE TABLE IF NOT EXISTS accounts
(
  id                    UUID          NOT NULL,
  type                  VARCHAR(255)  NOT NULL,
  provider              VARCHAR(255)  NOT NULL,
  provider_account_id   VARCHAR(255)  NOT NULL,
  refresh_token         VARCHAR(255),
  access_token          VARCHAR(255),
  expires_at            INTEGER,
  token_type            VARCHAR(255),
  scope                 VARCHAR(255),
  id_token              TEXT,
  session_state         VARCHAR(255),
  user_id UUID,
  CONSTRAINT accounts_pkey          PRIMARY KEY (id),
  CONSTRAINT accounts_user_id_fkey  FOREIGN KEY (user_id)
    REFERENCES users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO "users" (
  id,
  name,
  email,
  email_verified
) VALUES (
  uuid_generate_v4(),
  'Unassigned',
  'unassigned',
  (SELECT NOW())
);

ALTER TABLE "Campaign"
  ADD COLUMN "userId" UUID
  CONSTRAINT Campaign_fk_user
    REFERENCES "users" ("id")
    ON UPDATE CASCADE
    ON DELETE CASCADE;

UPDATE "Campaign" SET "userId" = (SELECT "id" FROM "users" LIMIT 1);

ALTER TABLE "Campaign" ALTER COLUMN "userId" SET NOT NULL;
