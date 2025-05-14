import { Alert, Button, Dimensions, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { LivePageData } from '../../utils/API_Calls';
import YoutubePlayer from "react-native-youtube-iframe";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { getIdFromUrl } from '../../utils/getIdFromUrl';
import CustomButton from '../../Components/UI/Button/ButtonC1Cricle';
import NetInfo from '@react-native-community/netinfo';
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar';
import GlobalStyles from '../../Components/UI/GlobalStyles';
import NoInternetImage from '../../assets/SVGS/UIScrees/NoInternetImage';
import Metrics from '../../utils/ResposivesUtils/Metrics';
import Spinner from 'react-native-loading-spinner-overlay';
const LiveScreen = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  let tokenn = useSelector((state) => state.token);

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [livePage, setLivePage] = useState()
  const [VideoID, setVideoID] = useState()

  const [relatedPosts, setRelatedPosts] = useState()


  const navigation = useNavigation();
  const [playing, setPlaying] = useState(false);

  // >>>>>>>>>>>>>>>>>
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (isConnected) {
      HomeData()
    }

  }, []);


  // >>>>>>>>>>>>>>>>>>





  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);


  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);







  const { width, height } = Dimensions.get('screen')
  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
    if (err.response.status === 500) {
      console.log("Internal Server Error", err.message)
    }
  }


  useEffect(() => {
    if (isConnected) {
      HomeData()
    }
  }, [isConnected])

  const HomeData = async () => {

    setSpinnerbool(true)

    try {
      const res = await LivePageData(tokenn)

      if (res) {
        setLivePage(res.data)
        setVideoID(getIdFromUrl(res.data.liveUrl))
      }
      else {
        console.log("No Res")

      }


    } catch (error) {
      console.log(">>>>>>>.", error)
      Alert.alert(`Something Went Wrong ${error.code} `)


      if (error.response) {
        if (error.response.status === 401) {
          console.log("Error With 400.>>>>>>>>>>>>>>>>>>>>>>>>>>>>", error.response.status)
          // ErrorResPrinter("Failed Please Login again ")
          Alert.alert('something went wrong', 'Please Login again',
            [{ text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            {
              text: 'YES', onPress: () => {
                // LogOutHandle()
                LogOutHandle123(dispatch)
                // navigation.navigate('Decide-navigator')
              }
            }]
          )
        }
        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
      }
      else if (error.request) {
        // Alert.alert("Something Went Wrong")
      }
      else {
        Alert.alert("Error in Setting up the Request")
      }


    }
    finally {
      setSpinnerbool(false)
      // setRefreshing(false)

    }
  }



  if (!isConnected) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
        <NoInternetImage />
        <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(3, 3, 112, 1)', fontSize: Metrics.rfv(20), marginTop: 18 }}>No network found</Text>
        <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(3, 3, 112, 1)', fontSize: Metrics.rfv(18) }}>Please check your internet connection</Text>
        <Button title='go to Downloads' onPress={() => { navigation.navigate("Downloads") }}></Button>
      </View>
    );
  } else {
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
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />
      <CustomStatusBar barStyle="dark-content" backgroundColor={GlobalStyles.CustomStatusBarMainColor} />
      {!livePage ? <View style={{ backgroundColor: 'black', height: 202, justifyContent: 'center', alignItems: 'center', margin: 5, marginTop: 10 }}>
        <Text style={{ color: 'white', fontSize: 25 }}>Live Screen</Text>
        <Text style={{ color: 'white' }}>Currently live was ended or not avaliable </Text>

      </View> : <View style={{ width: '100%' }}>
        <View style={{ flex: 1 }}>
          {/* <Text>{height}</Text> */}

          <YoutubePlayer
            height={
              height >= 1000 ? height * 0.44 : height * 0.28}
            play={playing}
            // videoId={ScreenData.VideoID} yUNu2bMUEfg
            // videoId={VideoID || "Wr4iJon5zC8"}
            videoId={VideoID || "Wr4iJon5zC8"}
            onChangeState={onStateChange}
            showinfo={true}
            controls={1}
            onReady={(e) => { console.log("Jhgfc", e) }}
            style={{}}
            contentScale={0.9}
          />
        </View>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '50%' }}>

            <CustomButton
              onPress={togglePlaying}
              styleData={{ paddingHorizontal: 10, marginVertical: 5 }}>
              {playing ? "pause" : "Watch Live"}
            </CustomButton>
          </View>

          <Text style={{ width: "90%", fontSize: 20, fontWeight: 700 }} >{livePage.title}</Text>
          <Text style={{ width: "90%" }} numberOfLines={6}><Text style={{ fontWeight: 600 }}>Description : </Text>{livePage.description}</Text>

        </View>

      </View>}
    </ScrollView>
  )
}

export default LiveScreen

const styles = StyleSheet.create({})