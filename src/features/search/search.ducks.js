import update from 'immutability-helper';
import { createAction } from 'redux-actions';
import { delay } from 'redux-saga';
import { fork, takeLatest, put } from 'redux-saga/effects';
import { createTypes, crudActions } from '../../common/reduxHelpers';
import searchTracks from '../../services/search';

// import {
//   deletePlaylist as deletePlaylistDB,
//   createPlaylist as createPlaylistDB,
//   listPlaylistTracks as listPlaylistTracksDB,
// } from '../../services/db';

// Action types
export const SEARCH = createTypes('SEARCH', [
  ...crudActions, 'UPDATE_TERM', 'SET_SEARCHING',
]);

// Export actions
export const updateSearchTerm = createAction(SEARCH.UPDATE_TERM);
export const setSearching = createAction(SEARCH.SET_SEARCHING);
export const receiveSearchResults = createAction(SEARCH.RECEIVE);

// Reducers
const initialState = {
  results: [],
  searching: false,
  searchTerm: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case SEARCH.UPDATE_TERM:
    return update(state, {
      searchTerm: { $set: action.payload },
    });
  case SEARCH.SET_SEARCHING:
    return update(state, {
      searching: { $set: !!action.payload },
    });
  case SEARCH.RECEIVE:
    return update(state, {
      results: { $set: action.payload },
    });
  default: return state;
  }
}

// Selectors
export const getSearchTerm = ({ search }) => search.searchTerm;
export const getSearchStatus = ({ search }) => search.searching;
export const getSearchResults = ({ search }) => search.results;


// Sagas handlers
function * searchSaga({ payload: searchTerm }) {
  yield put(setSearching(true));
  yield delay(200); // debounce search when user is typing

  const tracks = yield searchTracks(searchTerm);

  yield put(receiveSearchResults(tracks));
  yield put(setSearching(false));
}

// Saga watchers
function * watchSearch() {
  yield takeLatest(SEARCH.UPDATE_TERM, searchSaga);
}

export function * searchSagas() {
  yield fork(watchSearch);
}