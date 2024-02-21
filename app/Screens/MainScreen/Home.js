import { SafeAreaView, View, ScrollView, RefreshControl, Text, Button } from 'react-native'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'

import Snap_Carousel1 from '../../Components2/Snap_Carousel1';
import Snap_Carousel2 from '../../Components2/Snap_Carousel2';
import Snap_Carousel3 from '../../Components2/Snap_Carousel3';
import Snap_Carousel4 from '../../Components2/Snap_Carousel4';
import Snap_Carousel5 from '../../Components2/Snap_Carousel5';
import Snap_Carousel6 from '../../Components2/Snap_Carousel6';

import { HomePageData } from '../../utils/API_Calls';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [isData, setIsData] = useState() 
  const [Banners, setBanners] = useState()
  const [meditationTracks, setMeditationTracks] = useState()
  const [pravachan, setPravachan] = useState()
  const [previousEvents, setPreviousEvents] = useState()
  const [bhanaja, setBhanaja] = useState()
  const [upComingEvents, setUpComingEvents] = useState()

  const [isConnected, setIsConnected] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);



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

  const HomeData = async () => {
    setSpinnerbool(true)

    try {
      const res = await HomePageData(tokenn)

      if (res) {
        setIsData(res.data)
        setBanners(res.data.banners)
        setMeditationTracks(res.data.meditationTracks)
        setPravachan(res.data.pravachan)
        setPreviousEvents(res.data.previousEvents)
        setBhanaja(res.data.bhanaja)
        setUpComingEvents(res.data.upComingEvents)


        // console.log("Data Testing Passed",meditationTracks,"pravachan",pravachan,"<previousEvents>",previousEvents,"<bhanaja>",bhanaja,".",upComingEvents)

      }
      else {
        console.log(">>> 123")

      }


    } catch (error) {
      setTimeout(() => {
        console.log("Error in fetching", error.response.status)
      }, 1000);

      setTimeout(() => {
        setSpinnerbool(false)
      }, 5000)
    }
    finally {
      setSpinnerbool(false)

      setRefreshing(false)
    }
  }







  // useLayoutEffect(() => {

  //   Stack.Navigator.defaultProps = {
  //     screenOptions: {
  //       headerShown: true,
  //     },
  //   };
  // }, []);

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
    <SafeAreaView>
      <View style={{ paddingTop: 0 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >

          {isConnected ? <View>


            {isData ? <View>

              <Snap_Carousel1 BannerData={Banners} />

              <Snap_Carousel2 BannerData2={meditationTracks} />


              <Snap_Carousel3 BannerDataPravachan={pravachan} />


              <Snap_Carousel4 PreviousEventsData={previousEvents} />

              <Snap_Carousel5 BannerDataBajana={bhanaja} />

              <Snap_Carousel6 Up_Coming_EventsData={upComingEvents} />

            </View> : ""}
          </View> : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 150 }} >
              <Text>No network found</Text>
              <Text>Please check your internet connection</Text>
              <Button title='go to Downloads' onPress={() => { navigation.navigate("Downloads") }}></Button>
            </View>
          )}

        </ScrollView>

      </View>


    </SafeAreaView>
  )
}

export default Home

