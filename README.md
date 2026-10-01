# Krom FM v5

A kid's pretend radio station: Spotify songs, jingles, news and DJ talk in one running order.
Live at **https://arcuscapital.github.io/djraf4/**. Earlier versions stay live for comparison:
v4 at https://arcuscapital.github.io/djraf3/, v3 at https://arcuscapital.github.io/djraf2/,
v2 at https://arcuscapital.github.io/djraf/, and the original at
https://arcuscapital.github.io/raf-radio-station/.

v5 = v4 plus an end-of-show celebration (`src/celebrate.ts`, `src/trophies.ts`): every finished
show is a dance party, showing "n/5" and the gold records won; after five dance parties the next
finished show wins a gold record. About 6 seconds, ✕ closes it early, same look as the opening.

## How it avoids repeated songs
Each "Play N Songs" block hands Spotify an exact list of tracks (`PUT /me/player/play {uris}`).
Spotify plays them back to back and stops by itself after the last one — no playlist, no repeat
mode, nothing to race. `src/runWatch.ts` notices the stop and the show moves on.

## Setup (once)
- Spotify developer dashboard → the Krom FM app → Redirect URIs → add `https://arcuscapital.github.io/djraf4/`.
- Spotify Premium is required for playback control.

## Develop
```
npm install
npm run dev     # http://localhost:5066/djraf4/
npm test
npm run build
```
Every push to `main` builds, tests and deploys via GitHub Actions. Built files get unique names and
`version.json` lets an open copy of the app reload itself when a newer build is live.
