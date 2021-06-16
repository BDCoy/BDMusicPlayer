import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './src/navigations/index';

import store from './src/redux/config/store';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
