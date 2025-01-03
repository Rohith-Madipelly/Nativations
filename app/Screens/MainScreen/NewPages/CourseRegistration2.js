import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomStatusBar from '../../../Components/UI/StatusBar/CustomStatusBar';
import Metrics from '../../../utils/ResposivesUtils/Metrics';
import { useSelector } from 'react-redux';
import { GetFormReqs } from '../../../utils/API_Calls';
import { ImageBackground } from 'expo-image';

const CourseRegistration2 = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortType, setSortType] = useState('date'); // 'date' or 'duration'

  const tokenn = useSelector((state) => state.token)?.replaceAll('"', '');

  const onRefresh = useCallback(() => {
    GetData();
  }, []);

  const GetData = async () => {
    try {
      const res = await GetFormReqs(tokenn);
      if (res) {
        setData(res.data.allCourses);
        setFilteredData(res.data.allCourses); // Initialize filtered data
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = data.filter((item) =>
      item.courseName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSort = (type) => {
    setSortType(type);
    const sorted = [...filteredData].sort((a, b) => {
      if (type === 'date') {
        return new Date(a.from) - new Date(b.from);
      } else if (type === 'duration') {
        const durationA = parseInt(a.courseDuration.split('-')[0], 10);
        const durationB = parseInt(b.courseDuration.split('-')[0], 10);
        return durationA - durationB;
      }
    });
    setFilteredData(sorted);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 15 }}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by course name"
        value={searchText}
        onChangeText={handleSearch}
      />
      {/* Sort Buttons */}
      {/* <View style={styles.sortButtons}>
        <TouchableOpacity onPress={() => handleSort('date')} style={styles.sortButton}>
          <Text style={styles.sortButtonText}>Sort by Date</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSort('duration')} style={styles.sortButton}>
          <Text style={styles.sortButtonText}>Sort by Duration</Text>
        </TouchableOpacity>
      </View> */}
      {/* FlatList */}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.courseContainer}
            onPress={() => {}}
          >
            <ImageBackground
              style={styles.imageBackground}
              source={require('../../../assets/image/Home/Vector2.png')}
            >
              <Text style={styles.courseName}>
                <Text style={styles.bold}>Course name: </Text>
                {item.courseName}
              </Text>
              <View style={styles.courseDetails}>
                <View>
                  <Text style={styles.bold}>From</Text>
                  <Text>{item.from}</Text>
                </View>
                <View>
                  <Text style={styles.bold}>Course duration</Text>
                  <Text>{item.courseDuration}</Text>
                </View>
                <View>
                  <Text style={styles.bold}>To</Text>
                  <Text>{item.to}</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyList}>No courses available</Text>}
      />


      
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  sortButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  sortButtonText: {
    fontWeight: 'bold',
  },
  courseContainer: {
    maxHeight: Metrics.height * 0.19,
    minHeight: 120,
    backgroundColor: 'rgba(168, 168, 255, 0.30)',
    padding: 10,
    borderRadius: 13,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
  },
  courseName: {
    color: 'rgba(3, 3, 112, 1)',
    fontWeight: '400',
    fontSize: Metrics.rfv(20),
  },
  bold: {
    fontWeight: '700',
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default CourseRegistration2;
