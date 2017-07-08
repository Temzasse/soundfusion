import update from 'immutability-helper';
import { createAction } from 'redux-actions';
import { fork, takeEvery, put } from 'redux-saga/effects';
import { createTypes } from '../common/reduxHelpers';
import { listPlaylists } from '../services/db';
import { initPlaylists } from '../features/playlist/playlist.ducks';

// Action types
export const INIT = createTypes('INIT', [
  'START', 'END',
]);

// Export actions
export const initApp = createAction(INIT.START);
export const initDone = createAction(INIT.END);

// Reducers
const initialState = {
  initDone: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case INIT.END:
    return update(state, {
      initDone: { $set: true },
    });
  default: return state;
  }
}

// Selectors
export const getInitStatus = state => state.init.initDone;


// Sagas handlers
function * initAppSaga() {
  const playlists = yield listPlaylists();
  yield put(initPlaylists(playlists));
  yield put(initDone());
}


// Saga watchers
function * watchInit() {
  yield takeEvery(INIT.START, initAppSaga);
}

export function * initSagas() {
  yield fork(watchInit);
}