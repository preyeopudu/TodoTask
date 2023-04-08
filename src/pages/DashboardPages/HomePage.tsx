import React, {useRef, useState, useEffect} from 'react';
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
const db = firestore();

const HomePage = () => {
  const {user: userId} = useSelector((state: any) => state.auth);
  const [listData, setListData] = useState([]);
  const tabs = [{title: '\u2605', content: 'Content for Tab 1'}];
  const {width} = useWindowDimensions();
  const ScrollRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const {navigate} = useNavigation();

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
          <Text style={styles.tabButtonText}>+ Add List</Text>
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
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>+</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 20,
  },
  bottomButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
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
