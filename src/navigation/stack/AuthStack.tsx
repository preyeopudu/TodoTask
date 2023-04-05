/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpPage from '../../pages/AuthPages/SignUpPage';
import SignInPage from '../../pages/AuthPages/SignInPage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="signup" component={SignUpPage} />
      <Stack.Screen name="signin" component={SignInPage} />
    </Stack.Navigator>
  );
};

export default AuthStack;
