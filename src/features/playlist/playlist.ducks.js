import update from 'immutability-helper';
import { createAction } from 'redux-actions';
import { fork, takeEvery, put } from 'redux-saga/effects';

import { createTypes, crudActions } from '../../common/reduxHelpers';
import { updateManyTracks } from '../track/track.ducks';

// Rename db methods so that they dont collide with actions
import {
  deletePlaylist as deletePlaylistDB,
  createPlaylist as createPlaylistDB,
  listPlaylistTracks as listPlaylistTracksDB,
  addTrackToPlaylist as addTrackToPlaylistDB,
} from '../../services/db';

// Action types
export const PLAYLIST = createTypes('PLAYLIST', [
  ...crudActions, 'INIT', 'SET_ACTIVE', 'ADD_TRACK',
]);

// Export actions
export const receivePlaylists = createAction(PLAYLIST.RECEIVE);
export const createPlaylist = createAction(PLAYLIST.CREATE);
export const deletePlaylist = createAction(PLAYLIST.DELETE);
export const updatePlaylist = createAction(PLAYLIST.UPDATE);
export const listPlaylists = createAction(PLAYLIST.LIST);
export const setActivePlaylist = createAction(PLAYLIST.SET_ACTIVE);
export const addTrackToPlaylist = createAction(PLAYLIST.ADD_TRACK);

// Reducers
const initialState = {
  playlistsById: {},
  activePlaylist: null,
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
  const tracks = activePlaylist.tracks.map(tId => track.tracksById[tId]);

  return tracks;
};
export const getNextTrack = ({ playlist, track }, playlistId, trackIndex) => {
  const currentPlaylist = playlist.playlistsById[playlistId];

  // For some reason the playlist doesnt exist...
  if (!currentPlaylist) return null;

  // Current track is the last one in playlist
  if (currentPlaylist.tracks.length - 1 < trackIndex + 1) return null;

  const nextTrackId = currentPlaylist.tracks[trackIndex + 1];
  return track.tracksById[nextTrackId];
}
export const getPrevTrack = ({ playlist, track }, playlistId, trackIndex) => {
  const currentPlaylist = playlist.playlistsById[playlistId];

  // For some reason the playlist doesnt exist...
  if (!currentPlaylist) return null;

  // Current track is the first one in playlist
  if (trackIndex === 0) return null;

  const prevTrackId = currentPlaylist.tracks[trackIndex - 1];
  return track.tracksById[prevTrackId];
}


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
    // Add track to playlist in db first
    yield addTrackToPlaylistDB(track, playlist._id);
  } catch (e) {
    console.debug('[addTrackSaga error]', e);
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

export function * playlistSagas() {
  yield fork(watchDelete);
  yield fork(watchCreate);
  yield fork(watchActivation);
  yield fork(watchAddTrack);
}