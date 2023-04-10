import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AppView from '../../components/AppView';
import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';
const db = firestore();

const StarredTaskPage = () => {
  const {user: userId} = useSelector((state: any) => state.auth);
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
            if (task.star === true) {
              tasks.push(task);
            }
          });
        });
        console.log(tasks);
      })
      .catch(error => {
        console.error('Error getting tasks:', error);
        Alert.alert('Error', 'Could not get tasks.');
      });
  }, []);

  return <AppView></AppView>;
};

export default StarredTaskPage;
