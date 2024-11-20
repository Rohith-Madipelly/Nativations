import { SafeAreaView, View, ScrollView, RefreshControl, Text, Button, Alert } from 'react-native'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'

import Snap_Carousel1 from '../../Components2/Snap_Carousel1';
import Snap_Carousel2 from '../../Components2/Snap_Carousel2';
import Snap_Carousel3 from '../../Components2/Snap_Carousel3';
import Snap_Carousel5 from '../../Components2/Snap_Carousel5';


import { HomePageData } from '../../utils/API_Calls';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { LogOutHandle123 } from '../../utils/LogOut';
import { useDispatch } from 'react-redux';
import { ErrorResPrinter } from '../../utils/ErrorResPrinter';
import { ImageBackground } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Metrics from '../../utils/ResposivesUtils/Metrics';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import LoadingImage from '../../Components/ImageConatiners/LoadingImage';
import ProfileActive from '../../assets/SVGS/ProfileActive';
import FormDataIcons from '../../assets/SVGS/Home/FormDataIcons';
import Donation from '../../assets/SVGS/Home/Donation';
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar';


import { useToast } from "react-native-toast-notifications";
import MusicList from '../../Components2/Music/MusicList';
import QuoteOfDay from '../../Components2/Quote/QuoteOfDay';
import { FontAwesome5 } from '@expo/vector-icons';
import QuoteIconColorHome from '../../assets/SVGS/Home/QuoteIconColorHome';
import onShare from '../../utils/ShareBtn';
import TracksIcons from '../../assets/SVGS/Home/TracksIcons';
import NoInternetImage from '../../assets/SVGS/UIScrees/NoInternetImage';
const Home = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [isData, setIsData] = useState()
  const [Banners, setBanners] = useState()
  const [Quote, setQuote] = useState()
  const [meditationTracks, setMeditationTracks] = useState()
  const [pravachan, setPravachan] = useState()
  const [previousEvents, setPreviousEvents] = useState()
  const [bhanaja, setBhanaja] = useState()
  const [upComingEvents, setUpComingEvents] = useState()

  const [isConnected, setIsConnected] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toast = useToast();



  const NavigationTo = (item, download) => {
    if (item.type == "Youtube" || item.type == undefined) {
      navigation.navigate('YoutudeScreen', { id: `${item.id}`, download: download })
      // console.log("chgchgcjyhcjhc", item.id)
    }
    else if (item.type == "Audio") {
      console.log("this is Audio ")
      navigation.navigate('AudioScreen', { id: `${item.id}`, download: download })
    }
    else if (item.type == "Video") {
      // console.log("video")
      navigation.navigate('VideoScreen', { id: `${item.id}`, download: download })
    }
  }

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
        setQuote(res.data.recentQoute.quote)
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
        <NoInternetImage/>
        <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(3, 3, 112, 1)', fontSize: Metrics.rfv(20),marginTop:18}}>No network found</Text>
        <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'rgba(3, 3, 112, 1)', fontSize: Metrics.rfv(18)}}>Please check your internet connection</Text>
        <Button title='go to Downloads' onPress={() => { navigation.navigate("Downloads") }}></Button>
      </View>
    );
  } else {
  }


  return (
    // <SafeAreaView>
    <View style={{ paddingTop: 0, marginBottom: 0, backgroundColor: 'white' }}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >

        {isConnected ? <View>


          {isData ? <View >
            <View style={{ height: 20 }}>
            </View>

            {/* Parent View */}
            <TouchableOpacity style={{ maxHeight: Metrics.height * 0.12, minHeight: 120, backgroundColor: '#030370', padding: 10, marginHorizontal: 10, borderRadius: 13 }} onPress={() => { navigation.navigate("About_SatyaSadhana") }}>
              <ImageBackground
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%' }}
                // contentFit="fixed"
                blurRadius={0.2}
                resizeMode='fill'
                source={require("../../assets/image/Home/Vector.png")}
              >
                <View style={{ width: '100%', margin: 5, marginTop: 10, marginLeft: 7 }}>
                  <Text style={{ fontFamily: 'VIVALDII', color: 'white', fontSize: Metrics.rfv(29) }}>Satya Sadhna Meditation</Text>
                  <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'white', fontSize: Metrics.rfv(15), }}>The path to peace of mind & eternal bliss</Text>
                </View>

                <TouchableOpacity style={{ flexDirection: 'row', margin: 5, marginLeft: 7 }} onPress={() => { navigation.navigate("About_SatyaSadhana") }}>
                  <Text style={{ fontFamily: 'Gabarito-VariableFont', color: 'white', fontSize: Metrics.rfv(10) }}>Learn More</Text><Entypo name="chevron-right" size={Metrics.rfv(12)} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </TouchableOpacity>




            <View style={{ maxHeight: Metrics.height * 0.12, minHeight: Metrics.width * 0.26, flexDirection: 'row', justifyContent: 'space-evenly', padding: 5, marginHorizontal: 5, borderRadius: 13, marginTop: 5, }}>

              <TouchableOpacity style={{ flex: 0.23, }}
                onPress={() => {
                  navigation.navigate("FormScreen")
                }}
              >

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(168, 168, 255, 0.19)', borderRadius: 13, }}>
                  <FormDataIcons />
                </View>

                <View style={{ marginTop: 5 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(12) }}>Register</Text>
                </View>
              </TouchableOpacity>




              <TouchableOpacity style={{ flex: 0.23, }}
                onPress={() => {
                  navigation.navigate("Donation")
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(168, 168, 255, 0.19)', borderRadius: 13, }}>
                  <Donation />
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(12) }}>Donation</Text>
                </View>
              </TouchableOpacity>




              <TouchableOpacity style={{
                flex: 0.23,
              }}
                onPress={() => {
                  navigation.navigate("Quotes")
                }}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(168, 168, 255, 0.19)', borderRadius: 13, }}>
                  {/* <Donation /> */}
                  <QuoteIconColorHome />
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(12) }}>Quotes</Text>
                </View>
              </TouchableOpacity>



              <TouchableOpacity style={{ flex: 0.23, }}
                onPress={() => {
                  navigation.navigate("TracksAudios")
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(168, 168, 255, 0.19)', borderRadius: 13, }}>
                  <TracksIcons />
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(12) }}>
                    All Tracks
                    {/* Tracks & Audios */}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity style={{
                flex: 0.23,
              }}
                onPress={() => {
                  onShare("https://play.google.com/store/apps/details?id=vardhaman.satyasadhnaOne&hl=en")
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(168, 168, 255, 0.19)', borderRadius: 13, }}>
                  <FontAwesome5 name="share-square" size={24} color="rgba(3, 3, 112, 1)" />
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(12) }}>Share our app</Text>
                </View>
              </TouchableOpacity> */}

            </View>



            <View style={{ position: 'relative', marginTop: 20 }} onPress={() => { navigation.navigate("About_Guruji") }}>
              <View style={{ flexDirection: 'row', maxHeight: Metrics.height * 0.12, minHeight: 120, backgroundColor: 'rgba(168, 168, 255, 0.19)', padding: 5, marginHorizontal: 10, borderRadius: 13, }}>
                <View
                  style={{ width: '60%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%' }}
                >
                  <View style={{ width: '65%', margin: 5, marginTop: 10, marginLeft: 7 }}>
                    <Text style={{ fontFamily: 'Gabarito-VariableFont', fontSize: Metrics.rfv(18), color: '#030370', }}>About Acharya Ji</Text>
                    <Text style={{ fontFamily: 'Gabarito-VariableFont', fontSize: Metrics.rfv(11), color: '#030370', marginBottom: 5 }}>Acharya Jin Chandra Suriji himself started  practicing meditation from the initial days of his Acharyapad.</Text>
                  </View>

                  <TouchableOpacity style={{ flexDirection: 'row', margin: 5, marginLeft: 7 }} onPress={() => { navigation.navigate("About_Guruji") }}>
                    <Text style={{ fontFamily: 'Gabarito-VariableFont', color: '#030370', fontSize: Metrics.rfv(10) }}>Learn More</Text><Entypo name="chevron-right" size={Metrics.rfv(12)} color="#030370" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ width: '40%', position: 'absolute', bottom: 0, right: 3 }}>
                <LoadingImage
                  source={require("../../assets/image/Home/AboutImage.png")}
                  // style={{ minHeight: Metrics.height * 0.18, minHeight: 260, }}
                  style={{ minHeight: Metrics.height * 0.18 }}
                  loaderColor="#ff0000"
                  resizeMode='contain'
                />
              </View>
            </View>

            {/* <View style={{ position: 'relative',marginTop:2 }}>

              <View style={{ maxHeight: Metrics.height * 0.12, minHeight:  Metrics.height * 0.12, backgroundColor: 'rgba(168, 168, 255, 0.19)', padding: 10, marginHorizontal: 10, borderRadius: 13, marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '60%', backgroundColor: 'red' }}>
                    <Text>shdvhjvc</Text>
                  </View>

                </View>

              </View>

              <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center',position:'absolute',top:-10,bottom:5 ,right:5}}>
               

                <LoadingImage
                  source={require("../../assets/image/Home/AboutImage.png")}
       
                  style={{  height: '105%' }}
                  loaderColor="#ff0000" 
                
                />
              </View>
            </View> */}

            <MusicList Data={meditationTracks} ClickAction={(item, download) => {
              console.log("Helo", item);
              NavigationTo(item, download)
            }} />

            <QuoteOfDay Quote={Quote||"If you want peace then calm your desires"} isQuoteOfDay={true} />
            {/* <Snap_Carousel2 BannerData2={meditationTracks} CarouselName={'Meditation Tracks'} /> */}

            <View style={{ height: 20 }}>


            </View>



            {/* <Snap_Carousel3 BannerDataPravachan={pravachan} /> */}

            <Snap_Carousel2 BannerData2={previousEvents} CarouselName={'Pravachan / Event Videos'} />



            <Snap_Carousel5 BannerDataBajana={bhanaja} />

            <Snap_Carousel2 BannerData2={upComingEvents} CarouselName={'Upcoming Events'} />
            {/* <Snap_Carousel1 BannerData={Banners} /> */}
            {/*<Snap_Carousel6 Up_Coming_EventsData={upComingEvents} />*/}
            <View style={{ height: 20 }}>
            </View>

          </View> :
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
              <Text>No Data Found</Text>
            </View>}
        </View> : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text>No network found</Text>
            <Text>Please check your internet connection</Text>
            <Button title='go to Downloads' onPress={() => { navigation.navigate("Downloads") }}></Button>
          </View>
        )}


<View style={{height:70}}>
  <Text></Text>
</View>
      </ScrollView>

    </View>



  )
}

export default Home

