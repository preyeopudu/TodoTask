/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {Provider} from 'react-redux';
import store from './src/store';
import IndexStack from './src/navigation';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <IndexStack />
    </Provider>
  );
}

export default App;
