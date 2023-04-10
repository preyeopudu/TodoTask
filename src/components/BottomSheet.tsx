/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
const db = firestore();
interface BottomSheetProps {
  visible: boolean;
  listId: string;
  setVisible: Function;
}

interface TaskInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  autoFocus: boolean;
}

const TaskInput = ({placeholder, onChangeText, autoFocus}: TaskInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        autoFocus={autoFocus}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={placeholder}
        multiline
      />
    </View>
  );
};

const BottomSheet = ({visible, listId, setVisible}: BottomSheetProps) => {
  const {user: userId} = useSelector((state: any) => state.auth);
  const [showPicker, setShowPicker] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    star: false,
    isCompleted: false,
    date: null,
  });

  useEffect(() => {
    if (!visible) {
      setTask({
        title: '',
        description: '',
        star: false,
        isCompleted: false,
        date: null,
      });
    }
  }, [visible]);

  const addTaskToList = async () => {
    try {
      if (task.title === '') {
        return Alert.alert('Form Error', 'Task name is mandatory');
      }

      await db
        .collection('users')
        .doc(userId)
        .collection('lists')
        .doc(listId)
        .collection('tasks')
        .add(task);

      setVisible(false);
    } catch (error) {
      console.error('Error updating tasks in list:', error);
      Alert.alert('Error', 'Could not add task to list.');
    }
  };
  const handleDateChange = (event: any, selectedDate: Date) => {
    setShowPicker(false);
    if (selectedDate instanceof Date) {
      const taskDate = new Date(selectedDate);
      setTask({...task, date: taskDate});
    }
  };
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{alignSelf: 'flex-end', marginHorizontal: 16}}>
            <Icon name="closecircle" size={22} color="#fff" />
          </TouchableOpacity>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <TaskInput
              autoFocus={true}
              onChangeText={e => setTask({...task, title: e})}
              placeholder="Fill in Task title"
            />
            <TaskInput
              onChangeText={e => setTask({...task, description: e})}
              placeholder="Fill in task description"
            />
            <TouchableOpacity onPress={() => setShowPicker(true)}>
              <Text>
                {task.date
                  ? new Date(task.date).toLocaleDateString()
                  : 'Select deadline'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={addTaskToList}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      {showPicker === true && (
        <DateTimePicker
          value={task.date ? new Date(task.date) : new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0,0)',
    justifyContent: 'flex-end',
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  bottomContainer: {
    backgroundColor: '#696969',
    flex: 1 / 3,
    elevation: 2,
    paddingTop: 20,
  },
  taskInputContainer: {
    color: '#fff',
  },
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    paddingVertical: 15,
  },
  buttonContainer: {
    marginVertical: 10,
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    paddingHorizontal: 25,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BottomSheet;
