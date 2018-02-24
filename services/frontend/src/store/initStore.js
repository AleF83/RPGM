import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import browserHistory from './initHistory';

import entityEpic from '../pages/entity/state/epics/entityEpic';
import entityReducer, { initialState as entityInitialState } from '../pages/entity/state/entityReducer';

import metadataEpic from '../pages/entity/state/epics/metadataEpic';
import metadataReducer, { initialState as metadataInitialState } from '../pages/entity/state/metadataReducer';

const rootEpic = combineEpics(entityEpic, metadataEpic);

const rootReducer = combineReducers({
  router: routerReducer,
  entity: entityReducer,
  metadata: metadataReducer,
});

const initialState = { entity: entityInitialState, metadata: metadataInitialState };

const initStore = () =>
  createStore(
    rootReducer,
    initialState,
    applyMiddleware(routerMiddleware(browserHistory), createEpicMiddleware(rootEpic)),
  );

export default initStore;
