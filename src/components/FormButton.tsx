/* eslint-disable react/react-in-jsx-scope */
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

interface FormButtonProps extends TouchableOpacityProps {
  onPress?: () => void;
  label?: string;
}
const FormButton = ({onPress, label = 'submit'}: FormButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={style.container}>
      <Text style={style.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 15,
  },
  text: {
    color: '#000',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: '500',
    fontSize: 16,
  },
});
export default FormButton;
