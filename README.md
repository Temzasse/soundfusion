<p align='center'>
  <img src="assets/icon.png" height="120"/>
<p/>

# SoundFusion

SoundFusion is a music player app that finds tracks from various sources to create personal playlists (YouTube and SoundCloud at the moment).

<p align='center'>
  <img src="media/screenshot_1.png" width="100%"/>
<p/>

The idea for this app was born from the desire to learn [Electron](https://github.com/electron/electron) and build my first desktop app ever.

---

## Usage

You can download the app directly:

**Mac OSX**: [zip](https://s3.eu-central-1.amazonaws.com/soundfusion/SoundFusion-1.0.0-mac.zip) | [dmg](https://s3.eu-central-1.amazonaws.com/soundfusion/SoundFusion-1.0.0.dmg)

**Windows**: TODO...

Or if you fancy a more hands-on installation process then first clone this repo:
```
$ git clone git@github.com:Temzasse/soundfusion.git
```

Then install dependencies:
```
$ npm install
```

Next, in order for the app to work it needs API keys for [YouTube](https://developers.google.com/youtube/v3/getting-started) and [SoundCloud](https://developers.soundcloud.com/).
Unfortunately at the moment SoundCloud doesn't issue any new API keys so you're better of downloading the app directly (check links above).

If you happen to have both of the API keys required you need to copy the `config-template.js` to `config.js` under *src* and put you keys there.

Finally, you can package the app:
```
$ npm run pack
```

After [electron-builder](https://github.com/electron-userland/electron-builder) is ready you will find the app under *dist* folder.

>**Disclaimer:** YouTube doesn't allow using videos as music without showing the actual video. I might try to add the video element somewhere but at the moment this is purely a personal project for learning Electron and I feel that things are fine as they are.

## Development

Install dependencies:
```
$ npm install
```

Copy `src/config-template.js` as `src/config.js` and fill in your API keys as described above.

Run app in dev mode:
```
$ npm run dev
```

And if you are on Windows:
```
$ npm run dev:win
```

**NOTE:** the app will most likely crash without valid API keys...

## TODO

### Fixes

- Allow using only one of the sources if some of the API keys are missing / invalid.
- App should not crash if one of the sources does not work.

### Features

- Shuffle.
- Volume control.
- Add more music sources (check out [Bandcamp](https://bandcamp.com/developer)).
- Feature suggestions are more than welcome :)
