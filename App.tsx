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
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <View style={{flex: 1}}>
          <Provider store={store}>
            <IndexStack />
          </Provider>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
