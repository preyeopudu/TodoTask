/* eslint-disable react/react-in-jsx-scope */
import {Text, StyleSheet} from 'react-native';

interface HeadingProps {
  title?: string;
}

const Heading = ({title}: HeadingProps) => {
  return <Text style={styles.headingStyle}>{title}</Text>;
};

const styles = StyleSheet.create({
  headingStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: 20,
    textTransform: 'capitalize',
  },
});

export default Heading;
