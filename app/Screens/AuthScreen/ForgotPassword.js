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


import { ForgotApiPassRest, UserLoginApi } from "../../utils/API_Calls";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { RestPasswordschema } from '../../Fomik/schema/RestPassword';
import { ToasterMessage } from '../../utils/ToasterMessage.js';


export default function Login({ route }) {

    const { params } = route;
    const email = params?.email || '';
    console.log("><>", email)

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
            const { ConfirmPassword } = user;
            setSpinnerbool(true)
            const res = await ForgotApiPassRest(email, ConfirmPassword)
            console.log(res)
            if (res) {
                const Message = res.data.message
                ToasterMessage("success", `Success`, `${Message}`)
                navigation.navigate('Login')
                setTimeout(() => {
                    setSpinnerbool(false)
                }, 50);


            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("Error With 400.")
                    Alert.alert(error.response.data.message)
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
                    console.log("An error occurred response.",error.response)
                }
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
                if (error.request.status === 0) {
                    // console.log("error in request ",error.request.status)
                    Alert.alert("No Network Found", "Please Check your Internet Connection")
                }

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

            <AuthComponent NameUnderLogo={"Satya Sadhna"} titleUnder={""} screenName={"FORGOT PASSWORD"}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                // behavior={Platform.OS === "ios" ? 100:0}
                // keyboardVerticalOffset={1000}
                // style={styles.container}
                >
                    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}

                    <ScrollView style={{ height: 400, }}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <Formik
                                // enableReinitialize
                                validateOnMount={true}
                                initialValues={{ NewPassword: "", ConfirmPassword: "" }}
                                // initialValues={{ NewPassword: "Rohith@123", ConfirmPassword: "Rohith@123" }}
                                onSubmit={submitHandler}
                                validator={() => ({})}
                                validationSchema={RestPasswordschema}
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
                                            placeholder={'Enter new password'}
                                            label={'New password'}
                                            name='Password'
                                            value={values.NewPassword}
                                            leftIcon={<Entypo name="lock" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            
                                            onChangeText={(e) => {
                                                const trimmedValue = e.trim();
                                                
                                                handleChange("NewPassword")(trimmedValue); seterrorFormAPI(); }}
                                            onBlur={handleBlur("NewPassword")}
                                            rightIcon={<Pressable onPress={() => setShow({ ...setShow, NewPassword: !show?.NewPassword })}>
                                                {!show?.NewPassword ? (
                                                    <Entypo name="eye-with-line" size={20} color="black" />) : (
                                                    <Entypo name="eye" size={20} color="black" />)
                                                }

                                            </Pressable>
                                            }

                                            secure={!show?.NewPassword} //default to true
                                            validate={handleBlur("NewPassword")}
                                            borderColor={`${(errors.NewPassword && touched.NewPassword) || (errorFormAPI && errorFormAPI.NewPasswordForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.NewPassword && touched.NewPassword) ? `${errors.NewPassword}` : (errorFormAPI && errorFormAPI.NewPasswordForm) ? `${errorFormAPI.NewPasswordForm}` : ``}`}
                                            // errorColor='magenta'
                                            outlined
                                        />



                                        <CustomTextInput
                                            boxWidth={'80%'}
                                            placeholder={'Enter confirm password'}
                                            label={'Confirm password'}
                                            name='Confirm Password'
                                            value={values.ConfirmPassword}
                                            leftIcon={<Entypo name="lock" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            onChangeText={(e) => {
                                                const trimmedValue = e.trim();
                                                handleChange("ConfirmPassword")(trimmedValue); seterrorFormAPI(); }}
                                            onBlur={handleBlur("ConfirmPassword")}
                                            rightIcon={<Pressable onPress={() => setShow({ ...setShow, ConfirmPassword: !show?.ConfirmPassword })}>
                                                {!show?.ConfirmPassword ? (
                                                    <Entypo name="eye-with-line" size={20} color="black" />) : (
                                                    <Entypo name="eye" size={20} color="black" />)
                                                }

                                            </Pressable>
                                            }

                                            secure={!show?.ConfirmPassword} //default to true
                                            validate={handleBlur("ConfirmPassword")}
                                            borderColor={`${(errors.ConfirmPassword && touched.ConfirmPassword) || (errorFormAPI && errorFormAPI.ConfirmPassword) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.ConfirmPassword && touched.ConfirmPassword) ? `${errors.ConfirmPassword}` : (errorFormAPI && errorFormAPI.PasswordForm) ? `${errorFormAPI.PasswordForm}` : ``}`}
                                            // errorColor='magenta'
                                            outlined
                                        />


                                        <CustomButton
                                            onPress={handleSubmit}
                                            bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}

                                            style={{ marginTop: 50 }}>
                                            Verify
                                        </CustomButton>



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