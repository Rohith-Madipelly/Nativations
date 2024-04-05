import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert } from 'react-native';
import AuthComponent from './AuthComponent';
import CustomButton from '../../Components/UI/Button/ButtonC1';
import CustomTextInput from '../../Components/UI/Inputs/CustomTextInput';

import {
    Entypo,
    Feather,
    AntDesign,
    MaterialIcons,
    Ionicons, FontAwesome,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useState } from 'react';
import { Formik } from "formik";
import { loginSchema } from "../../Fomik/schema/signIn.js";

import { UserForgotOTPApi, UserLoginApi } from "../../utils/API_Calls";
import Spinner from 'react-native-loading-spinner-overlay';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions/loginAction.jsx'

import ASO from '../../utils/AsyncStorage_Calls.js'
import { ToasterSender } from '../../utils/Toaster.js';
import { OTPSchema } from '../../Fomik/schema/OTPSchema.js';
import { Email } from '../../Fomik/schema/Email.js';


export default function OtpSender() {

    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerBool, setSpinnerbool] = useState(false)

    const navigation = useNavigation();

    const dispatch = useDispatch();


    function onchange(text, field) {
        setValues({ ...values, [field]: text });
    }

    const submitHandler = async (user) => {
    
        seterrorFormAPI()
        try {
            const { email} = user;

            setSpinnerbool(true)
            const res = await UserForgotOTPApi(email)
            console.log(res)
            if (res) {
                {navigation.navigate('OtpVerify', { email: email });}

                setTimeout(() => {
                    setSpinnerbool(false)
                }, 50);


            }

        } catch (error) {
            // {navigation.navigate('OtpVerify', { email: 'madipellyrohith@gmail.com' });}
            if (error.response) {
                console.log(error.data)
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.message)
                    console.log("Error With 400.")
                }
                else if (error.response.status === 401) {
                    console.log("Error With 400.")

                    seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 404) {
                    console.log("Error With 400.")

                    seterrorFormAPI({ EmailForm: `${error.response.data.message}` })
                }

                else if (error.response.status === 500) {
                    Alert.alert(error.response.data.message)
                    console.log("Internal Server Error", error.message)
                }
                else if (error.response.status === 429) {
                    Alert.alert(error.response.data.message)
                    console.log("Error With 429.",error)

                    // {navigation.navigate('OtpVerify', { email: "madipellyrohith@gmail.com" });}
                }
                else {
                    // {navigation.navigate('OtpVerify')}
                    Alert.alert(error.response.data.message,"code")
                    console.log("An error occurred response.")
                }
            }
            else if (error.request) {
                if (error.request.status === 0) {
                    // console.log("error in request ",error.request.status)
                    Alert.alert("No Network Found","Please Check your Internet Connection")
                  }
               
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
        <>
            <Spinner
                visible={spinnerBool}
                color={"#5F2404"}
                animation={'fade'}
            />

            <AuthComponent NameUnderLogo={"Satya Sadhna"} titleUnder={""} screenName={"Get OTP"}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                // behavior={Platform.OS === "ios" ? 100:0}
                // keyboardVerticalOffset={1000}
                // style={styles.container}
                >
                    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}

                        <ScrollView style={{ height: 400, }}>
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Formik
                                    // enableReinitialize
                                    validateOnMount={true}
                                    initialValues={{ email: ""}}
                                    onSubmit={submitHandler}
                                    validator={() => ({})}
                                    validationSchema={Email}
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




                                            <CustomTextInput
                                            boxWidth={'80%'}
                                                placeholder={'Enter Your Email'}
                                                label={'Enter Your Email'}
                                                name='Email'
                                                value={values.email}
                                                leftIcon={<FontAwesome name="user" size={20} color="black" />}
                                                // bgColor='#e1f3f8'
                                                // bgColor="#B1B1B0"

                                                onChangeText={(e) => { handleChange("email")(e); seterrorFormAPI(); }}
                                                onBlur={handleBlur("email")}
                                                validate={handleBlur("email")}

                                                outlined

                                                borderColor={`${(errors.email && touched.email) || (errorFormAPI && errorFormAPI.EmailForm) ? "red" : "#ccc"}`}

                                                errorMessage={`${(errors.email && touched.email) ? `${errors.email}` : (errorFormAPI && errorFormAPI.EmailForm) ? `${errorFormAPI.EmailForm}` : ``}`}

                                            // errorColor='magenta'
                                            />


                                            <CustomButton
                                                onPress={handleSubmit}
                                                leftIcon={<MaterialIcons style={styles.icon} name={'password'} size={18} color={'white'} />}
                                                bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}

                                                style={{ marginTop: 50 }}>
                                                Get OPT
                                            </CustomButton>

                                            {/* <View style={{}}>
                                                <TouchableOpacity onPress={() => {navigation.navigate("ForgotPassword") }}>
                                                    <Text style={[styles.paragraphy, { color: 'black', marginTop: 20, fontWeight: '400' }]}>Forgot password?</Text>
                                                </TouchableOpacity>
                                            </View>


                                            <View style={{ width: '65%', textAlign: 'center', marginTop: 40 }}>
                                                <TouchableOpacity onPress={() => { navigation.navigate("Register")}}>
                                                    <Text style={[styles.paragraphy, { textAlign: 'center', color: '#7C7C7C', fontWeight: '400' }]}>Don’t have an account?
                                                        <Text style={[styles.underline, { color: '#006AFF' }]}> Sign Up</Text>
                                                    </Text>

                                                </TouchableOpacity>
                                            </View> */}


                                        </>

                                    )}


                                </Formik>
                            </View>
                        </ScrollView>
                    {/* </TouchableWithoutFeedback> */}
                </KeyboardAvoidingView>
            </AuthComponent>


        </>
    );

}

const styles = StyleSheet.create({


    paragraphy: {
        // fontFamily: 'Jost',
        fontSize: 14,
        fontWeight: '300',
    },
    underline: {
        textDecorationLine: 'underline',
    }

})