import update from 'immutability-helper';
import { createAction } from 'redux-actions';
import { fork, takeEvery } from 'redux-saga/effects';
import { createTypes, crudActions } from '../../common/reduxHelpers';
import { PLAYLIST } from '../playlist/playlist.ducks';

// Action types
export const TRACK = createTypes('TRACK', [
  ...crudActions, 'UPDATE_MANY',
]);

// Export actions
export const updateManyTracks = createAction(TRACK.UPDATE_MANY);
export const receiveTracks = createAction(TRACK.RECEIVE);

// Reducers
const initialState = {
  tracksById: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case TRACK.RECEIVE:
    return update(state, {
      tracksById: { $merge: action.payload },
    });
  case TRACK.UPDATE:
    return update(state, {
      tracksById: { [action.payload._id]: { $set: action.payload } },
    });
  case TRACK.UPDATE_MANY: {
    const newTracks = {};

    action.payload.forEach(track => {
      newTracks[track._id] = track;
    });

    return update(state, {
      tracksById: { $merge: newTracks },
    });
  }
  case PLAYLIST.ADD_TRACK:
    return update(state, {
      tracksById: { [action.payload.track.id]: { $set: action.payload.track } },
    });
  default: return state;
  }
}

// Selectors
export const getTracks = ({ track }) => Object.values(track.tracksById);


// Sagas handlers
function * fooSaga({ payload }) {
  yield console.log('[FOO]', payload);
}

// Saga watchers
function * watchFoo() {
  yield takeEvery(TRACK.UPDATE, fooSaga);
}

export function * trackSagas() {
  yield fork(watchFoo);
}