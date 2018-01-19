import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {
	ConnectedRouter,
	routerReducer,
	routerMiddleware
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
export const store = createStore(
	combineReducers({ router: routerReducer }),
	{},
	applyMiddleware(routerMiddleware(history))
);

const App = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				<Route
					exact
					path="/"
					render={() => <h1>Welcome to RPGM Frontend!</h1>}
				/>
				<Route
					exact
					path="/login"
					render={() => <h2>You need to login</h2>}
				/>
			</Switch>
		</ConnectedRouter>
	</Provider>
);

export default App;
