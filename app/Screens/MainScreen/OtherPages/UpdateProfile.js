// import { View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Platform } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import { UserGetProfileDetails, UserUpdatedProfileDetails, UserUpdatedProfilePic } from '../../../utils/API_Calls'
// import Spinner from 'react-native-loading-spinner-overlay';
// import Feather from "react-native-vector-icons/Feather"
// import { StatusBar } from 'expo-status-bar';
// import * as ImagePicker from 'expo-image-picker';

// import { Formik } from "formik";
// import { theme, typographyStyles } from "../../../Contants";
// // import { ErrorMessage, Button } from "../../../screenComponents/Auth";
// import { useNavigation } from '@react-navigation/native';

// import { ProfileUpdatedSchema } from '../../../Fomik/schema/ProfileUpdatedSchema';
// import { ToasterSender } from '../../../utils/Toaster';


// const Profile = () => {
//   const [spinnerBool, setSpinnerbool] = useState(false)
//   const [profile, setProfile] = useState("")
//   const [UserName, setUserName] = useState("")

//   const [FirstName, setFirstName] = useState("")
//   const [ErrorFirstName, setErrorFirstName] = useState(false)

//   const [LastName, setLastName] = useState("")
//   const [ErrorLastName, setErrorLastName] = useState(false)

//   const [UserEmail, setUserEmail] = useState("")
//   const [UserPhone, setUserPhone] = useState("")
//   const [UserDOB, setDOB] = useState("")

//   const [age, setAge] = useState("")
//   const [Errorage, setErrorAge] = useState("")

//   const [gender, setGender] = useState("")
//   const [Wallet, setWallet] = useState("")
//   const [profilepic, setProfilepic] = useState(null)
//   const [editToggle, setEditToggle] = useState(false)

//   const [errorEmail, setErrorEmail] = useState(true)

//   const navigation = useNavigation();
//   const [error, setError] = useState("")
//   const loginSelectorToken = useSelector((state) => state.token);




//   var tokenn = loginSelectorToken;
//   tokenn = tokenn.replaceAll('"', '');

//   const handleEditToggle = () => {
//     setEditToggle(!editToggle);
//   }
//   const [image, setImage] = useState(null);


//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     // console.log(result.assets[0].uri);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       ProfileImageUpload()
//     }
//   }


//   const ProfileImageUpload = async () => {
//     setSpinnerbool(true)

//     try {
//       console.log(image,tokenn)
//       const res = await UserUpdatedProfilePic(image, tokenn)
    
//       if (res) {
//         // console.log(res)
//       }

//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 400) {
//           console.log("Error With 400.",error.response.data.message)
//         }
//         else if (error.response.status === 401) {
//           console.log("Password is wrong", error.message)
//           // setError("Password is wrong")
//         }
//         else if (error.response.status === 500) {
//           console.log("Internal Server Error", error.message)
//         }
//         else {
//           console.log("An error occurred response.")
//         }
//       }
//       else if (error.request) {
//         console.log("No Response Received From the Server.")
//       }
//       else {
//         console.log("Error in Setting up the Request.")
//       }

//     }
//     finally {
//       setSpinnerbool(false)

//     }
//   }

//   const userData = async () => {
//     setSpinnerbool(true)
//     try {
//       const res = await UserGetProfileDetails(tokenn)


//       if (res) {
//         // setUserName([res.data.firstname" " res.data.lastname])
//         setFirstName(res.data.firstname)
//         setLastName(res.data.lastname)
//         setUserEmail(res.data.email)
//         setUserPhone(res.data.phone_number)
//         setDOB(res.data.Date_of_birth)
//         setWallet(res.data.wallet)
//         setAge(res.data.age)
//         setGender(res.data.gender)
//         setSpinnerbool(false)

//         var datadsd = res.data.profile_pic
//         setProfilepic(datadsd)
//         if (datadsd == "") {
//         }
//         else {
//           setProfilepic(`https://ads-reels-pictures.s3.ap-south-1.amazonaws.com/${datadsd}`)
//         }
//         // console.log(profilepic)
//       }
//       else {

//       }
//     } catch (error) {
//       setTimeout(() => {
//         console.log("Error in fetching", error)
//       }, 1000);
//     }
//     finally {
//       setSpinnerbool(false)
//     }
//   }

//   const profilepicUpdated = (image) => {
//     console.log(image)

//   }

//   const submitHandler = async (UpdatedUser) => {
//     if (!FirstName) {
//       setErrorFirstName("First Name is a Required Field")
//       return false;

//     }
//     if (LastName === "") {
//       setErrorLastName("Last Name is a Required Field")
//     }
//     if (!age) {
//       setErrorAge("Age is a Required Field")
//     }

//     try {
//       setErrorFirstName(false)
//       setErrorLastName(false)




//       setSpinnerbool(true)
//       const res = await UserUpdatedProfileDetails(FirstName, LastName, age, tokenn)
//       if (res) {
//         const Message = res.data.message
//         const token = res.data.token
//         ToasterSender({ Message: `${Message}` })

//         setTimeout(() => {
//           setSpinnerbool(false)
//           setEditToggle(false)
//         }, 50);


//       }

//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 400) {
//           console.log("Error With 400.")
//         }
//         else if (error.response.status === 401) {
//           console.log("Password is wrong", error.message)
//           setError("Password is wrong")
//         }
//         else if (error.response.status === 500) {
//           console.log("Internal Server Error", error.message)
//         }
//         else {
//           console.log("An error occurred response.")
//         }
//       }
//       else if (error.request) {
//         console.log("No Response Received From the Server.")
//       }
//       else {
//         console.log("Error in Setting up the Request.")
//       }

//       ToasterSender("Error in Setting up the Request.")
//       ToasterSender({ Message: error.response.data.message })
//       // ToasterSender({ Message: error })

//       setSpinnerbool(false)

//       let message = "Failed to create user.";

//       if (error) {
//         console.log(error.response.data.message)
//         // message = error.message;
//         // setError(message)

//       }
//     }
//     finally {

//       setSpinnerbool(false)
//     }
//   }

//   //Profile API
//   useEffect(() => {
//     userData()
//   }, []);

//   const windoWidth = Dimensions.get('window').width
//   const windowHeight = Dimensions.get('window').height

//   return (
//     <View style={{
//       marginTop: 0,
//       width: windoWidth,
//       height: windowHeight,
//     }}>
//       <Spinner
//         visible={spinnerBool}
//         color={"#5F2404"}
//         animation={'fade'}
//       />
//       <View style={{
//         position: 'absolute',
//         top: 5,
//         left: 5,
//         right: 5,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         zIndex: 1,
//         padding: 10,
//       }}>
//         {/* <Text style={{
//           fontSize: 20, fontWeight: 'bold',
//           // color: 'white' 
//         }}> */}
//         <TouchableOpacity onPress={() => { navigation.goBack(); }}>
//           <Feather name="arrow-left" style={{
//             fontSize: 25,
//             marginLeft: 2,
//             color: 'white'
//           }} />
//         </TouchableOpacity>
//         {/* </Text> */}

//         <TouchableOpacity onPress={() => { pickImage() }}>
//           <Feather name="camera" style={{
//             fontSize: 20,
//             marginLeft: 20,
//             // color: 'white'
//           }} />
//         </TouchableOpacity>


//       </View>



//       <View style={{
//         position: 'absolute',
//         bottom: 5,
//         left: 0,
//         right: 0,
//         zIndex: 1,
//         padding: 10,
//         paddingLeft: 25,
//         paddingTop: 20,
//         backgroundColor: 'white',
//         height: 500,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//       }}>

//         <View style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',

//           position: 'absolute',
//           right: 20,
//           top: -15,


//           // backgroundColor:'black'
//         }}>


//           <Text></Text>


//           <View style={{ backgroundColor: 'white', padding: 5, paddingHorizontal: 7, borderRadius: 20, }}>

//             <Text style={{ fontSize: 15, }}>
//               <Text style={{ fontSize: 16, paddingTop: -10 }}>Edit </Text>
//               <Feather name="edit" style={{
//                 fontSize: 20,
//                 marginLeft: 40,
//                 marginTop: -40
//                 // color: 'white'
//               }}
//                 onPress={handleEditToggle}

//               />
//             </Text>
//           </View>

//         </View>


//         {spinnerBool ? "" : <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={styles.container}
//         >



//           {/* <StatusBar translucent={true} backgroundColor="transparent" /> */}
//           {/* <StatusBar style='auto'/> */}


//           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             <View>

//               {/* First Name */}
//               <Text style={{ marginBottom: 10 }}>{editToggle ? <Text>You can Updated Your Profile</Text> : <Text>You can View Your Profile</Text>}</Text>

//               <View style={styles.inputContainer}>
//                 <View
//                   style={[
//                     styles.input,
//                     { borderColor: `${(ErrorFirstName) ? "red" : "#ccc"}`, marginBottom: 0 },
//                     // {borderColor:'transparent'}
//                   ]}
//                 >

//                   <TextInput
//                     placeholderTextColor={"#444"}
//                     placeholder="First Name"
//                     // autoComplete="email"
//                     // keyboardType="email-address"
//                     // autoCapitalize="none"
//                     // onChangeText={handleChange("fName")}
//                     // onBlur={handleBlur("fName")}
//                     // value={values.fName}
//                     value={`${FirstName}`}
//                     onChangeText={(e) => { setFirstName(e) }}

//                     style={{ color: "black" }}
//                     editable={editToggle ? true : false}
//                   />
//                 </View>

//                 <View style={{ marginLeft: 10, marginTop: 0 }}>
//                   {/* {(ErrorFirstName) && (
//                     // <ErrorMessage>{ErrorFirstName}</ErrorMessage>
//                   )} */}
//                 </View>
//               </View>

//               {/* Last Name */}
//               <View style={styles.inputContainer}>
//                 <View
//                   style={[
//                     styles.input,
//                     { borderColor: `${(ErrorLastName) ? "red" : "#ccc"}` },
//                   ]}
//                 >
//                   <TextInput
//                     placeholderTextColor={"#444"}
//                     placeholder="Last Name"
//                     // autoComplete="email"
//                     // keyboardType="email-address"
//                     // autoCapitalize="none"
//                     // onChangeText={handleChange("lName")}
//                     // onBlur={handleBlur("lName")}
//                     // value={values.lName}
//                     onChangeText={(e) => { setLastName(e) }}
//                     // onBlur={(e)=>{setLastName(e)}}
//                     value={`${LastName}`}
//                     style={{ color: "black" }}
//                     editable={editToggle ? true : false}

//                   />
//                 </View>

//                 {/* <View style={{ marginLeft: 10 }}>
//                         {(errors.lName && touched.lName) && (
//                           <ErrorMessage>{errors.lName}</ErrorMessage>
//                         )}
//                       </View> */}
//               </View>



//               {/* Users Age */}
//               <View style={styles.inputContainer}>
//                 <View
//                   style={[
//                     styles.input,
//                     { borderColor: `${(Errorage) ? "red" : "#ccc"}` },
//                   ]}
//                 >
//                   <TextInput
//                     placeholderTextColor={"#444"}
//                     placeholder="Age"
//                     // autoComplete="email"
//                     keyboardType="number-pad"
//                     // autoCapitalize="none"
//                     onChangeText={(e) => { setAge(e) }}
//                     onBlur={(e) => { setAge(e) }}
//                     value={`${age}`}
//                     style={{ color: "black" }}
//                     editable={editToggle ? true : false}

//                   />
//                 </View>
//                 {/* <View style={{ marginLeft: 10 }}>
//                         {(errors.userAge && touched.userAge) && (
//                           <ErrorMessage>{errors.userAge}</ErrorMessage>
//                         )}
//                       </View> */}
//               </View>



//               {editToggle ?
//                 <Button
//                   activeOpacity={0.5}
//                   //@ts-ignore
//                   onPress={submitHandler}

//                   btnStyle={{ marginTop: 25 }}
//                 // bgColor={`${!isValid ? theme.colors.secondaryBlue : ""}`}
//                 // bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}
//                 >
//                   Updated Profile
//                 </Button>
//                 : ""}

//             </View>
//           </TouchableWithoutFeedback>


//         </KeyboardAvoidingView>}
//       </View>




//       {profilepic ? <TouchableOpacity onPress={() => { }}>
//         <View style={styles.outerCircle}>
//           <ImageBackground
//             style={styles.innerCircle}
//             // source={profilepic}
//             source={{
//               uri: profilepic,
//             }}
//             resizeMode="cover"
//           />
//         </View></TouchableOpacity> : <TouchableOpacity onPress={() => { }}><View style={styles.outerCircle}>
//           <ImageBackground
//             style={styles.innerCircle}
//             // source={require("../../../assets/utilsImages/profile2.jpg")}
//             source={{
//                 uri: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//               }}
//             // source={require("../../../../assets.jpg")}
//             resizeMode="cover"
//           >
//           </ImageBackground>
//         </View>
//       </TouchableOpacity>}


//     </View>
//   )
// }

// export default Profile

// const styles = StyleSheet.create({

//   inputContainer: {
//     marginBottom: 12,

//   },

//   input: {
//     width: 300,
//     // backgroundColor: "#121212",
//     borderWidth: 1,
//     borderStyle: "solid",
//     padding: 12,

//     borderRadius: 6,
//     marginBottom: 6,
//     color: "white",
//     height: 45,


//   },
//   TextUR: {
//     color: '#0A0240',
//     // fontFamily: 'Jost',
//     fontSize: 18,
//     fontStyle: 'normal',
//     fontWeight: '300',
//     marginTop: 20
//   },
//   TextGS: {
//     color: '#0A0240',
//     // fontFamily: 'Jost',
//     fontSize: 18,
//     fontStyle: 'normal',
//     fontWeight: '500',
//     marginTop: 20
//   },

//   Heading_1: {
//     color: '#0A0240',
//     // fontFamily: 'Jost',
//     fontSize: 28,
//     fontStyle: 'normal',
//     fontWeight: '400',
//   },
//   Heading_u2: {
//     color: '#0A0240',
//     // fontFamily: 'Jost',
//     fontSize: 18,
//     fontStyle: 'normal',
//     fontWeight: '600',
//     lineHeight: 24,
//   },
//   Heading_u3: {
//     color: '#0A0240',
//     // fontFamily: 'Jost',
//     fontSize: 16,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     lineHeight: 20,
//   },



//   outerCircle: {
//     width: 360,
//     height: 360,
//     overflow: 'hidden',
//   },
//   innerCircle: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });



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


import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const UpdateProfile = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isConnected ? (
        <Text>Your main app content goes here</Text>
      ) : (
        <View>
          <Text>No network found</Text>
          <Text>Please check your internet connection</Text>
        </View>
      )}
    </View>
  );
};

export default UpdateProfile;
