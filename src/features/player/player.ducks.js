import update from 'immutability-helper';
import { createAction } from 'redux-actions';
import { fork, takeEvery, select } from 'redux-saga/effects';
import { createTypes } from '../../common/reduxHelpers';

// Action types
export const PLAYER = createTypes('PLAYER', [
  'PLAY', 'PAUSE', 'PREV_TRACK', 'NEXT_TRACK', 'SET_PLAYER',
  'SET_CURRENT_PLAYER',
]);

// Export actions
export const play = createAction(PLAYER.PLAY);
export const pause = createAction(PLAYER.PAUSE);
export const prevTrack = createAction(PLAYER.PREV_TRACK);
export const nextTrack = createAction(PLAYER.NEXT_TRACK);
export const setPlayer = createAction(PLAYER.SET_PLAYER);
export const setCurrentPlayer = createAction(PLAYER.SET_CURRENT_PLAYER);

// Reducers
const initialState = {
  currentTrack: null,
  currentPlayer: null,
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
  default: return state;
  }
}


// Selectors
export const getCurrentTrack = ({ player }) => player.currentTrack;
export const getPlayingStatus = ({ player }) => player.isPlaying;
export const getPlayerByName = (state, name) => state.player.players[name];
export const getCurrentPlayer = ({ player }) => {
  return player.players[player.currentPlayer];
};


// Sagas handlers
function * playSaga({ payload: track }) {
  try {
    console.log('[PLAY]', track);

    const player = yield select(getPlayerByName, track.type);
    console.debug('[player]', player);

    if (track.type === 'youtube') {
      player.loadVideoById({ videoId: track.id, suggestedQuality: 'small' });
      player.playVideo();
    } else if (track.type === 'soundcloud') {
      console.log('SOUNDCLOUD');
    } else if (track.type === 'spotify') {
      console.log('SPOTIFY');
    }
  } catch (e) {
    console.debug('[playSaga] error', e);
  }
  // play = () => {
  //   this.player.playVideo();
  // };

  // pause = () => {
  //   this.player.pauseVideo();
  // };

  // loadVideo = (videoId) => {
  //   this.player.loadVideoById({ videoId });
  // };
}

function * pauseSaga({ payload }) {
  yield console.log('PAUSE', payload);
}

function * nextTrackSaga({ payload }) {
  yield console.log('NEXT', payload);
}

function * prevTrackSaga({ payload }) {
  yield console.log('PREV', payload);
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

export function * playerSagas() {
  yield fork(watchPlay);
  yield fork(watchPause);
  yield fork(watchNextTrack);
  yield fork(watchPrevTrack);
}