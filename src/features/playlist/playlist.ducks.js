import update from 'immutability-helper';
import { createAction } from 'redux-actions';
import { fork, takeEvery, put } from 'redux-saga/effects';
import _ from 'lodash';

import { createTypes, crudActions } from '../../common/reduxHelpers';
import { updateManyTracks } from '../track/track.ducks';

// Rename db methods so that they dont collide with actions
import {
  deletePlaylist as deletePlaylistDB,
  createPlaylist as createPlaylistDB,
  listPlaylistTracks as listPlaylistTracksDB,
  addTrackToPlaylist as addTrackToPlaylistDB,
  removeTrackFromPlaylist as removeTrackFromPlaylistDB,
  renamePlaylist as renamePlaylistDB,
} from '../../services/db';

import { PLAYER } from '../player/player.ducks';

// Action types
export const PLAYLIST = createTypes('PLAYLIST', [
<<<<<<< HEAD
  ...crudActions, 'INIT', 'SET_ACTIVE', 'ADD_TRACK', 'REMOVE_TRACK',
  'RENAME',
=======
  ...crudActions, 'INIT', 'SET_ACTIVE', 'ADD_TRACK', 'TOGGLE_SHUFFLE',
  'ADD_SHUFFLED', 'RESET_SHUFFLED',
>>>>>>> Added initial shuffle implementation
]);

// Export actions
export const receivePlaylists = createAction(PLAYLIST.RECEIVE);
export const createPlaylist = createAction(PLAYLIST.CREATE);
export const deletePlaylist = createAction(PLAYLIST.DELETE);
export const updatePlaylist = createAction(PLAYLIST.UPDATE);
export const listPlaylists = createAction(PLAYLIST.LIST);
export const setActivePlaylist = createAction(PLAYLIST.SET_ACTIVE);
export const addTrackToPlaylist = createAction(PLAYLIST.ADD_TRACK);
<<<<<<< HEAD
export const removeTrackFromPlaylist = createAction(PLAYLIST.REMOVE_TRACK);
export const renamePlaylist = createAction(PLAYLIST.RENAME);
=======
export const toggleShuffle = createAction(PLAYLIST.TOGGLE_SHUFFLE);
export const addShuffledTrack = createAction(PLAYLIST.ADD_SHUFFLED);
export const resetShuffled = createAction(PLAYLIST.RESET_SHUFFLED);
>>>>>>> Added initial shuffle implementation

// Reducers
const initialState = {
  playlistsById: {},
  activePlaylist: null,
  shuffleEnabled: false,
  shuffledTracks: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case PLAYLIST.RECEIVE:
    return update(state, {
      playlistsById: { $merge: action.payload },
    });
  case PLAYLIST.DELETE:
    return update(state, {
      playlistsById: { $unset: [action.payload] },
      // Clear active playlist if it was the one deleted
      activePlaylist: {
        $set: state.activePlaylist === action.payload
          ? null
          : state.activePlaylist
      },
    });
  case PLAYLIST.UPDATE:
    return update(state, {
      playlistsById: { [action.payload._id]: { $set: action.payload } },
    });
  case PLAYLIST.SET_ACTIVE:
    return update(state, {
      activePlaylist: { $set: action.payload },
    });
  case PLAYLIST.ADD_TRACK:
    return update(state, {
      playlistsById: {
        [action.payload.playlist._id]: {
          tracks: { $push: [action.payload.track.id] },
        }
      },
    });
  case PLAYLIST.REMOVE_TRACK:
    return update(state, {
      playlistsById: {
        [action.payload.playlistId]: {
          tracks: { $apply: currentTracks =>
            currentTracks.filter(x => x !== action.payload.trackId)
          },
        }
      },
    });
  case PLAYLIST.RENAME: {
    const { id, name } = action.payload;
    const playlist = state.playlistsById[id];
    return update(state, {
      playlistsById: {
        [id]: { $set: { ...playlist, name } },
      },
    });
  }
  case PLAYLIST.TOGGLE_SHUFFLE:
    return update(state, {
      shuffleEnabled: { $set: !state.shuffleEnabled },
      shuffledTracks: { $set: state.shuffleEnabled
        ? [] // reset already shuffled tracks when shuffle is disabled
        : state.shuffledTracks,
      },
    });
  /*case PLAYER.SET_TRACK:
    return update(state, {
      shuffledTracks: { $set: action.payload.track
        ? [] // reset already shuffled tracks when shuffle is disabled
        : state.shuffledTracks,
      },
    });*/
  default: return state;
  }
}

// Helpers
const getRandomTrack = (allTracks, shuffledTracks) => {
  const tracksToPick = _.difference(allTracks, shuffledTracks);
  return tracksToPick[_.random(tracksToPick.length)];
};

// Selectors
export const getActivePlaylist = ({ playlist }) => {
  return playlist.playlistsById[playlist.activePlaylist];
};

export const getPlaylists = ({ playlist }) => {
  return Object.values(playlist.playlistsById);
};

export const getPlaylistTracks = ({ playlist, track }) => {
  if (!playlist.activePlaylist) return [];

  const activePlaylist = playlist.playlistsById[playlist.activePlaylist];
  const tracks = activePlaylist.tracks.map(tId => track.tracksById[tId]);

  return tracks;
};

export const getShuffleStatus = ({ playlist }) => playlist.shuffleEnabled;
export const getShuffledTracks = ({ playlist }) => playlist.shuffleEnabled;

export const getNextTrack = ({ playlist, track }, playlistId, trackIndex) => {
  const currentPlaylist = playlist.playlistsById[playlistId];
  const { shuffledTracks, shuffleEnabled } = playlist;

  // For some reason the playlist doesnt exist...
  if (!currentPlaylist) return null;

  // All tracks have been shuffled through
  if (
    shuffleEnabled &&
    shuffledTracks.length + 1 === currentPlaylist.tracks.length
  ) {
    return null;
  }

  // Current track is the last one in playlist
  if (
    !shuffleEnabled &&
    currentPlaylist.tracks.length - 1 < trackIndex + 1
  ) {
    return null;
  }

  let nextTrackId;

  // Handle shuffle
  if (shuffleEnabled) {
    nextTrackId = getRandomTrack(currentPlaylist.tracks, shuffledTracks);
  } else {
    nextTrackId = currentPlaylist.tracks[trackIndex + 1];
  }

  return track.tracksById[nextTrackId];
};

export const getPrevTrack = ({ playlist, track }, playlistId, trackIndex) => {
  const currentPlaylist = playlist.playlistsById[playlistId];

  // For some reason the playlist doesnt exist...
  if (!currentPlaylist) return null;

  // Current track is the first one in playlist
  if (trackIndex === 0) return null;

  const prevTrackId = currentPlaylist.tracks[trackIndex - 1];
  return track.tracksById[prevTrackId];
};


// Sagas handlers
function * deletePlaylistSaga({ payload: id }) {
  yield deletePlaylistDB(id);
}

function * createPlaylistSaga({ payload: name }) {
  const playlist = yield createPlaylistDB(name);
  yield put(updatePlaylist(playlist));
}

// When playlist is set active we want to get all it's tracks from db
function * setActiveSaga({ payload: id }) {
  const tracks = yield listPlaylistTracksDB(id);
  yield put(updateManyTracks(tracks));
}

function * addTrackSaga({ payload }) {
  try {
    const { playlist, track } = payload;
    yield addTrackToPlaylistDB(track, playlist._id);
  } catch (e) {
    console.debug('[addTrackSaga error]', e);
  }
}

function * removeTrackSaga({ payload }) {
  try {
    const { playlistId, trackId } = payload;
    yield removeTrackFromPlaylistDB(trackId, playlistId);
  } catch (e) {
    console.debug('[removeTrackSaga error]', e);
  }
}

function * renamePlaylistSaga({ payload }) {
  try {
    const { id, name } = payload;
    yield renamePlaylistDB(id, name);
  } catch (e) {
    console.debug('[renamePlaylistSaga error]', e);
  }
}

// Saga watchers
function * watchDelete() {
  yield takeEvery(PLAYLIST.DELETE, deletePlaylistSaga);
}
function * watchCreate() {
  yield takeEvery(PLAYLIST.CREATE, createPlaylistSaga);
}
function * watchActivation() {
  yield takeEvery(PLAYLIST.SET_ACTIVE, setActiveSaga);
}
function * watchAddTrack() {
  yield takeEvery(PLAYLIST.ADD_TRACK, addTrackSaga);
}
function * watchRemoveTrack() {
  yield takeEvery(PLAYLIST.REMOVE_TRACK, removeTrackSaga);
}
function * watchRenamePlaylist() {
  yield takeEvery(PLAYLIST.RENAME, renamePlaylistSaga);
}

export function * playlistSagas() {
  yield fork(watchDelete);
  yield fork(watchCreate);
  yield fork(watchActivation);
  yield fork(watchAddTrack);
  yield fork(watchRemoveTrack);
  yield fork(watchRenamePlaylist);
}