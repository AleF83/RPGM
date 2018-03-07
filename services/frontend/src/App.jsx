import React from 'react';
import { Provider } from 'react-redux';

import initStore from './store/initStore';
import AppRouter from './route/AppRouter';

const App = () => (
  <Provider store={initStore()}>
    <AppRouter />
  </Provider>
);

export default App;
