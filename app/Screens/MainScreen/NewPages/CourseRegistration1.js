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
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const CourseRegistration1 = () => {

  const tokenn = useSelector((state) => state.token)?.replaceAll('"', '');

  const onRefresh = useCallback(() => {

  }, []);




  const categoryData_0 = [
    // { title: 'Select Category', value: 'N/A' },
    { title: 'For New Students', value: 'For New Students' },
    { title: 'For old students', value: 'For Old Students' },
    { title: 'For Children/Teens', value: 'For Children/Teens' },
    { title: 'For Executives', value: 'For Executives' },
  ];
  // Register for a Course

  const [isSelectedCategory, setIsSelectedCategory] = useState("")

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />


      <View style={{ paddingHorizontal: 18 }}>
        <Text style={[{ color: '#64748B', fontSize: Metrics.rfv(20), }]}>Select category</Text>
      </View>

      {/* FlatList */}
      <FlatList
        data={categoryData_0}
        keyExtractor={(item, index) => index.toString()}
        // refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.courseContainer, {flexDirection:'row'}]}
            onPress={() => {
              setIsSelectedCategory(item.title)
             }}
            key={index}
          >
            <View style={{ width: '17%', minHeight: 50, alignItems: 'center', justifyContent: 'center' }}>
              {isSelectedCategory==item.title ? <View style={{
                width: 30, height: 30, borderRadius: 15, 
                // borderColor: '#D9D9D9',
                // borderWidth: 1.3,
                backgroundColor:'#030370',
                justifyContent:'center',alignItems:'center'

              }}>
                <View style={{
                  width: 15, height: 15, borderRadius: 7.5, 
                  // borderColor: '#D9D9D9',
                  // borderWidth: 1.3,
                  backgroundColor:'white',
                }}>

                </View>

              </View> : <View style={{
                width: 30, height: 30, borderRadius: 15, borderColor: '#D9D9D9',
                borderWidth: 1.3
              }}></View>}
            </View>

            <View style={{ width: '80%', minHeight: 50, justifyContent: 'center' }}>
            <Text style={{color:isSelectedCategory==item.title?"#030370":"#8B8BA9"}}>{item.title}</Text>
            </View>
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
    maxHeight: Metrics.height * 0.1,
    minHeight: 50,
    // backgroundColor: 'rgba(168, 168, 255, 0.30)',
    // padding: 10,
    borderRadius: 13,
    marginVertical: 10,
    marginHorizontal: 15,
    borderColor: '#D9D9D9',
    borderWidth: 1.3
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
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

export default CourseRegistration1;
