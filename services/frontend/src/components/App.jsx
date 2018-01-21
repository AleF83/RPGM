import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import initStore from '../store/initStore';
import browserHistory from '../store/initHistory';

const App = () => (
	<Provider store={initStore()}>
		<ConnectedRouter history={browserHistory}>
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
