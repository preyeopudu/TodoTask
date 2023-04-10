/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AuthStack from './stack/AuthStack';
import DashboardStack from './stack/DashboardStack';
import LoadingLayout from '../Layouts/LoadingLayout';
const IndexStack = () => {
  const {auth: authState} = useSelector((state: any) => state.auth);

  return (
    <>
      <NavigationContainer>
        {authState === false ? <AuthStack /> : <DashboardStack />}
        <LoadingLayout />
      </NavigationContainer>
    </>
  );
};

export default IndexStack;
