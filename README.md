# OBS GM Overlay

A simple web application, designed to be run locally by a GM in-session, which
generates some simple OBS overlays to impose over your Discord camera.

Designed to help GMs present information to the players to avoid the inevitable
questions of "when is my turn" or "do I have inspiration?"

## Running the local database

For local development you must spin up a local PostgreSQL instance. The easiest
way to achieve this is using Docker:

```sh
# To install the postgres image
docker pull postgres

# Spins up a postgres container, persisting data to the local-db folder in this
# repository. Remember to change the password on first login!
npm run db-up

# To tear down the local instance (does not delete the data)
npm run db-down

# To delete the data and start fresh (permanent!)
rm -rf ./local-db

# To run DB migrations (requires .env.local file to be configured)
npm run migrate
```

## To Do

### MVP

- [x] Initial web app config
- [x] Initial server app config
- [x] Initial database config
- [x] Configure Campaign types/queries/mutations
- [x] Configure Player types/queries/mutations
- [x] Enable subscription support/add campaign subscription
- [x] Campaigns Page
  - [x] List campaigns
- [x] Campaign Editor
  - [x] Query and show campaign data
  - [x] Allow editing campaign data
  - [x] Allow adding campaign
  - [x] Allow deleting campaign
  - [x] List player data
  - [x] Allow updating player inspiration count
  - [x] Allow editing player data
  - [x] Allow adding player
  - [x] Allow deleting player
- [x] Campaign Overlay
  - [x] Query/display player data
  - [x] Update player data on update using subscription
  - [x] Style player data suitable for OBS overlay
- [ ] Inspiration Tracker
  - [ ] Allow GM to disable multiple-inspiration (i.e. inspiration is either on or off)
  - [ ] Allow GM to configure max. inspiration value
- [x] Inspiration Cooldown
  - [x] Track last inspiration consumption time
  - [x] Limit consumption of inspiration by a configurable cooldown window
  - [x] Allow GM to specify a cooldown time in minutes
  - [x] Allow GM to specify whether cooldown is per player or for the entire group
  - [x] Allow GM to reset cooldown for specific players
  - [ ] Allow GM to reset cooldown for entire table
- [ ] Initiative Tracker
  - [x] Allow GM to add combatants with public/private names
  - [x] Allow GM to set combatant initiative order
  - [x] Allow GM to add multiple encounters, each with its own initiative tracking, and set one as active
  - [x] Allow GM to unset active encounter (leaving encounter in list, but just making not active at this time)
  - [x] Allow GM to reset encounter initiative (set round/turn back to 0/0)
  - [x] Allow GM to advance initiative forward/backward by one turn
  - [x] Create initiative overlay that tracks whose turn it is/how many rounds have passed
  - [ ] Allow GM to specify cooldown duration in rounds
- [ ] Hardening
  - [x] Automatic GQL type generation
    - [x] Use generated types in web
    - [x] Use generated types in server (requires custom mappers)
  - [x] Better eslint/prettier/typecheck/build config
  - [x] Lint/format pre-commit hook
  - [ ] General refactor pass to get components standardized/DRY/split to enforce separation of concerns
  - [x] Generate and run production server builds
  - [x] Explore possibility of integrating server app into next.js API routing
    - [x] Auto-initialize WS server on server startup (currently have to run an HTTP request to initialize it first)
    - [x] Fix hot-reloading of server modules
  - [x] Switch to another DB implementation (sqlite is not cutting it, migrations are a nightmare)
    - [x] Change all IDs to no longer be incremental (e.g. GUIDs generated at resource creation)
  - [ ] Host app on Vercel (free for hobbyists)
    - [ ] Host DB on a live server
  - [ ] Add user accounts (SSO, don't want to deal with auth)
    - [ ] Restrict account creation to unique invite links (fewer users = more likely to stay in free tiers)
    - [ ] Link campaigns to users so each user gets their own private campaigns list
    - [ ] Secure all edit access to the user who owns that campaign
    - [ ] Overlays are readonly and always public
