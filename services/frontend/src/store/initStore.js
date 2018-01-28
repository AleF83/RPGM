import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import browserHistory from './initHistory';

import entityReducer from '../pages/entity/state/entityReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  entity: entityReducer,
});

const initStore = () =>
  createStore(rootReducer, {}, applyMiddleware(routerMiddleware(browserHistory)));

export default initStore;
