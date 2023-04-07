/* eslint-disable react/react-in-jsx-scope */
import {View, StyleSheet} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import Heading from '../../components/Headings';
import AppView from '../../components/AppView';
import AuthBottom from '../../components/AuthBottom';
import {useNavigation, NavigationProp} from '@react-navigation/native';
const SignInPage = () => {
  const {navigate} = useNavigation<NavigationProp<Record<string, unknown>>>();
  return (
    <AppView>
      <View style={styles.container}>
        <Heading title="Login to view and create tasks" />
        <View style={styles.formContainer}>
          <FormInput label="Email" placeholder="hello@company.com" />
          <FormInput
            label="password"
            secureTextEntry={true}
            placeholder="Your Password"
          />
        </View>

        <FormButton label="Sign In" />
        <AuthBottom
          onPress={() => navigate('signup')}
          question="Don't have an account"
          click="sign up"
        />
      </View>
    </AppView>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {},
  formContainer: {
    marginVertical: 10,
  },
});
