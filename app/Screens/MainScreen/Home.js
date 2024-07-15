import { SafeAreaView, View, ScrollView, RefreshControl, Text, Button, Alert } from 'react-native'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'

// import Snap_Carousel1 from '../../Components2/Snap_Carousel1';
// import Snap_Carousel2 from '../../Components2/Snap_Carousel2';
// import Snap_Carousel3 from '../../Components2/Snap_Carousel3';
// import Snap_Carousel4 from '../../Components2/Snap_Carousel4';
// import Snap_Carousel5 from '../../Components2/Snap_Carousel5';
// import Snap_Carousel6 from '../../Components2/Snap_Carousel6';

import { HomePageData } from '../../utils/API_Calls';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { LogOutHandle123 } from '../../utils/LogOut';
import { useDispatch } from 'react-redux';
import { ErrorResPrinter } from '../../utils/ErrorResPrinter';


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
  const dispatch = useDispatch();

  const logoutValidation = async () => {
    console.log("dasda")
    Alert.alert('Logout', 'Are you sure you want to logout ?',
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
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);



  let tokenn = useSelector((state) => state.token);


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

  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
  }

  useEffect(() => {
    if (isConnected) {

    
      HomeData()
    }
  }, [isConnected])

  const HomeData = async () => {
    setSpinnerbool(true)

    try {
      const res = await HomePageData(tokenn)
      if (res) {

        setIsData(true)
        setBanners(res.data.banners)
        setMeditationTracks(res.data.meditationTracks)
        setPravachan(res.data.pravachan)
        setPreviousEvents(res.data.previousEvents)
        setBhanaja(res.data.bhanaja)
        setUpComingEvents(res.data.upComingEvents)

      }
      else {
        console.log(">>> 123")
      }


    } catch (error) {
      setIsData(false)
      // console.log(">>>>>>>.", error)
      // Alert.alert(`Something Went Wrong ${error.code} `)

      if (error.response) {
        if (error.response.status === 401) {
          Alert.alert('Something went wrong', 'Please login again',
            [{ text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            {
              text: 'YES', onPress: () => {
                LogOutHandle123(dispatch);
              }
            }]
          );
        } else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message);
        }
      } else if (error.request) {
        // Alert.alert("Something went wrong");
      } else {
        Alert.alert("Error in setting up the request");
      }
    }
    finally {
      setSpinnerbool(false)

      setRefreshing(false)
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
  if (!isConnected) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
      <Text>No network found</Text>
      <Text>Please check your internet connection</Text>
      <Button title='go to Downloads' onPress={() => { navigation.navigate("Downloads") }}></Button>
    </View>
    );
  } else {
  }


  return (
    // <SafeAreaView>
      <View style={{ paddingTop: 0, marginBottom: 10 }}>
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

              {/* <Snap_Carousel1 BannerData={Banners} />

              <Snap_Carousel2 BannerData2={meditationTracks} />


              <Snap_Carousel3 BannerDataPravachan={pravachan} />


              <Snap_Carousel4 PreviousEventsData={previousEvents} />

              <Snap_Carousel5 BannerDataBajana={bhanaja} />

              <Snap_Carousel6 Up_Coming_EventsData={upComingEvents} /> */}

            </View> :
              <View>
                <Text>No Data Found</Text>
              </View>}
          </View> : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
              <Text>No network found</Text>
              <Text>Please check your internet connection</Text>
              <Button title='go to Downloads' onPress={() => { navigation.navigate("Downloads") }}></Button>
            </View>
          )}

        </ScrollView>

      </View>



  )
}

export default Home

