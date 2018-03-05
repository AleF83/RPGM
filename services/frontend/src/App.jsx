import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import initStore from './store/initStore';
import browserHistory from './store/initHistory';

import LoginPage from './pages/login/LoginPage';
import LoggedInPage from './pages/login/LoggedInPage';
import EntityPage from './pages/entity/EntityPage';
import UserProfilePage from './pages/userProfile/UserProfilePage';

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
          component={LoginPage}
        />
        <Route
          exact
          strict
          path="/auth/:providerId/"
          component={LoggedInPage}
        />
        <Route
          path="/user"
          component={UserProfilePage}
        />
        <Route
          path="/entity"
          component={EntityPage}
        />

        <Route
          render={() => <h1>No Match</h1>}
        />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
