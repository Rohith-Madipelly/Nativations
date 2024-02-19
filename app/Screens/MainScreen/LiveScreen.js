import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { LivePageData } from '../../utils/API_Calls';
import YoutubePlayer from "react-native-youtube-iframe";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { getIdFromUrl } from '../../utils/getIdFromUrl';
import CustomButton from '../../Components/UI/Button/ButtonC1Cricle';

const LiveScreen = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  let tokenn = useSelector((state) => state.token);



  const [livePage, setLivePage] = useState()
  const [VideoID, setVideoID] = useState()

  const [relatedPosts, setRelatedPosts] = useState()


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

  const HomeData = async () => {

    // setSpinnerbool(true)

    try {
      const res = await LivePageData(tokenn)

      if (res) {
        setLivePage(res.data)
        console.log("Data", res.data)
        console.log("Data", res.data.description)
        console.log("Data", res.data.liveUrl)
        console.log("Data", res.data.title)

        setVideoID(getIdFromUrl(res.data.liveUrl))
      }
      else {
        console.log("No Res")

      }


    } catch (error) {
      setTimeout(() => {
        console.log("Error in fetching", error.response.status)
      }, 1000);
      console.log(error)

      setTimeout(() => {
        // setSpinnerbool(false)
      }, 5000)
    }
    finally {
      // setSpinnerbool(false)

    }
  }

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
  } else {
  }


  return (
    <View >
      {!livePage ? <View style={{ backgroundColor: 'black', height: 202, justifyContent: 'center', alignItems: 'center', margin: 5, marginTop: 10 }}>
        <Text style={{ color: 'white', fontSize: 25 }}>Live Screen</Text>
        <Text style={{ color: 'white' }}>Currently live was ended or not avaliable </Text>

      </View> : <View style={{ width: '100%' }}>
        <YoutubePlayer
          height={222}
          play={playing}
          // videoId={ScreenData.VideoID}
          videoId={VideoID}
          onChangeState={onStateChange}
          showinfo={false}
          controls={1}
        />
        <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <View style={{width:'50%'}}>

          <CustomButton
            onPress={togglePlaying}
            styleData={{ paddingHorizontal: 10, marginVertical: 5 }}>
            {playing ? "pause" : "Watch Live"}
          </CustomButton>
        </View>
        </View>

      </View>}
    </View>
  )
}

export default LiveScreen

const styles = StyleSheet.create({})