/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/react-in-jsx-scope */
import {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import TodoTask from './TodoTask';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const db = firestore();

interface TabViewProps {
  listId: string;
}

const TabView = ({listId}: TabViewProps) => {
  const [tasks, setTasks] = useState([]);
  const {user: userId} = useSelector((state: any) => state.auth);
  const {width} = useWindowDimensions();

  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(userId)
      .collection('lists')
      .doc(listId)
      .collection('tasks')
      .onSnapshot(querySnapshot => {
        const tasks: ((prevState: never[]) => never[]) | {id: string}[] = [];
        querySnapshot.forEach(documentSnapshot => {
          tasks.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setTasks(tasks);
      });

    return () => unsubscribe();
  }, [listId, userId]);

  // filter tasks array to show only incomplete tasks
  const incompleteTasks = tasks.filter(task => task.isCompleted === false);

  return (
    <View style={{width: width, flex: 1}}>
      {tasks.length === 0 ? (
        <View style={style.textContainer}>
          <Image
            source={require('../assets/images/folders.png')}
            style={style.image}
          />
          <Text style={style.text}>No task created yet</Text>
        </View>
      ) : incompleteTasks.length === 0 ? (
        <View style={style.textContainer}>
          <Image
            source={require('../assets/images/folders.png')}
            style={style.image}
          />
          <Text style={style.text}>All tasks completed !</Text>
        </View>
      ) : (
        <FlatList
          data={incompleteTasks}
          renderItem={({item}) => <TodoTask task={item} listId={listId} />}
        />
      )}
    </View>
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

export default TabView;
