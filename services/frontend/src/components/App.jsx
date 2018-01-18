import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" render={() => <h1>Welcome to RPGM Frontend!</h1>} />
      <Route exact path="/login" render={() => <h2>You need to login</h2>} />
    </Switch>
  </HashRouter>
);

export default App;
