/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {View, StyleSheet, Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';

function App(): JSX.Element {
  return <Provider store={store}></Provider>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
