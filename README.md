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
