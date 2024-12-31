import { Button, Dimensions, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


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
import { useFocusEffect, useNavigation } from '@react-navigation/native';

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
import { BASE_URL, GUEST_URL } from '../../Enviornment.js';
import OtherDownloadBtn from '../../DownloadMain/OtherDownloadBtn.js';
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar.js';
import { Video } from 'expo-av';
import Metrics from '../../utils/ResposivesUtils/Metrics.js';
import PlayIcon from '../../assets/SVGS/MusicPlayer/Player/PlayIcon.js';
import PauseIcon from '../../assets/SVGS/MusicPlayer/Player/Pause.js';
import UnMuteIcon from '../../assets/SVGS/MusicPlayer/Player/UnMuteIcon.js';
import MuteIcon from '../../assets/SVGS/MusicPlayer/Player/MuteIcon.js';


import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomAlerts_Continue } from '../../utils/CustomReuseAlerts.js';
const VideoScreen = ({ route }) => {
  const { id, download } = route.params

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)


  const [downloadedFiles, setDownloadedFiles] = useState([]);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const fetchDownloads = async () => {
    const files = await AsyncStorage.getItem('SatyaSadhnaDownload');
    console.log("files", files);
    setDownloadedFiles(files ? JSON.parse(files) : []);
  };

  useFocusEffect(
    useCallback(() => {
      fetchDownloads();
    }, [])
  );


  const [isMuted, setIsMuted] = useState(false);

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


  const togglePlayingss = useCallback(() => {
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


  // useEffect(() => {
  //   HomeData()
  // }, [])

  useEffect(() => {
    HomeData()
  }, [id])


  // console.log("djhfv",`${BASE_URL}/${DataPage.videoUrl}`)

  const HomeData = async () => {
    setSpinnerbool(true)

    try {
      const res = await VideoPageData(tokenn, id)

      if (res) {


        setType(res.data.postDetails.type)

        setDataPage(res.data.postDetails)
        setRelatedPosts(res.data.relatedPosts)
        setTitle(res.data.postDetails.title)
        setVideoID(getIdFromUrl(res.data.postDetails.videoUrl))


        if (download) {
          // Alert.alert('Want to download the track')
          CustomAlerts_Continue(
            `Download`,
            `Would you like to save this track for offline listening?`,
            // `Applying for ${data.jobTitle}`,
            // data.jobTitle,
            () => {
              setTimeout(() => {
                downloadFile(`${BASE_URL}/${res.data.postDetails.videoUrl}`, `${res.data.postDetails.title}` + '.mp4', id)
                // downloadFile(`${BASE_URL}/${DataPage.videoUrl}`, `${DataPage?.title}` + '.mp4', `${DataPage?._id}`)

              }, 700)
            }
          )
        }

      }
      else {
        console.log("No Respones")
      }


    } catch (error) {
      setTimeout(() => {
        console.log("Error in fetching", error)
      }, 1000);


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


  const togglePlaying = () => {
    if (playing) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setPlaying(!playing);
  };


  const toggleMute = async () => {
    if (videoRef.current) {
      await videoRef.current.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    }
  };



  const downloadFile = async (fileUrl, fileName, id) => {

    try {
      // Check if the file is already downloaded
      const isAlreadyDownloaded = downloadedFiles.some(file => file.id === id);
      if (isAlreadyDownloaded) {
        Alert.alert('Already downloaded', 'This file has already been downloaded.',
          [
          { text: 'go to downloads', onPress: () => navigation.navigate('Downloads') },
          { text: 'OK', onPress: () => { } }
        ]);
        return;
      }

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Cannot download without media library access.');
        return;
      }


      setDownloadLoading(true);

      const fileUri = FileSystem.documentDirectory + fileName;
      const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);

      // Add the new file to the downloaded files list
      const newDownload = {
        id: id,
        name: fileName,
        fileURL: uri,
        fileType: "video", // "audio" or "video"
      };


      const filesx = await AsyncStorage.getItem('SatyaSadhnaDownload');
      var data = JSON.parse(filesx)
      // const updatedFiles = [...downloadedFiles, newDownload];
      const updatedFiles = [...data, newDownload];

      // Save the updated files list to AsyncStorage
      await AsyncStorage.setItem('SatyaSadhnaDownload', JSON.stringify(updatedFiles));

      setDownloadedFiles(updatedFiles);
      // Alert.alert('Download complete', `The ${fileType} file has been downloaded successfully.`);

      Alert.alert('Download complete', `The ${fileType} file has been downloaded successfully.`,
        [
          { text: 'go to downloads', onPress: () => navigation.navigate('Downloads') },
          { text: 'OK', onPress: () => { } }
        ]);
    } catch (error) {
      console.error(`Error downloading ${fileType} file:`, error);
    } finally {
      setDownloadLoading(false);
    }
  };



  console.log(DataPage, "DataPage")

  return (
    <View>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />
      <Spinner
        visible={spinnerBool || downloadLoading}
        color={"#5F2404"}
        animation={'fade'}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{ flex: 1 }}>
          <Video
            ref={videoRef}
            source={{
              uri: `${BASE_URL}/${DataPage?.videoUrl}`,
            }}
            style={styles.video}
            useNativeControls
            // useNativeControls={false}
            resizeMode="contain"
            onPlaybackStatusUpdate={(status) => {
              console.log("onPlaybackStatusUpdate", status)
              if (status.isLoaded) {
                setIsVideoLoaded(true)
              }
              setIsPlaying(status.isPlaying)
            }}
          />
          {!isVideoLoaded &&
            <View style={[styles.video, { position: 'absolute', top: 0, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{ color: 'white' }}>Loading.....</Text>
            </View>}

          <View style={{ marginHorizontal: 17 }}>
            {DataPage ? <Text style={[{
              fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(16), textAlign: 'center', marginTop: 10
            }]} numberOfLines={2} >{DataPage.title}</Text> : <Text>"....."</Text>}


            {DataPage ? <Text style={[{
              fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(12), marginTop: 10
            }]}
              numberOfLines={3}
            >{DataPage.description}</Text> : <Text>"....."</Text>}
          </View>

          <View style={{
            width: '70%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            alignSelf: 'center'
          }}>
            <TouchableOpacity style={[styles.button, {}]} onPress={() => { toggleMute() }}>
              {isMuted ? <MuteIcon /> : <UnMuteIcon />}
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, {
              borderRadius: Metrics.rfv(25),
              width: Metrics.rfv(50),
              height: Metrics.rfv(50),
            }]} onPress={() => { togglePlaying() }}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, {}]} onPress={() => {
              // console.log("whjvfjjhs ....",`${BASE_URL}/${DataPage.videoUrl}`)
              downloadFile(`${BASE_URL}/${DataPage.videoUrl}`, `${DataPage?.title}` + '.mp4', `${DataPage?._id}`)
            }}>
              <Feather name="arrow-down" size={20} color="white" />
            </TouchableOpacity>




          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default VideoScreen

const styles = StyleSheet.create({

  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (9 / 16), // 16:9 aspect ratio
  },

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
  },
  button: {
    backgroundColor: '#030370',
    borderRadius: Metrics.rfv(20),
    width: Metrics.rfv(40),
    height: Metrics.rfv(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
})