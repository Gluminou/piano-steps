# Piano Steps

Piano practice app: shows which key and finger to press, note by note, for pieces from the lesson book.

Live at https://gluminou.github.io/piano-steps/

## Where the songs are

Not in this public repo. The songs live in the private repo **Gluminou/piano-steps-data**, in `songs.src.js`, and the app gets them through `sync.js` once the device is connected with a key. Without a key it shows only the key screen. When a song is added, connected devices reload with it by themselves. The header shows "My songs (N)".

## Adding a song

In the private repo (adjust the path to this repo):

1. Add the piece to the list between `/*SONGS-START*/` and `/*SONGS-END*/` in `songs.src.js`.
2. `node ../piano-steps/build-songs.js songs.src.js songs.json` rebuilds `songs.json` and checks that every bar adds up to 4 beats.
3. `node ../piano-steps/tools/content.mjs put songs.json data.json piano-songs`, then commit and push the private repo.

## Versions

The app shows its version number and date at the bottom, with a **Check for update** button and a **What's new** list. Release each change with:

```
node tools/release.mjs patch "What changed, in plain words"
```

`patch` for a fix, `minor` for something new on screen, `major` for a rework. The script keeps the page, `version.json` and `changelog.json` in step. The update section itself is `updates.js`, shared by all the apps.

## Sync between devices

`sync.js` (the same file in every Gluminou app) copies this app's data between devices through `data.json` in the private repo **Gluminou/piano-steps-data**: stars earned, tempo per piece, note names, step mode and the last piece opened. Each device connects once with a fine-grained GitHub key that has **Contents: Read and write** on that repo (**Read-only** gives view-only access). Paste the key in the **Sync between devices** section at the bottom of the page. On a computer the apps share one address, so a key entered in one app is offered to the others. Each app can still be disconnected on its own.

Changes from two devices are merged item by item. When both devices changed the same thing, the latest change wins. The repo history keeps every version.
