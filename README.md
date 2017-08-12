<p align='center'>
  <img src="build-resources/icon.png" height="120"/>
<p/>

# SoundFusion

SoundFusion is a music player app that finds tracks from various sources to create personal playlists (YouTube and SoundCloud at the moment).

The idea for this app was born from the desire to learn [Electron](https://github.com/electron/electron) and build my first desktop app ever.

<p align='center'>
  <img src="media/screenshot_1.png" width="100%"/>
<p/>

---

## Usage

You can download the app directly:

**Mac OSX**: [zip](https://drive.google.com/file/d/0B8bjZk24z5UGU2YwRWpIX0tGcnc/view?usp=sharing) | [dmg](https://drive.google.com/file/d/0B8bjZk24z5UGeTVzSkI5YmRkZUE/view?usp=sharing)

**Windows**: TODO...

Or if you fancy more hands-on installation process then first clone this repo:
```
$ git clone git@github.com:Temzasse/soundfusion.git
```

Then install dependencies and package the app:
```
$ npm install
$ npm run pack
```

After [electron-builder](https://github.com/electron-userland/electron-builder) is ready you will find the app under *dist/mac/SoundFusion*.

## Development

Install dependencies:
```
$ npm install
```

Run app in dev mode:
```
$ npm run dev
```

And if you are on Windows:
```
$ npm run dev:win
```

## TODO
- Add more music sources (check out [Bandcamp](https://bandcamp.com/developer)).