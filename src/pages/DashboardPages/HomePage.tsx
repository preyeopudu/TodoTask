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
} from 'react-native';
import TabView from '../../components/TabView';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/Feather';
import BottomSheet from '../../components/BottomSheet';
const db = firestore();

const HomePage = () => {
  const {user: userId} = useSelector((state: any) => state.auth);
  const [listData, setListData] = useState([]);
  const memoizedListData = useMemo(() => listData, [listData]);
  const [visible, setVisible] = useState(false);
  const [activeId, SetActiveId] = useState('');
  const {width} = useWindowDimensions();

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
        const newDocRef = await listsRef.add({title: 'My Task', tasks: []});
        SetActiveId(newDocRef.id);
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
        SetActiveId(data[0]?.id);
        setListData(data);
      });
    return unsubscribe;
  }, [userId]);

  const handleTabPress = useCallback(
    (index: number) => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToIndex({index: index});
      }
      SetActiveId(memoizedListData[index].id);
    },
    [memoizedListData],
  );

  // const goToNextPage = () => {

  const handleScroll = (event: any) => {
    const position = event.nativeEvent.contentOffset.x;
    const index = Math.round(position / width);
    setActiveTab(index);
    SetActiveId(listData[index].id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => navigate('star')}
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
        renderItem={({item}) => (
          <TabView tasks={item.tasks} listId={activeId} />
        )}
        bounces={false}
        onScroll={handleScroll}
      />

      <View style={styles.bottomNavContainer}>
        {activeId && (
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => setVisible(true)}>
            <Icon name="plus" size={30} color="green" />
          </TouchableOpacity>
        )}
      </View>

      <BottomSheet
        setVisible={setVisible}
        listId={activeId}
        visible={visible}
      />
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
