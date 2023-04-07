/* eslint-disable react/react-in-jsx-scope */
import {View, Text, StyleSheet} from 'react-native';

interface AuthBottomProps {
  question?: string;
  click?: string;
  onPress?: () => void;
}
const AuthBottom = ({click, question, onPress}: AuthBottomProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {question} {''}?
        <Text onPress={onPress} style={styles.click}>
          {' '}
          {click}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginVertical: 10},
  question: {color: '#fff', textAlign: 'center', fontSize: 16},
  click: {color: 'green', fontWeight: '700'},
});

export default AuthBottom;
