/* global window */
/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import browserHistory from './initHistory';

import authEpic from '../pages/login/state/epics/authEpic';
import authReducer, { initialState as authInitialState } from '../pages/login/state/authReducer';

import entityEpic from '../pages/entity/state/epics/entityEpic';
import entityReducer, { initialState as entityInitialState } from '../pages/entity/state/entityReducer';

import metadataEpic from '../pages/entity/state/epics/metadataEpic';
import metadataReducer, { initialState as metadataInitialState } from '../pages/entity/state/metadataReducer';

import imageUploadEpic from '../pages/entity/state/epics/imageUploadEpic';

const rootEpic = combineEpics(entityEpic, metadataEpic, imageUploadEpic, authEpic);

const rootReducer = combineReducers({
  router: routerReducer,
  entity: entityReducer,
  metadata: metadataReducer,
  auth: authReducer,
});

const initialState = {
  entity: entityInitialState,
  metadata: metadataInitialState,
  auth: authInitialState,
};

const composeEnhancer =
  (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initStore = () =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(routerMiddleware(browserHistory), createEpicMiddleware(rootEpic))),
  );
export default initStore;
