/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import Icon from 'react-native-vector-icons/Feather';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
const db = firestore();
import {useSelector} from 'react-redux';

const TodoTask = ({task, listId}) => {
  const {user: userId} = useSelector((state: any) => state.auth);
  const HandleCompleted = async () => {
    const listRef = db
      .collection('users')
      .doc(userId)
      .collection('lists')
      .doc(listId)
      .collection('tasks')
      .doc(task.id);

    try {
      listRef.update({isCompleted: true});

      console.log('Task updated successfully', listId);
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', 'Could not update task.');
    }
  };

  const HandleStared = async () => {
    const listRef = db
      .collection('users')
      .doc(userId)
      .collection('lists')
      .doc(listId)
      .collection('tasks')
      .doc(task.id);

    try {
      const taskDoc = await listRef.get();
      const currentStar = taskDoc.data().star;
      listRef.update({star: !currentStar});
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', 'Could not update task.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        {listId && (
          <TouchableOpacity onPress={HandleCompleted}>
            <Icon name="circle" size={20} color="green" />
          </TouchableOpacity>
        )}

        <View style={styles.textContainer}>
          <Text>{task.title}</Text>
          <Text style={{fontSize: 10}}>{task.description}</Text>

          {task.date && (
            <Text
              style={{
                borderWidth: 1,
                borderColor: '#696969',
                padding: 10,
                marginTop: 5,
                borderRadius: 5,
              }}>
              {new Date(
                task.date.seconds * 1000 + task.date.nanoseconds / 1000000,
              ).toDateString()}
            </Text>
          )}
        </View>
      </View>

      {listId && (
        <TouchableOpacity onPress={HandleStared}>
          <Icon
            name="star"
            size={20}
            color={task.star === true ? 'green' : 'white'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  body: {
    fontSize: 16,
  },
});
export default TodoTask;
