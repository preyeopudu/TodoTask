/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from '../../pages/DashboardPages/HomePage';
import AddListPage from '../../pages/DashboardPages/AddList';
import StarredTaskPage from '../../pages/DashboardPages/StarredTaskPage';

const Stack = createNativeStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={HomePage} />
      <Stack.Screen name="list" component={AddListPage} />
      <Stack.Screen name="star" component={StarredTaskPage} />
    </Stack.Navigator>
  );
};

export default DashboardStack;
