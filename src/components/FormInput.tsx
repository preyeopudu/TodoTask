/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  KeyboardTypeOptions,
  Text,
} from 'react-native';

interface FormInputProps extends TextInputProps {
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  label,
}) => {
  return (
    <View style={style.container}>
      <Text style={style.label}>{label}</Text>
      <View style={style.inputContainer}>
        <TextInput
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={style.input}
          placeholderTextColor="#696969"
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    color: '#fff',
    textTransform: 'capitalize',
  },
  container: {
    marginVertical: 5,
  },
  inputContainer: {
    marginVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderColor: '#696969',
  },
  input: {
    color: '#fff',
  },
});
export default FormInput;
