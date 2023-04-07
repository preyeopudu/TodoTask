import React, {ReactNode} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

interface AppViewProps {
  children: ReactNode;
}

const AppView = ({children}: AppViewProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <StatusBar />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight,
  },
});

export default AppView;
