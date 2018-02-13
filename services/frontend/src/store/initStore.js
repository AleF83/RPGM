import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import browserHistory from './initHistory';

import entityEpic from '../pages/entity/state/epics/entityEpic';
import entityReducer, {
  initialState as entityInitialState,
} from '../pages/entity/state/entityReducer';

const rootEpic = combineEpics(entityEpic);

const rootReducer = combineReducers({
  router: routerReducer,
  entity: entityReducer,
});

const initialState = {
  entity: entityInitialState,
};

const initStore = () =>
  createStore(
    rootReducer,
    initialState,
    applyMiddleware(routerMiddleware(browserHistory), createEpicMiddleware(rootEpic)),
  );

export default initStore;
