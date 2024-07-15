import { Text, StyleSheet, ImageBackground, View, ScrollView, Image, TouchableOpacity, Alert, Platform, Button, RefreshControl } from 'react-native'
import React, { Component, useCallback, useEffect, useState } from 'react'
// import { Button } from '../../screenComponents'
import { useDispatch, useSelector } from "react-redux";
import { setToken } from '../../redux/actions/loginAction'
import { useNavigation } from '@react-navigation/native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Entypo,
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons, FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { GetPlayStoreAPI, UserGetProfileDetails } from '../../utils/API_Calls'
import { OpenStore } from '../../utils/OpenStore';
import onShare from '../../utils/ShareBtn';
import NetInfo from '@react-native-community/netinfo';
import { LogOutHandle123 } from '../../utils/LogOut';


const Profile = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [UserName, setUserName] = useState("")
  const [StartingLetter, setStartingLetter] = useState("")
  const [profilepic, setProfilepic] = useState(null)

  const [appLink, setAppLink] = useState()
  const [appCall, setAppCall] = useState()
  const dispatch = useDispatch();
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
      ProfileNameKosam()
    }
  }, [])


  // >>>>>>>>>>>>>>>>>
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    if (isConnected) {
      ProfileNameKosam()
    }

  }, [isConnected]);


  // >>>>>>>>>>>>>>>>>>


  const ProfileNameKosam = async () => {
    setSpinnerbool(true)
    // console.log(tokenn)
    try {
      const res = await UserGetProfileDetails(tokenn)


      if (res) {
        console.log(">>>", res.data)

        setUserName([res.data.username])
        setStartingLetter(res.data.username.charAt(0))
        var datadsd = res.data.profile_picture
        // setProfilepic(datadsd)
        Rate_Review(tokenn)

        if (datadsd == "") {
        }
        else {
          setProfilepic(`http://satyasadhna.com:8001/pictures/${datadsd}`)
        }

        setSpinnerbool(false)
      }
      else {

      }
    } catch (error) {
      console.log(">>>>>>>.", error)
      // Alert.alert(`Something Went Wrong ${error.code} `)

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
        if (error.request.status === 0) {
          // console.log("error in request ",error.request.status)
          // Alert.alert("Something Went Wrong")
        }
      }
      else {
        Alert.alert("Error in Setting up the Request")
      }
    }
    finally {
      setSpinnerbool(false)
      setRefreshing(false);

    }
  }

  const Rate_Review = async (tokenn) => {
    try {
      const res = await GetPlayStoreAPI(tokenn)

      if (res) {
        setAppLink(res.data.playStore)
      }
      else {
        console.log("sad")
      }
    } catch (error) {
      setTimeout(() => {
        console.log("Error in fetching", error)
      }, 1000);
    }
    finally {

    }
  }


  const logoutValidation = async () => {
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

  const navigation = useNavigation();

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
    <View>
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />
      <ScrollView style={[{ borderTopRightRadius: 25, borderTopLeftRadius: 25, backgroundColor: "#FFF" }]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }

      >
        <View style={[{ paddingLeft: 29, paddingTop: 30, paddingRight: 20 }]}>


          <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("FullProfile") }}>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

              <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                <View>


                  {/* {profilepic ? <View style={styles.outerCircle}>
                    <ImageBackground
                      style={styles.innerCircle}
                      // source={profilepic}
                      source={{
                        uri: profilepic,
                      }}
                      resizeMode="cover"
                      onError={(error) => Alert.alert("Error in ", error)}
                    >

                    </ImageBackground>
                  </View> : */}
                  <View style={styles.outerCircle}>
                    <ImageBackground
                      style={styles.innerCircle}
                      source={require("../../../assets/InternalImages/profile.png")}
                      resizeMode="cover"
                      onError={(error) => Alert.alert("Error in ", error)}

                    >
                      <Text style={styles.letter}>{StartingLetter.toLocaleUpperCase()}</Text>
                    </ImageBackground>
                  </View>
                  {/* }  */}
                </View>

                <View style={{ margin: 5, marginLeft: 14 }}>
                  <Text>{UserName}</Text>
                  <Text>Show profile</Text>
                </View>


              </View>

              <View style={{ marginTop: 10 }}>
                <Image style={{ width: 22, height: 22 }}
                  source={require("../../../assets/InternalImages/right.png")}
                  resizeMode={"contain"} />
              </View>
            </View>
          </TouchableOpacity>
          
          <View style={styles.Heading_u2}>
            <View>


              <Text style={[styles.Heading_u2, { marginBottom: 28 }]}>Account</Text>

              <View style={{ marginBottom: 10 }}>


                {/* <Pressable onp> */}
                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("FullProfile") }}>



                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }} >

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/InternalImages/ProfileLogos/account-circle-outline.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Profile</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/InternalImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>
                </TouchableOpacity>
                {/* </Pressable> */}


              </View>

              {/* Password tab */}
              <View style={{ marginBottom: 10 }}>


                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("ProfilePassword") }}>

                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/InternalImages/ProfileLogos/lock-outline.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Password</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/InternalImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>
                </TouchableOpacity>

              </View>
              {/* Password tab  end*/}




              {/* notification tab end */}

              <View style={{ marginBottom: 10 }}>

                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("FormScreen") }}>


                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/InternalImages/ProfileLogos/eidt.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Fill Form</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/InternalImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>
                </TouchableOpacity>

              </View>


            </View>



            <View>
              <Text style={[styles.Heading_u2, { marginBottom: 28 }]}>More</Text>








              <View style={{ marginBottom: 10 }}>

                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("SatyaSadhana") }}>

                  {/* About */}
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/InternalImages/ProfileLogos/alert-circle-outline.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>About Satya Sadhna</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/InternalImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>

                </TouchableOpacity>
              </View>


              <View style={{ marginBottom: 10 }}>

                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("About_Guruji") }}>

                  {/* About */}
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/InternalImages/ProfileLogos/alert-circle-outline.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Know About Guruji</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/InternalImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>

                </TouchableOpacity>
              </View>


              <View style={{ marginBottom: 10 }}>

                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("Privacy Policy") }}>


                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/InternalImages/ProfileLogos/account-lock-outline.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Privacy Policy</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/InternalImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>

                </TouchableOpacity>
              </View>


              {/* Rate & Review tab */}
              <View style={{ marginBottom: 10 }}>

                <TouchableOpacity activeOpacity={0.6} onPress={() => { OpenStore(appLink) }
                  // () => { navigation.navigate("ProfileRateAndReview") }
                }>


                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/InternalImages/ProfileLogos/hexagram.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Rate & Review</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/InternalImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>

                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 10 }}>

                {/* <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("ProfileShareApp") }}> */}
                <TouchableOpacity activeOpacity={0.6} onPress={() => { onShare(appLink) }}>
                  {/* onShare */}

                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/InternalImages/ProfileLogos/share-all-outline.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Share App</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/InternalImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>

                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 10 }}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("DeleteAccount") }}>

                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 22, height: 22, }}
                          source={require("../../../assets/InternalImages/ProfileLogos/trash.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Delete Account</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/InternalImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 10 }}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => { logoutValidation() }}>

                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        {/* <Image style={{ width: 22, height: 22, }}
                          source={require("../../../assets/InternalImages/ProfileLogos/logout.svg")}
                          resizeMode={"contain"} /> */}
                        <MaterialCommunityIcons name={'logout'} size={22} color={'black'} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Log out</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/InternalImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>
                </TouchableOpacity>
              </View>



            </View>
          </View>




        </View>
        {/* <View style={[{ padding: 29, paddingTop: 0, paddingRight: 60, paddingLeft: 60, paddingBottom: 10 }]}> */}
        {/* <Button title='LogOut' onPress={() => { logoutValidation() }}>Logout</Button> */}
        {/* <Button title='Log out' onPress={() => { logoutValidation() }}></Button>
        </View> */}



      </ScrollView>

    </View>
  )

}

export default Profile;



const styles = StyleSheet.create({
  Heading_1: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  Heading_u2: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  Heading_u3: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },



  outerCircle: {
    width: 50,
    height: 50,
    borderRadius: 75,
    overflow: 'hidden', // Ensure inner content doesn't overflow
  },
  innerCircle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontSize: 24,
    color: '#fff', // Change the text color as needed
  },

});



// import React from 'react'

// const ProfilePage = () => {
//   return (
//     <div>ProfilePage</div>
//   )
// }

// export default ProfilePage