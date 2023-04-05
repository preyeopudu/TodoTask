/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {View, StyleSheet, Text} from 'react-native';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>heello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
