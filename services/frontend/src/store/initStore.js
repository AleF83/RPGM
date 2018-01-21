import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import browserHistory from './initHistory';

const initStore = () =>
	createStore(
		combineReducers({
			router: routerReducer
		}),
		{},
		applyMiddleware(routerMiddleware(browserHistory))
	);

export default initStore;
