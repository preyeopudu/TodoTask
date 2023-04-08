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
const SignUpPage = () => {
  const dispatch = useDispatch();
  const [authInfo, setAuthInfo] = useState({
    email: '',
    password: '',
  });
  const {email, password} = authInfo;

  const signUp = async () => {
    try {
      dispatch(setLoading(true));
      if (email === '' || password === '') {
        return Alert.alert('Authentication Error', 'All fields are mandatory');
      }
      const userCredential = await auth().createUserWithEmailAndPassword(
        authInfo.email,
        authInfo.password,
      );
      // User account created
      const user = userCredential.user;
      dispatch(login(user));
      return user;
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Authentication Error',
          'The email address is already in use.',
        );
      } else if (e.code === 'auth/invalid-email') {
        Alert.alert('Authentication Error', 'The email address is invalid.');
      } else if (e.code === 'auth/weak-password') {
        Alert.alert('Authentication Error', 'The password is too weak.');
      } else {
        Alert.alert('Authentication Error', JSON.stringify(e));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const {navigate} = useNavigation<NavigationProp<Record<string, unknown>>>();
  return (
    <AppView>
      <View style={styles.container}>
        <Heading title="Set up your free account" />
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

        <FormButton label="Sign Up" onPress={signUp} />
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
