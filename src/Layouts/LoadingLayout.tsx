/* eslint-disable react/react-in-jsx-scope */
import {View, Modal, ActivityIndicator, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';

const LoadingLayout = () => {
  const {loading} = useSelector((state: any) => state.isLoading);

  return (
    <Modal transparent visible={loading}>
      <View style={styles.container}>
        <ActivityIndicator color="green" size="large" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
});

export default LoadingLayout;
