import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import player, { playerSagas } from '../features/player/player.ducks';

// Create root reducer
const rootReducer = combineReducers({
  player,
});

// Create root saga
function* rootSaga() {
  yield fork(playerSagas);
}

const sagaMiddleware = createSagaMiddleware();

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(sagaMiddleware);
} else {
  const logger = require('redux-logger').default; // eslint-disable-line

  enhancer = !window.devToolsExtension
    ? applyMiddleware(sagaMiddleware, logger)
    : compose(
        applyMiddleware(sagaMiddleware, logger),
        window.devToolsExtension()
      );
}


export default function configureStore(initialState) {
  // Mount it on the store
  const store = createStore(rootReducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga); // Then run the saga

  return store;
}