import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import AuthComponent from '../AuthComponent.js';
import CustomButton from '../../../Components/UI/Button/ButtonC1.js';
import CustomTextInput from '../../../Components/UI/Inputs/CustomTextInput.js';
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
import { loginSchema } from "../../../Fomik/schema/signIn.js";

import { UserLoginApi } from "../../../utils/API_Calls.js";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../redux/actions/loginAction.jsx'

import ASO from '../../../utils/AsyncStorage_Calls.js'
import { ToasterSender } from '../../../utils/Toaster.js';


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

            {/* <AuthComponent NameUnderLogo={"Satya Sadhna"} titleUnder={""} screenName={"LOGIN"}> */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                //   behavior={Platform.OS === "ios" ? 100:0}
                // keyboardVerticalOffset={1000}
                //   style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView style={{ height: 400 }}>

                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


                                <Formik
                                    // enableReinitialize
                                    validateOnMount={true}
                                    initialValues={{ email: "madipellyrohith@gmail.com", password: "Rohith@7" }}

                                    // onSubmit={submitHandler}
                                    onSubmit={submitHandler}
                                    validator={() => ({})}
                                    validationSchema={loginSchema}
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
                                                placeholder={'Enter First Name '}
                                                label={'First Name'}
                                                name='first'
                                                value={values.email}
                                                leftIcon={<FontAwesome name="user" size={20} color="black" />}
                                                // bgColor='#e1f3f8'
                                                // bgColor="#B1B1B0"

                                                onChangeText={(e) => { handleChange("email")(e); seterrorFormAPI(); }}
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


                                            <CustomButton
                                                onPress={handleSubmit}
                                                leftIcon={<Entypo style={styles.icon} name={'login'} size={18} color={'white'} />}
                                                bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}

                                                style={{ marginTop: 50 }}>
                                                Login
                                            </CustomButton>

                                            <View style={{}}>
                                                <TouchableOpacity onPress={() => { console.log("Login") }}>
                                                    <Text style={[styles.paragraphy, { color: 'black', marginTop: 20, fontWeight: '400' }]}>Forgot password?</Text>
                                                </TouchableOpacity>
                                            </View>


                                            <View style={{ width: '65%', textAlign: 'center', marginTop: 40 }}>
                                                <TouchableOpacity onPress={() => { console.log("Login") }}>
                                                    <Text style={[styles.paragraphy, { textAlign: 'center', color: '#7C7C7C', fontWeight: '400' }]}>Don’t have an account?
                                                        <Text style={[styles.underline, { color: '#006AFF' }]}> Sign Up</Text>
                                                    </Text>

                                                </TouchableOpacity>
                                            </View>


                                        </>

                                    )}


                                </Formik>
                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            {/* </AuthComponent> */}


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