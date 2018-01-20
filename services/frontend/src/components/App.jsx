import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import initStore from '../store/initStore';

const App = () => (
	<Provider store={initStore()}>
		<HashRouter>
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
		</HashRouter>
	</Provider>
);

export default App;
