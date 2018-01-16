import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import * as coinListEpics from './coinList/epic';
import * as coinHistoryEpics from './coinHistory/epic';

export const epics = combineEpics(
  ...Object.values(coinListEpics),
  ...Object.values(coinHistoryEpics)
);

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  coinList: require('./coinList').reducer,
  coinHistory: require('./coinHistory').reducer,
});

// creates the store
const configureStore = (rootReducer, rootEpic) => {
  /* ------------- Redux Configuration ------------- */
  const middleware = [createEpicMiddleware(rootEpic)];
  const enhancers = [];

  /* ------------- Assemble Middleware ------------- */
  enhancers.push(applyMiddleware(...middleware));

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const store = createStore(rootReducer, composeWithDevTools(...enhancers));

  return {
    store,
  };
};

export default () => {
  let { store } = configureStore(reducers, epics);

  const epicMiddleware = createEpicMiddleware(epics);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const rootEpic = require('./').epics;
      epicMiddleware.replaceEpic(rootEpic);
    });
  }

  return store;
};
