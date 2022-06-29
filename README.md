# OBS GM Overlay

A simple web application, designed to be run locally by a GM in-session, which
generates some simple OBS overlays to impose over your Discord camera.

Designed to help GMs present information to the players to avoid the inevitable
questions of "when is my turn" or "how much inspiration do I have?"

NOT designed in ANY way to be used in a production system. I have zero interest
in adding support for user accounts/authentication/production databases/CI-CD
pipelines, etc. I already do this 40 hours a week at work, and it's my least
favorite part of software development. This is just meant to be a
quick-and-dirty solution to a minor annoyance I've had for a while.

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
- [ ] Hardening
  - [ ] Stricter eslint rules/pre-commit hook
  - [ ] Automatic GQL type generation
  - [ ] General refactor pass to get components standardized/DRY/split to enforce separation of concerns
  - [ ] Explore possibility of integrating server app into next.js API routing

### Possible Additional Features

- [ ] Initiative Tracker
  - [ ] Allow GM to add creatures with public/private names
  - [ ] Allow GM to enter player/creature initiative values
  - [ ] Allow GM to reset initiative, clearing initiative values and deleting all creatures
  - [ ] Allow GM to advance initiative by one turn
  - [ ] Create initiative overlay that tracks whose turn it is/how many rounds have passed
- [ ] Inspiration Cooldown:
  - [ ] Track last inspiration consumption time
  - [ ] Limit consumption of inspiration by a configurable cooldown window
    - [ ] Allow GM to specify a cooldown time in minutes (or rounds, if initiative tracker is live)
    - [ ] Allow GM to specify whether cooldown is per player or for the entire group
