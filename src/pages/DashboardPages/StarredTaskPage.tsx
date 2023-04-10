/* eslint-disable react/react-in-jsx-scope */
import {useSelector} from 'react-redux';
import AppView from '../../components/AppView';
import {FlatList, Image, View, StyleSheet, Text, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import TodoTask from '../../components/TodoTask';
const db = firestore();

const StarredTaskPage = () => {
  const {user: userId} = useSelector((state: any) => state.auth);
  const [tasks, setTasks] = useState([]);
  const tasksRef = db.collection('users').doc(userId).collection('lists');

  useEffect(() => {
    tasksRef
      .get()
      .then(async listsSnapshot => {
        const tasksPromises = [];
        listsSnapshot.forEach(listDoc => {
          const tasksQuery = listDoc.ref.collection('tasks').get();
          tasksPromises.push(tasksQuery);
        });
        const tasksSnapshots = await Promise.all(tasksPromises);
        const tasks = [];
        tasksSnapshots.forEach(snapshot => {
          snapshot.forEach(doc => {
            const task = {
              id: doc.id,
              ...doc.data(),
            };
            if (task.star === true && task.isCompleted === false) {
              tasks.push(task);
            }
          });
        });
        setTasks(tasks);
      })
      .catch(error => {
        console.error('Error getting tasks:', error);
        Alert.alert('Error', 'Could not get tasks.');
      });
  }, []);

  return (
    <AppView>
      {tasks.length === 0 ? (
        <View style={style.textContainer}>
          <Image
            source={require('../../assets/images/star.png')}
            style={style.image}
          />
          <Text style={style.text}>No starred tasks</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={({item}) => <TodoTask task={item} />}
        />
      )}
    </AppView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 150,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});
export default StarredTaskPage;
