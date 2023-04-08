/* eslint-disable react/react-in-jsx-scope */
import React, {useState} from 'react';
import {Alert} from 'react-native';
import AppView from '../../components/AppView';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../store/reducers/LoadingReducer';
import {useNavigation} from '@react-navigation/native';
const db = firestore();

const AddListPage = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const {user: userId} = useSelector((state: any) => state.auth);
  const {goBack} = useNavigation();

  const createList = async () => {
    try {
      if (title === '') {
        return Alert.alert('Form Error', 'title field cannot be empty');
      }
      dispatch(setLoading(true));

      await db.collection('users').doc(userId).collection('lists').add({
        title,
        tasks: [],
      });
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Form error', 'Error occured in creating list');
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <AppView>
      <FormInput
        onChangeText={e => setTitle(e)}
        placeholder="Enter task title"
        label="list title"
      />
      <FormButton onPress={createList} label="create" />
    </AppView>
  );
};

export default AddListPage;
