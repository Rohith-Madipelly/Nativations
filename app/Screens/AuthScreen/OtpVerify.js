import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
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

import { UserForgotOTPApi, UserLoginApi, UserVerifyOtp } from "../../utils/API_Calls";
import Spinner from 'react-native-loading-spinner-overlay';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions/loginAction.jsx'

import ASO from '../../utils/AsyncStorage_Calls.js'
import { ToasterSender } from '../../utils/Toasters/Toaster.js';
import { OTPSchema } from '../../Fomik/schema/OTPSchema.js';
import { Email } from '../../Fomik/schema/Email.js';


export default function OtpVerify({ route }) {



    const { params } = route;
    const email = params?.email || 'madipellyrohith@gmail.com';
    console.log(email)
    // email
    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerBool, setSpinnerbool] = useState(false)

    const navigation = useNavigation();

    const dispatch = useDispatch();


    function onchange(text, field) {
        setValues({ ...values, [field]: text });
    }
    console.log(">>>>>>>>>>>sdhbfkja 1")

    const submitHandler = async (user) => {
        console.log(">>>>>>>>>>>sdhbfkja wwww")
        seterrorFormAPI()
        try {
            const { otp } = user;
            console.log(otp)
            setSpinnerbool(true)
            const res = await UserVerifyOtp(email, otp)
            console.log(res)
            if (res) {
                const Message = res.data.message;

                { navigation.navigate('ForgotPassword', { email: email }); }
                setTimeout(() => {

                    setSpinnerbool(false)
                }, 50);


            }

        } catch (error) {
            // { navigation.navigate('ForgotPassword') }


            if (error.response) {
                if (error.response.status === 400) {
                    console.log("Error With 400.")
                }
                else if (error.response.status === 401) {
                    seterrorFormAPI({ otpForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 403) {
                    seterrorFormAPI({ otpForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 404) {
                    seterrorFormAPI({ otpForm: `${error.response.data.message}` })
                }

                else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                }
                else {
                    console.log("An error occurred response.", error.response.status)
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


    const ResendOtp = async () => {

        seterrorFormAPI()
        try {
          
            setSpinnerbool(true)
            const res = await UserForgotOTPApi(email)
            console.log(">>",res.data.message)
            if (res) {

                ToasterSender("success", `Success`, `${res.data.message}`)


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
                    console.log("Error With 401.")

                    seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 404) {
                    console.log("Error With 404.")

                    seterrorFormAPI({ EmailForm: `${error.response.data.message}` })
                }

                else if (error.response.status === 500) {
                    Alert.alert(error.response.data.message)
                    console.log("Internal Server Error", error.message)
                }
                else if (error.response.status === 429) {
                    Alert.alert(error.response.data.message)
                    console.log("Error With 429.", error)

                    // {navigation.navigate('OtpVerify', { email: "madipellyrohith@gmail.com" });}
                }
                else {
                    // {navigation.navigate('OtpVerify')}
                    Alert.alert(error.response.data.message, "code")
                    console.log("An error occurred response.")
                }
            }
            else if (error.request) {
                if (error.request.status === 0) {
                    // console.log("error in request ",error.request.status)
                    Alert.alert("No Network Found", "Please Check your Internet Connection")
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

            <AuthComponent NameUnderLogo={"Satya Sadhna"} titleUnder={""} screenName={"Enter your otp for email verification"}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}

                >


                    <ScrollView style={{ height: 400, }}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Formik
                                // enableReinitialize
                                validateOnMount={true}
                                initialValues={{ email: "", otp: "" }}
                                onSubmit={submitHandler}
                                validator={() => ({})}
                                validationSchema={OTPSchema}
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

                                        <View style={{ height: 40 }}>

                                        </View>

                                        <CustomTextInput
                                            placeholder={'Enter OTP'}
                                            boxWidth={'80%'}
                                            label={'Enter OTP'}
                                            name='OTP'
                                            value={values.otp}
                                            leftIcon={<Entypo name="lock" size={20} color="black" />}
                                            // bgColor='#e1f3f8'


                                            onChangeText={(e) => { handleChange("otp")(e); seterrorFormAPI(); }}
                                            onBlur={handleBlur("otp")}

                                            rightIcon={<Pressable onPress={() => setShow({ ...setShow, otp: !show?.otp })}>

                                                {!show?.otp ? (
                                                    <Entypo name="eye-with-line" size={20} color="black" />) : (
                                                    <Entypo name="eye" size={20} color="black" />)
                                                }

                                            </Pressable>
                                            }

                                            secure={!show?.otp} //default to true
                                            validate={handleBlur("otp")}
                                            borderColor={`${(errors.otp && touched.otp) || (errorFormAPI && errorFormAPI.otpForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.otp && touched.otp) ? `${errors.otp}` : (errorFormAPI && errorFormAPI.otpForm) ? `${errorFormAPI.otpForm}` : ``}`}
                                            // errorColor='magenta'
                                            outlined
                                        />



                                        <TouchableOpacity style={{ width: '80%', alignItems: 'flex-end', marginBottom: 10 }} onPress={() => { ResendOtp() }}>
                                            <Text>Resend otp</Text>
                                        </TouchableOpacity>




                                        <CustomButton
                                            onPress={handleSubmit}
                                            leftIcon={<MaterialIcons style={styles.icon} name={'password'} size={18} color={'white'} />}
                                            bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}

                                            style={{ marginTop: 50 }}>
                                            Verify OTP
                                        </CustomButton>



                                    </>

                                )}


                            </Formik>
                        </View>
                    </ScrollView>
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