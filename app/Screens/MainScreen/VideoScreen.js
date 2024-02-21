import { Button, Dimensions, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'


import React, { useState, useCallback, useRef, useLayoutEffect, useEffect } from "react";
import { Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

import VideoData from './DataVideoData.js';
import onShare from '../../utils/ShareBtn.js';

import {
  Feather,
} from "@expo/vector-icons";

import CustomButton from '../../Components/UI/Button/ButtonC1Cricle.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import DownloaderVideo from '../../Download/DownloadVideo.js';
import ButtonTotal from '../../DownloadMain/ButtonTotal.js';
import { HomePageData, VideoPageData } from '../../utils/API_Calls.js';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { getIdFromUrl } from '../../utils/getIdFromUrl.js';
import Snap_Carousel7 from '../../Components2/Snap_Carousel7.js';

const Stack = createNativeStackNavigator();


const VideoScreen = ({ route }) => {
  const { id } = route.params
  console.log("adsd>>>>", id)


  const [DataPage, setDataPage] = useState()
  const [VideoID, setVideoID] = useState()

  const [relatedPosts, setRelatedPosts] = useState()
  const [spinnerBool, setSpinnerbool] = useState(false)

  const navigation = useNavigation();
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);


  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);


  const dispatch = useDispatch();
  let tokenn = useSelector((state) => state.token);

  // >>>>>>>>>>>>>>>>>
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    HomeData()

  }, []);


  // >>>>>>>>>>>>>>>>>>

  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
  }


  useEffect(() => {
    HomeData()
  }, [])

  useEffect(() => {
    HomeData()
  }, [id])


  const HomeData = async () => {
    setSpinnerbool(true)

    try {
      const res = await VideoPageData(tokenn, id)

      if (res) {
        setDataPage(res.data.postDetails)
        setRelatedPosts(res.data.relatedPosts)

        setVideoID(getIdFromUrl(res.data.postDetails.videoUrl))
        // console.log(getIdFromUrl(res.data.postDetails.videoUrl))
      }
      else {
        console.log("No Respones")
      }


    } catch (error) {
      setTimeout(() => {
        console.log("Error in fetching", error.response.status)
      }, 1000);

      // setTimeout(() => {
      //   setSpinnerbool(false)
      // }, 5000)
    }
    finally {
      setSpinnerbool(false)
      setRefreshing(false);
    }
  }
console.log("dabska>>>",VideoID)

  if (spinnerBool) {
    return (
      <SafeAreaView>
        <Spinner
          visible={spinnerBool}
          color={"#5F2404"}
          animation={'fade'}
        />
      </SafeAreaView>
    );
  }


  
  return (
    <ScrollView 
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <SafeAreaView style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Spinner
          visible={spinnerBool}
          color={"#5F2404"}
          animation={'fade'}
        />


        <View style={{ width: '100%' }}>

          <YoutubePlayer
            height={222}
            play={playing}
            // videoId={ScreenData.VideoID}
            videoId={VideoID}
            onChangeState={onStateChange}
            showinfo={false}
            controls={1}
          />

          <Pressable style={{ position: "absolute", top: '10%', left: 10, backgroundColor: '#3d423e', borderRadius: 50 }} onPress={() => { navigation.goBack(); }}>
            <Feather name="arrow-left" size={35} color="white" />
          </Pressable>

          {/* {playing ?"":<View style={{ position:"absolute",top:'75%', marginHorizontal:50 ,backgroundColor:'red'}}>
          <Text style={{textAlign:'center'}}>Rohith Madipelly Rohith MadipellyRohith MadipellyRohith Madipelly </Text>

        </View>} */}

        </View>


        <CustomButton
          onPress={togglePlaying}
          styleData={{ paddingHorizontal: 50, marginVertical: 10 }}>
          {playing ? "pause" : "Watch Now"}
        </CustomButton>

        {DataPage ? <Text style={[styles.paragraphy_U10, { width: '90%' }]}>{DataPage.description}</Text> : ""}

        {DataPage ? <View style={{ paddingTop: 20, flexDirection: 'row' }}>
          {/* <ButtonTotal youtubeURL={DataPageVideo} /> */}
          <ButtonTotal youtubeURL={DataPage.videoUrl} />
        </View> : ""}


        {relatedPosts ? <View><Snap_Carousel7 relatedPostsData={relatedPosts} /></View> : <View><Text>No Related Posts</Text></View>}
      <View style={{height:20}}>

      </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default VideoScreen

const styles = StyleSheet.create({

  paragraphy_U10: {
    fontSize: 12,
    fontWeight: '500'

    //   color: #000;
    // font-family: Jost;
    // font-size: 10px;
    // font-style: normal;
    // font-weight: 300;
    // line-height: 130%; /* 13px */
  }

})