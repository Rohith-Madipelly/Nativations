import { View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Platform, ScrollView, RefreshControl, Button } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { UserGetProfileDetails, UserUpdatedProfileDetails, UserUpdatedProfilePic } from '../../../utils/API_Calls'
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from "react-native-vector-icons/Feather"
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

import { Formik } from "formik";
import { theme, typographyStyles } from "../../../Contants";
// import { ErrorMessage, Button } from "../../../screenComponents/Auth";
import { useNavigation } from '@react-navigation/native';

import { ProfileUpdatedSchema } from '../../../Fomik/schema/ProfileUpdatedSchema';
import { ToasterSender } from '../../../utils/Toaster';

import NetInfo from '@react-native-community/netinfo';
import CustomTextInput from '../../../Components/UI/Inputs/CustomTextInput';
import axios, { Axios } from 'axios';


const Profile = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [profile, setProfile] = useState("")
  const [UserName, setUserName] = useState("")

  const [FirstName, setFirstName] = useState("")
  const [ErrorFirstName, setErrorFirstName] = useState(false)

  const [LastName, setLastName] = useState("")
  const [ErrorLastName, setErrorLastName] = useState(false)

  const [UserEmail, setUserEmail] = useState("")
  const [UserPhone, setUserPhone] = useState("")
  const [UserDOB, setDOB] = useState("")

  const [age, setAge] = useState("")
  const [Errorage, setErrorAge] = useState("")

  const [gender, setGender] = useState("")
  const [Wallet, setWallet] = useState("")
  const [profilepic, setProfilepic] = useState(null)
  const [editToggle, setEditToggle] = useState(false)

  const [errorEmail, setErrorEmail] = useState(true)

  const navigation = useNavigation();
  const [error, setError] = useState("")
  const loginSelectorToken = useSelector((state) => state.token);


  const FormData = global.formData;


  var tokenn = loginSelectorToken;
  tokenn = tokenn.replaceAll('"', '');

  console.log(tokenn)

  const handleEditToggle = () => {
    setEditToggle(!editToggle);
  }
  const [image, setImage] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  const pickImage = async () => {
    try {


      // No permissions request is necessary for launching the image library
      await ImagePicker.requestMediaLibraryPermissionsAsync()
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });


      const CameraImage = async () => {
        // No permissions request is necessary for launching the image library
        await ImagePicker.requestCameraPermissionsAsync()
        let result = await ImagePicker.launchImageLibraryAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [4, 3],
          // aspect: [1, 1],
          quality: 1,
        });
      }
      // console.log(result.assets[0].uri);

      if (!result.canceled) {

        await saveImage(result.assets[0].uri)

      }
    } catch (error) {
      console.log("try catch pickImage")
    }
  }



  // const saveImage=async(image)=>{
  const saveImage = async (image) => {
    try {
      setImage(image);
      setTimeout(() => { ProfileImageUpload() }, 2000)
      // setTimeout(() => { sendToBackEnd(image) }, 2000)

    } catch (error) {
      console.log(error)
      // or
      // throw error;
    }

  }
  // >>>>>>>>>>>>>>>>>
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // HomeData()
    userData()
  }, []);


  // >>>>>>>>>>>>>>>>>>

  const ProfileImageUpload = async () => {
    setSpinnerbool(true)

    try {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      console.log(image, tokenn)
      const res = await UserUpdatedProfilePic(image, tokenn)

      if (res) {
        // console.log(res)
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.", error.response.data.message)
        }
        else if (error.response.status === 401) {
          console.log("Password is wrong", error.message)
          // setError("Password is wrong")
        }
        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
        else {
          console.log("An error occurred response.")
        }
      }
      else if (error.request) {
        console.log("No Response Received From the Server.")
      }
      else {
        console.log("Error in Setting up the Request.")
      }

    }
    finally {
      setSpinnerbool(false)

    }
  }


  const sendToBackEnd = async (image) => {
    try {
      const formData = new FormData();

      formData.append("picture", {
        uri: image,
        name: 'profile_pic.jpg',
        type: 'image/jpeg',
      });

      const config ={
        headers:{
          "Content-Type":"multipart/form-data",
        },
        transformRequest:()=>{
          return formData;
        }
      }
      await axios.post('http://www.satyasadhna.com:8001/user/uploaddp',formData,config)

      
    } catch (error) {
      console.log(">>>>",error)
    }
  }

  const userData = async () => {
    setSpinnerbool(true)
    try {
      const res = await UserGetProfileDetails(tokenn)


      if (res) {
        setFirstName(res.data.username)
        setLastName(res.data.lastname)
        setUserPhone(res.data.phone_number)


        var datadsd = res.data.profile_picture
        // setProfilepic(datadsd)
        if (datadsd == "") {
        }
        else {
          setProfilepic(`http://satyasadhna.com:8001/pictures/${datadsd}`)
        }
        console.log(profilepic)
      }
      else {

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

  const profilepicUpdated = (image) => {
    console.log(image)
  }


  //Profile API
  useEffect(() => {
    userData()
  }, []);

  const windoWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);


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
    <ScrollView refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>


      <View style={{
        marginTop: 0,
        width: windoWidth,
        height: windowHeight,
      }}>
        <Spinner
          visible={spinnerBool}
          color={"#5F2404"}
          animation={'fade'}
        />
        <View style={{
          position: 'absolute',
          top: 5,
          left: 5,
          right: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 1,
          padding: 10,
        }}>

          <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <Feather name="arrow-left" style={{
              fontSize: 25,
              marginLeft: 2,
              color: 'white'
            }} />
          </TouchableOpacity>


          <TouchableOpacity onPress={() => { pickImage() }} style={{ backgroundColor: '' }}>
            <Feather name="camera" style={{
              fontSize: 20,
              marginLeft: 20,
              color: 'white'
            }} />
          </TouchableOpacity>


        </View>



        <View style={{
          position: 'absolute',
          bottom: 5,
          left: 0,
          right: 0,
          zIndex: 1,
          padding: 10,
          paddingLeft: 25,
          paddingTop: 20,
          backgroundColor: 'white',
          height: 500,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>


          <View>
            <Text style={{ fontSize: 20, fontWeight: 800, }}>User Profile </Text>

            <ImageBackground
              style={{ width: '100%', position: 'relative', paddingTop: 25, marginTop: 1, display: 'flex', alignItems: 'center', height: '90%' }}
              contentFit="fixed"
              // blurRadius={0.2}
              source={require("../../../assets/image/Rectangle 33.png")}
            >

              <View style={{ width: '100%', marginLeft: 20 }}>


                <CustomTextInput
                  boxWidth={'90%'}
                  placeholder={'Enter Your Name'}
                  label={'Name'}
                  name='first'
                  value={FirstName}
                  outlined
                  editable={false}
                  bgColor={'#e5e5e5'}
                />
                <CustomTextInput
                  boxWidth={'90%'}
                  placeholder={'Enter Your Name'}
                  label={'Phone number'}
                  name='first'
                  value={UserPhone}
                  editable={false}
                  bgColor={'#e5e5e5'}

                  outlined
                />
              </View>

            </ImageBackground>
          </View></View>





        {profilepic ? <TouchableOpacity onPress={() => { }}>
          <View style={styles.outerCircle}>
            <ImageBackground
              style={styles.innerCircle}
              // source={profilepic}
              source={{
                uri: profilepic,
              }}
              resizeMode="cover"
            />
          </View></TouchableOpacity> : <TouchableOpacity onPress={() => { }}><View style={styles.outerCircle}>
            <ImageBackground
              style={styles.innerCircle}
              source={require("../../../../assets/profile2.jpg")}
              // source={{
              //     uri: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              //   }}
              // source={require("../../../../assets.jpg")}
              resizeMode="cover"
            >
            </ImageBackground>
          </View>
        </TouchableOpacity>}
        <View>

        </View>

      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({

  inputContainer: {
    marginBottom: 12,

  },

  input: {
    width: 300,
    // backgroundColor: "#121212",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 12,

    borderRadius: 6,
    marginBottom: 6,
    color: "white",
    height: 45,


  },
  TextUR: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '300',
    marginTop: 20
  },
  TextGS: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    marginTop: 20
  },

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
    width: 360,
    height: 360,
    overflow: 'hidden',
  },
  innerCircle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// import { View, Text } from 'react-native'
// import React from 'react'

// const UpdateProfile = () => {
//   return (
//     <View>
//       <Text>UpdateProfile</Text>
//     </View>
//   )
// }

// export default UpdateProfile


// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';

// const UpdateProfile = () => {
//   const [isConnected, setIsConnected] = useState(true);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {isConnected ? (
//         <Text>Your main app content goes here</Text>
//       ) : (
//         <View>
//           <Text>No network found</Text>
//           <Text>Please check your internet connection</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default UpdateProfile;
