import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import browserHistory from './initHistory';

import { entitySaveEpic } from '../pages/entity/state/entityEpic';
import entityReducer from '../pages/entity/state/entityReducer';

const rootEpic = combineEpics(entitySaveEpic);

const rootReducer = combineReducers({
  router: routerReducer,
  entity: entityReducer,
});

const initStore = () =>
  createStore(
    rootReducer,
    {},
    applyMiddleware(routerMiddleware(browserHistory), createEpicMiddleware(rootEpic)),
  );

export default initStore;
