/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  FlatList,
  Alert,
} from 'react-native';
import TabView from '../../components/TabView';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/AntDesign';
const db = firestore();

const HomePage = () => {
  const {user: userId} = useSelector((state: any) => state.auth);
  const [listData, setListData] = useState([]);
  const tabs = [{title: '\u2605', content: 'Content for Tab 1'}];
  const {width} = useWindowDimensions();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '30%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const ScrollRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const {navigate} = useNavigation();

  useEffect(() => {
    const checkDefaultList = async () => {
      const listsRef = db.collection('users').doc(userId).collection('lists');
      const querySnapshot = await listsRef
        .where('title', '==', 'My Task')
        .get();
      if (querySnapshot.empty) {
        await listsRef.add({title: 'My Task', tasks: []});
      }
    };

    checkDefaultList();
  }, []);

  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(userId)
      .collection('lists')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          data.push({...doc.data(), id: doc.id});
        });
        setListData(data);
      });
    return unsubscribe;
  }, [userId]);

  const addTaskToList = async (listId, newTask) => {
    const listRef = db
      .collection('users')
      .doc(userId)
      .collection('lists')
      .doc(listId);
    try {
      await listRef.update({
        tasks: firestore.FieldValue.arrayUnion(newTask),
      });
    } catch (error) {
      console.error('Error updating tasks in list:', error);
      Alert.alert('Error', 'Could not add task to list.');
    }
  };
  const handleTabPress = (index: number) => {
    try {
      // setActiveTab(index);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToIndex({index: index});
      }
    } catch (error) {}
  };

  // const goToNextPage = () => {

  const handleScroll = (event: any) => {
    const position = event.nativeEvent.contentOffset.x;
    const index = Math.round(position / width);
    setActiveTab(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => navigate('list')}
          style={styles.tabButton}>
          <Text style={styles.tabButtonText}>{'\u2605'}</Text>
        </TouchableOpacity>
        <ScrollView
          ref={ScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {listData.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabButton,
                activeTab === index && styles.activeTabButton,
              ]}
              onPress={() => handleTabPress(index)}>
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === index && styles.activeTabButtonText,
                ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={() => navigate('list')}
          style={styles.tabButton}>
          <Text style={styles.tabButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        data={listData}
        renderItem={({item}) => <TabView />}
        bounces={false}
        onScroll={handleScroll}
      />

      <View style={styles.bottomNavContainer}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handlePresentModalPress}>
          <Text style={styles.bottomButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handlePresentModalPress}>
          <Icon name="up" size={30} color="red" />
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: 'rgba(69,69,69,0.3)',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  activeTabButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  tabButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeTabButtonText: {
    color: '#fff',
  },
  tabContent: {
    width: '100%',
    backgroundColor: '#fff',
  },
  tabContentInner: {
    padding: 20,
  },
  bottomNavContainer: {
    backgroundColor: 'rgba(69,69,69,0.4)',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottomButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    marginHorizontal: 16,
    borderRadius: 10,
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default HomePage;
