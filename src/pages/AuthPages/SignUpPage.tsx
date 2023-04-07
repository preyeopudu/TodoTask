/* eslint-disable react/react-in-jsx-scope */
import {View, StyleSheet} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import Heading from '../../components/Headings';
import AppView from '../../components/AppView';
import AuthBottom from '../../components/AuthBottom';
import {useNavigation, NavigationProp} from '@react-navigation/native';
const SignUpPage = () => {
  const {navigate} = useNavigation<NavigationProp<Record<string, unknown>>>();
  return (
    <AppView>
      <View style={styles.container}>
        <Heading title="Set up your free account" />
        <View style={styles.formContainer}>
          <FormInput label="Email" placeholder="hello@company.com" />
          <FormInput
            label="password"
            secureTextEntry={true}
            placeholder="Your Password"
          />
        </View>

        <FormButton label="Sign Up" />
        <AuthBottom
          onPress={() => navigate('signin')}
          question="Already have an account"
          click="login"
        />
      </View>
    </AppView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {},
  formContainer: {
    marginVertical: 10,
  },
});
