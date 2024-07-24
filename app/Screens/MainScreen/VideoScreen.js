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
import VideoComponent from '../../Components/VideoComponent.js';
import AudioComponent from '../../Components/AudioComponent.js';
import ButtonC1Cricle from '../../Components/UI/Button/ButtonC1Cricle.js'
import OtherDownloads from '../../DownloadMain/OtherDownloads.js';
import { GUEST_URL } from '../../Enviornment.js';
import OtherDownloadBtn from '../../DownloadMain/OtherDownloadBtn.js';

const VideoScreen = ({ route }) => {
  const { id } = route.params
  // console.log("adsd>>>>", id)


  const [DataPage, setDataPage] = useState()
  const [VideoID, setVideoID] = useState()

  const [relatedPosts, setRelatedPosts] = useState()
  const [spinnerBool, setSpinnerbool] = useState(false)

  const navigation = useNavigation();
  const [playing, setPlaying] = useState(false);
  const [title, setTitle] = useState("")
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);


  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);



  let tokenn = useSelector((state) => state.token);

  // >>>>>>>>>>>>>>>>>
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = useState(false);
  const [type, setType] = useState(false);

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
        console.log("data mes", res.data.postDetails.type)
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", res.data.postDetails.title)
        setType(res.data.postDetails.type)

        setDataPage(res.data.postDetails)
        setRelatedPosts(res.data.relatedPosts)
        setTitle(res.data.postDetails.title)
        setVideoID(getIdFromUrl(res.data.postDetails.videoUrl))
        console.log(res.data.postDetails.title)
      }
      else {
        console.log("No Respones")
      }


    } catch (error) {
      setTimeout(() => {
        console.log("Error in fetching", error)
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
  // console.log("dabska>>>", VideoID)

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




        <View style={{ width: '100%', height: 280, marginTop: 24 }}>
          {DataPage ? <VideoComponent DataPage={DataPage} /> : ""}
        </View>


        {DataPage ? <Text style={[styles.paragraphy_U11, { width: '90%', paddingBottom: 5 }]}>{DataPage.title}</Text> : ""}
        {DataPage ? <Text style={[styles.paragraphy_U10, { width: '90%', paddingLeft: 5, marginBottom: 25 }]}>{DataPage.description}</Text> : ""}

        {/* {DataPage ? <View style={{ paddingTop: 20, flexDirection: 'row' }}> */}
        {/* <ButtonTotal youtubeURL={DataPageVideo} /> */}
        {/* <ButtonTotal youtubeURL={DataPage.videoUrl} />
        </View> : ""} */}



        {/* <Text>{type === "Video" ? <VideoComponent item={DataPage} /> : type === "Audio" ? <AudioComponent item={DataPage} /> : "ll"}</Text> */}
        <ButtonC1Cricle
          styleData={{ marginLeft: 20, marginTop: 25 }}
          onPress={() => { OtherDownloads(`${GUEST_URL}/${DataPage.videoUrl}`, `${DataPage.title} : ${DataPage.type}`) }}
        >

          <Feather name="arrow-down" size={20} color="white" />
        </ButtonC1Cricle>



        {/* <OtherDownloadBtn
          URL_Download={`${GUEST_URL}/${DataPage.videoUrl}`}
          filename={`${DataPage.title} : ${DataPage.type}`}
        /> */}

        {relatedPosts ? <View>
          <Snap_Carousel7 relatedPostsData={relatedPosts} />
        </View> : <View>
          <Text>No Related Posts</Text>
        </View>}
        <View style={{ height: 20 }}>

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
  },

  paragraphy_U11: {
    fontSize: 16,
    fontWeight: '500'

    //   color: #000;
    // font-family: Jost;
    // font-size: 10px;
    // font-style: normal;
    // font-weight: 300;
    // line-height: 130%; /* 13px */
  }

})