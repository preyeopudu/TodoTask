/* eslint-disable react/react-in-jsx-scope */
import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import Heading from '../../components/Headings';
import AppView from '../../components/AppView';
import AuthBottom from '../../components/AuthBottom';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../store/reducers/LoadingReducer';
import {login} from '../../store/reducers/AuthReducer';

const SignInPage = () => {
  const dispatch = useDispatch();
  const [authInfo, setAuthInfo] = useState({
    email: '',
    password: '',
  });

  const {email, password} = authInfo;

  const signIn = async () => {
    try {
      dispatch(setLoading(true));
      if (email === '' || password === '') {
        return Alert.alert('Authentication Error', 'All fields are mandatory');
      }
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      dispatch(setLoading(true));
      const user = userCredential.user;
      dispatch(login(user.uid));
    } catch (e: any) {
      if (e.code === 'auth/invalid-email') {
        Alert.alert('Authentication Error', 'The email address is invalid.');
      } else if (e.code === 'auth/user-not-found') {
        Alert.alert(
          'Authentication Error',
          'User not found. Please check your email and password and try again.',
        );
      } else if (e.code === 'auth/wrong-password') {
        Alert.alert(
          'Authentication Error',
          'The password is incorrect. Please try again.',
        );
      } else {
        Alert.alert(
          'Authentication Error',
          'An error occurred during sign in.',
        );
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
  const {navigate} = useNavigation<NavigationProp<Record<string, unknown>>>();
  return (
    <AppView>
      <View style={styles.container}>
        <Heading title="Login to view and create tasks" />
        <View style={styles.formContainer}>
          <FormInput
            onChangeText={e => setAuthInfo({...authInfo, email: e})}
            label="Email"
            placeholder="hello@company.com"
          />
          <FormInput
            label="password"
            secureTextEntry={true}
            placeholder="Your Password"
            onChangeText={e => setAuthInfo({...authInfo, password: e})}
          />
        </View>

        <FormButton label="Sign In" onPress={signIn} />
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
