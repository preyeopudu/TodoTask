/* eslint-disable react/react-in-jsx-scope */
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

interface TabViewProps {
  tasks: object;
  uid: string;
}

const TabView = ({tasks}: TabViewProps) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{width: width, flex: 1}}>
      <Text style={{color: '#fff'}}>heelo</Text>
      {/* <FlatList /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TabView;
