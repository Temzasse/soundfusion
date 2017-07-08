import update from 'immutability-helper';
import { createAction } from 'redux-actions';
import { fork, takeEvery, put } from 'redux-saga/effects';

import { createTypes, crudActions } from '../../common/reduxHelpers';
import { updateManyTracks } from '../track/track.ducks';
import {
  deletePlaylist as deletePlaylistDB,
  createPlaylist as createPlaylistDB,
  listPlaylistTracks as listPlaylistTracksDB,
} from '../../services/db';

// Action types
export const PLAYLIST = createTypes('PLAYLIST', [
  ...crudActions, 'INIT', 'SET_ACTIVE',
]);

// Export actions
export const initPlaylists = createAction(PLAYLIST.INIT);
export const createPlaylist = createAction(PLAYLIST.CREATE);
export const deletePlaylist = createAction(PLAYLIST.DELETE);
export const updatePlaylist = createAction(PLAYLIST.UPDATE);
export const listPlaylists = createAction(PLAYLIST.LIST);
export const setActivePlaylist = createAction(PLAYLIST.SET_ACTIVE);

// Reducers
const initialState = {
  playlistsById: {},
  activePlaylist: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case PLAYLIST.INIT:
    const playlistsByIdNew = {};

    action.payload.forEach(playlist => {
      playlistsByIdNew[playlist._id] = playlist;
    });

    return update(state, {
      playlistsById: { $set: playlistsByIdNew },
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
  default: return state;
  }
}

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
  const tracks = activePlaylist.tracks.map(({ _id }) => track.tracksById[_id]);

  return tracks;
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
  console.log('id', id);
  const tracks = yield listPlaylistTracksDB(id);
  yield put(updateManyTracks(tracks));
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

export function * playlistSagas() {
  yield fork(watchDelete);
  yield fork(watchCreate);
  yield fork(watchActivation);
}