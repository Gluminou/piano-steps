# Piano Steps

Piano practice app: shows which key and finger to press, note by note, for pieces from the lesson book.

Live at https://gluminou.github.io/piano-steps/

## How songs update

The songs live in `songs.json`. The app downloads it fresh every time it opens (and when you come back to it), so a shortcut on the phone's home screen picks up new songs by itself. `index.html` also keeps a built-in copy, used only when the phone is offline.

The header shows "My songs (N)". When a new song is added, that number goes up on the next open.

## Adding a song

1. Add the piece to the list between `/*SONGS-START` and `/*SONGS-END*/` in `index.html`.
2. Run `node build-songs.js` to rebuild `songs.json`. It also checks that every bar adds up to 4 beats.
3. Commit both files.

## Versions

The app shows its version number and date at the bottom, with a **Check for update** button and a **What's new** list. Release each change with:

```
node tools/release.mjs patch "What changed, in plain words"
```

`patch` for a fix, `minor` for something new on screen, `major` for a rework. The script keeps the page, `version.json` and `changelog.json` in step. The update section itself is `updates.js`, shared by all the apps.

## Sync between devices

`sync.js` (the same file in every Gluminou app) copies this app's data between devices through `data.json` in the private repo **Gluminou/piano-steps-data**: stars earned, tempo per piece, note names, step mode and the last piece opened. Each device connects once with a fine-grained GitHub key that has **Contents: Read and write** on that repo (**Read-only** gives view-only access). Paste the key in the **Sync between devices** section at the bottom of the page. On a computer the apps share one address, so a key entered in one app is offered to the others. Each app can still be disconnected on its own.

Changes from two devices are merged item by item. When both devices changed the same thing, the latest change wins. The repo history keeps every version.
