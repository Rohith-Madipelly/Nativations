import { Button, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../../../../Components/UI/Inputs/CustomTextInput'

import {
  Entypo,
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons, FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Formik } from 'formik';
import { TestingPage } from '../../../../Fomik/schema/TestingPage';
import { UserLoginApi } from '../../../../utils/API_Calls';
import ASO from '../../../../utils/AsyncStorage_Calls'
import { ToasterSender } from '../../../../utils/Toaster';
// import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';


const TestScreen = () => {
  // const [values, setValues] = useState()
  const [show, setShow] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)

  // const navigation = useNavigation();

  // const dispatch = useDispatch();


  function onchange(text, field) {
    setValues({ ...values, [field]: text });
  }

  const submitHandler = async (user) => {

    seterrorFormAPI()
    try {
      const { email, password } = user;
      setSpinnerbool(true)
      const res = await UserLoginApi(email, password)
      console.log(res)
      if (res) {
        const Message = res.data.message
        const token = res.data.token

        ASO.setTokenJWT("Token", JSON.stringify(res.data.token), function (res, status) {
          if (status) {
            // console.warn(status, " status>>>>>.")
            ToasterSender({ Message: `${Message}` })
            // dispatch(setToken(token));
          }
        })

        // seterrorFormAPI()
        setTimeout(() => {
          // setLoading(false);
          setSpinnerbool(false)
        }, 50);


      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
        }
        else if (error.response.status === 401) {
          seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 404) {
          seterrorFormAPI({ EmailForm: `${error.response.data.message}` })
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

      //   ToasterSender("Error in Setting up the Request.")
      //   ToasterSender({ Message: error.response.data.message })
      // ToasterSender({ Message: error })

      setSpinnerbool(false)

      if (error) {

        // message = error.message;
        // seterrorFormAPI(message)
        // "Email or Password does not match !"
      }
    }
    finally {
      setSpinnerbool(false)
    }
  }


  return (
    <View style={{ marginTop: 200 }}>

      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        //   behavior={Platform.OS === "ios" ? 100:0}
        keyboardVerticalOffset={1000}
      //   style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


          <ScrollView >
            <Formik
              // enableReinitialize
              validateOnMount={true}
              initialValues={{ email: "madipellyrohith@gmail.com", password: "Rohith@7" }}

              // onSubmit={submitHandler}
              onSubmit={submitHandler}
              validator={() => ({})}
              validationSchema={TestingPage}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                values,
                touched,
                errors,
                isValid,
              }) => (
                <>


                  <View style={{ padding: 10, marginTop: 20, backgroundColor: '#f8f8f8', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                   
                   
                    <CustomTextInput
                      placeholder={'Enter First Name '}
                      label={'First Name'}
                      name='first'
                      value={values.email}
                      leftIcon={<FontAwesome name="user" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                      // bgColor="#B1B1B0"

                      onChangeText={(e)=>{handleChange("email")(e);seterrorFormAPI();}}
                      onBlur={handleBlur("email")}

                      // validate={() => {
                      //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                      //     else { setError({ ...error, first: null }) }
                      // }}

                      validate={handleBlur("email")}

                      outlined

                      borderColor={`${(errors.email && touched.email) || (errorFormAPI && errorFormAPI.EmailForm) ? "red" : "#ccc"}`}

                      errorMessage={`${(errors.email && touched.email) ? `${errors.email}` : (errorFormAPI && errorFormAPI.EmailForm) ? `${errorFormAPI.EmailForm}` : ``}`}

                    // errorColor='magenta'
                    />

<CustomTextInput
                      placeholder={'Enter Password'}
                      label={'Password'}
                      name='Password'
                      value={values.password}
                      leftIcon={<Entypo name="lock" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                     

                      onChangeText={(e)=>{handleChange("password")(e);seterrorFormAPI();}}
                      onBlur={handleBlur("password")}

                      rightIcon={<Pressable onPress={() => setShow({ ...setShow, password: !show?.password })}>

                        {!show?.password ? (
                          <Entypo name="eye" size={20} color="black" />) : (
                          <Entypo name="eye-with-line" size={20} color="black" />)
                        }

                      </Pressable>
                      }

                      secure={!show?.password} //default to true
                      validate={handleBlur("password")}
                      borderColor={`${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.PasswordForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.password && touched.password) ? `${errors.password}` : (errorFormAPI && errorFormAPI.PasswordForm) ? `${errorFormAPI.PasswordForm}` : ``}`}
                      // errorColor='magenta'
                      outlined
                    />
                      <CustomTextInput
                      placeholder={'Enter Password'}
                      label={'Password'}
                      name='Password'
                      value={values.password}
                      leftIcon={<Entypo name="lock" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                     

                      onChangeText={(e)=>{handleChange("password")(e);seterrorFormAPI();}}
                      onBlur={handleBlur("password")}

                      rightIcon={<Pressable onPress={() => setShow({ ...setShow, password: !show?.password })}>

                        {!show?.password ? (
                          <Entypo name="eye" size={20} color="black" />) : (
                          <Entypo name="eye-with-line" size={20} color="black" />)
                        }

                      </Pressable>
                      }

                      secure={!show?.password} //default to true
                      validate={handleBlur("password")}
                      borderColor={`${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.PasswordForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.password && touched.password) ? `${errors.password}` : (errorFormAPI && errorFormAPI.PasswordForm) ? `${errorFormAPI.PasswordForm}` : ``}`}
                      // errorColor='magenta'
                      outlined
                    />
  <CustomTextInput
                      placeholder={'Enter Password'}
                      label={'Password'}
                      name='Password'
                      value={values.password}
                      leftIcon={<Entypo name="lock" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                     

                      onChangeText={(e)=>{handleChange("password")(e);seterrorFormAPI();}}
                      onBlur={handleBlur("password")}

                      rightIcon={<Pressable onPress={() => setShow({ ...setShow, password: !show?.password })}>

                        {!show?.password ? (
                          <Entypo name="eye" size={20} color="black" />) : (
                          <Entypo name="eye-with-line" size={20} color="black" />)
                        }

                      </Pressable>
                      }

                      secure={!show?.password} //default to true
                      validate={handleBlur("password")}
                      borderColor={`${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.PasswordForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.password && touched.password) ? `${errors.password}` : (errorFormAPI && errorFormAPI.PasswordForm) ? `${errorFormAPI.PasswordForm}` : ``}`}
                      // errorColor='magenta'
                      outlined
                    />


                    <CustomTextInput
                      placeholder={'Enter Password'}
                      label={'Password'}
                      name='Password'
                      value={values.password}
                      leftIcon={<Entypo name="lock" size={20} color="black" />}
                      // bgColor='#e1f3f8'
                     

                      onChangeText={(e)=>{handleChange("password")(e);seterrorFormAPI();}}
                      onBlur={handleBlur("password")}

                      rightIcon={<Pressable onPress={() => setShow({ ...setShow, password: !show?.password })}>

                        {!show?.password ? (
                          <Entypo name="eye" size={20} color="black" />) : (
                          <Entypo name="eye-with-line" size={20} color="black" />)
                        }

                      </Pressable>
                      }

                      secure={!show?.password} //default to true
                      validate={handleBlur("password")}
                      borderColor={`${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.PasswordForm) ? "red" : "#ccc"}`}
                      errorMessage={`${(errors.password && touched.password) ? `${errors.password}` : (errorFormAPI && errorFormAPI.PasswordForm) ? `${errorFormAPI.PasswordForm}` : ``}`}
                      // errorColor='magenta'
                      outlined
                    />


                    <Button
                      activeOpacity={0.5}
                      //@ts-ignore
                      onPress={handleSubmit}
                      // disabled={!isValid}
                      btnStyle={{ marginTop: 25 }}
                      // bgColor={`${!isValid ? theme.colors.secondaryBlue : ""}`}
                      title='Login'
                      bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}
                    >
                      {/* Login */}
                    </Button>
                    

                  </View>
                </>
              )}


            </Formik>
          </ScrollView>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}

export default TestScreen

const styles = StyleSheet.create({})