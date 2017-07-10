import update from 'immutability-helper';
import { createAction } from 'redux-actions';
// import { delay } from 'redux-saga';
import { fork, takeEvery, select } from 'redux-saga/effects';
import { createTypes } from '../../common/reduxHelpers';

// Action types
export const PLAYER = createTypes('PLAYER', [
  'PLAY', 'PAUSE', 'PREV_TRACK', 'NEXT_TRACK', 'SET_PLAYER', 'SET_TRACK',
  'SET_CURRENT_PLAYER', 'SET_TRACK_TIME',
]);

// Export actions
export const play = createAction(PLAYER.PLAY);
export const pause = createAction(PLAYER.PAUSE);
export const prevTrack = createAction(PLAYER.PREV_TRACK);
export const nextTrack = createAction(PLAYER.NEXT_TRACK);
export const setTrack = createAction(PLAYER.SET_TRACK);
export const setPlayer = createAction(PLAYER.SET_PLAYER);
export const setCurrentPlayer = createAction(PLAYER.SET_CURRENT_PLAYER);
export const setTrackTime = createAction(PLAYER.SET_TRACK_TIME);

// Reducers
const initialState = {
  currentTrack: null,
  isPlaying: false,
  players: {
    youtube: null,
    spotify: null,
    soundcloud: null,
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case PLAYER.SET_PLAYER:
    return update(state, {
      players: { [action.payload.name]: { $set: action.payload.player } },
    });
  case PLAYER.PLAY:
    return update(state, {
      isPlaying: { $set: !!state.currentTrack},
    });
  case PLAYER.SET_TRACK:
    return update(state, {
      currentTrack: { $set: action.payload },
      isPlaying: { $set: true },
    });
  case PLAYER.PAUSE:
    return update(state, {
      isPlaying: { $set: false },
    });
  default: return state;
  }
}


// Selectors
export const getCurrentTrack = ({ player }) => player.currentTrack;
export const getPlayingStatus = ({ player }) => player.isPlaying;
export const getPlayerByName = (state, name) => state.player.players[name];
export const getCurrentPlayer = ({ player }) => {
  if (!player.currentTrack) return null;
  return player.players[player.currentTrack.type];
}


// Sagas handlers
function * setTrackSaga({ payload: track }) {
  try {
    const player = yield select(getPlayerByName, track.type);

    if (track.type === 'youtube') {
      player.loadVideoById({ videoId: track.id, suggestedQuality: 'small' });
      player.playVideo();
    } else if (track.type === 'soundcloud') {
      // TODO: handle soundcloud
    } else if (track.type === 'spotify') {
      // TODO: handle spotify
    }
  } catch (e) {
    console.debug('[setTrackSaga] error', e);
  }
}

function * playSaga() {
  try {
    const currentTrack = yield select(getCurrentTrack);
    if (!currentTrack) return; // early exit

    const player = yield select(getPlayerByName, currentTrack.type);

    if (currentTrack.type === 'youtube') {
      player.playVideo();
    } else if (currentTrack.type === 'soundcloud') {
      // TODO: handle soundcloud
    } else if (currentTrack.type === 'spotify') {
      // TODO: handle spotify
    }
  } catch (e) {
    console.debug('[playSaga] error', e);
  }
}

function * pauseSaga() {
  try {
    const currentTrack = yield select(getCurrentTrack);
    if (!currentTrack) return; // early exit

    const player = yield select(getPlayerByName, currentTrack.type);

    if (currentTrack.type === 'youtube') {
      player.pauseVideo();
    } else if (currentTrack.type === 'soundcloud') {
      // TODO: handle soundcloud
    } else if (currentTrack.type === 'spotify') {
      // TODO: handle spotify
    }
  } catch (e) {
    console.debug('[pauseSaga] error', e);
  }
}

function * nextTrackSaga({ payload }) {
  yield console.log('NEXT', payload);
}

function * prevTrackSaga({ payload }) {
  yield console.log('PREV', payload);
}

function * setTrackTimeSaga({ payload: newTime }) {
  // yield delay(400);
  try {
    const currentTrack = yield select(getCurrentTrack);
    if (!currentTrack) return; // early exit

    const player = yield select(getPlayerByName, currentTrack.type);

    if (currentTrack.type === 'youtube') {
      player.seekTo(newTime);
    } else if (currentTrack.type === 'soundcloud') {
      // TODO: handle soundcloud
    } else if (currentTrack.type === 'spotify') {
      // TODO: handle spotify
    }
  } catch (e) {
    console.debug('[pauseSaga] error', e);
  }
}

// Saga watchers
function * watchPlay() {
  yield takeEvery(PLAYER.PLAY, playSaga);
}
function * watchPause() {
  yield takeEvery(PLAYER.PAUSE, pauseSaga);
}
function * watchNextTrack() {
  yield takeEvery(PLAYER.NEXT_TRACK, nextTrackSaga);
}
function * watchPrevTrack() {
  yield takeEvery(PLAYER.PREV_TRACK, prevTrackSaga);
}
function * watchSetTrack() {
  yield takeEvery(PLAYER.SET_TRACK, setTrackSaga);
}
function * watchSetTrackTime() {
  yield takeEvery(PLAYER.SET_TRACK_TIME, setTrackTimeSaga);
}

export function * playerSagas() {
  yield fork(watchPlay);
  yield fork(watchPause);
  yield fork(watchNextTrack);
  yield fork(watchPrevTrack);
  yield fork(watchSetTrack);
  yield fork(watchSetTrackTime);
}