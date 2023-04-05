/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AuthStack from './stack/AuthStack';
import DashboardStack from './stack/DashboardStack';
const IndexStack = () => {
  const {auth: authState} = useSelector((state: any) => state.auth);
  console.log(authState);
  return (
    <>
      <NavigationContainer>
        {authState === false ? <AuthStack /> : <DashboardStack />}
      </NavigationContainer>
    </>
  );
};

export default IndexStack;
