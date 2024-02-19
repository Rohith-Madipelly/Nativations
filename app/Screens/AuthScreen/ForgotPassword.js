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

import { UserLoginApi } from "../../utils/API_Calls";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions/loginAction.jsx'

import ASO from '../../utils/AsyncStorage_Calls.js'
import { ToasterSender } from '../../utils/Toaster.js';
import { RestPasswordschema } from '../../Fomik/schema/RestPassword.js';


export default function Login() {

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
                        dispatch(setToken(token));
                    }
                })

                setTimeout(() => {

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
                                initialValues={{ NewPassword:"", ConfirmPassword: "" }}
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
                                            placeholder={'Enter Password'}
                                            label={'Password'}
                                            name='Password'
                                            value={values.password}
                                            leftIcon={<Entypo name="lock" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            onChangeText={(e) => { handleChange("password")(e); seterrorFormAPI(); }}
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
                                        boxWidth={'80%'}
                                            placeholder={'Enter Confirm Password'}
                                            label={'Confirm Password'}
                                            name='Confirm Password'
                                            value={values.ConfirmPassword}
                                            leftIcon={<Entypo name="lock" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            onChangeText={(e) => { handleChange("ConfirmPassword")(e); seterrorFormAPI(); }}
                                            onBlur={handleBlur("ConfirmPassword")}
                                            rightIcon={<Pressable onPress={() => setShow({ ...setShow, ConfirmPassword: !show?.ConfirmPassword })}>
                                                {!show?.ConfirmPassword ? (
                                                    <Entypo name="eye" size={20} color="black" />) : (
                                                    <Entypo name="eye-with-line" size={20} color="black" />)
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