import update from 'immutability-helper';
import { createAction } from 'redux-actions';
import { fork, takeEvery, put } from 'redux-saga/effects';

import { createTypes, crudActions } from '../../common/reduxHelpers';
import {
  deletePlaylist as deletePlaylistDB,
  createPlaylist as createPlaylistDB
} from '../../init/db';

// Action types
export const PLAYLIST = createTypes('PLAYLIST', [
  ...crudActions, 'INIT',
]);

// Export actions
export const initPlaylists = createAction(PLAYLIST.INIT);
export const createPlaylist = createAction(PLAYLIST.CREATE);
export const deletePlaylist = createAction(PLAYLIST.DELETE);
export const updatePlaylist = createAction(PLAYLIST.UPDATE);
export const listPlaylists = createAction(PLAYLIST.LIST);

// Reducers
const initialState = {
  playlistsById: {},
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
    });
  case PLAYLIST.UPDATE:
    return update(state, {
      playlistsById: { [action.payload._id]: { $set: action.payload } },
    });
  default: return state;
  }
}

// Selectors
export const getPlaylists = state => {
  return Object.values(state.playlist.playlistsById);
};


// Sagas handlers
function * deletePlaylistSaga({ payload: id }) {
  yield deletePlaylistDB(id);
}
function * createPlaylistSaga({ payload: name }) {
  const playlist = yield createPlaylistDB(name);
  yield put(updatePlaylist(playlist));
}

// Saga watchers
function * watchDelete() {
  yield takeEvery(PLAYLIST.DELETE, deletePlaylistSaga);
}
function * watchCreate() {
  yield takeEvery(PLAYLIST.CREATE, createPlaylistSaga);
}

export function * playlistSagas() {
  yield fork(watchDelete);
  yield fork(watchCreate);
}