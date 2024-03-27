import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert } from 'react-native';
import AuthComponent from '../../AuthScreen/AuthComponent.js';
import CustomButton from '../../../Components/UI/Button/ButtonC1';
import CustomTextInput from '../../../Components/UI/Inputs/CustomTextInput';

import {
    Entypo,
    Feather,
    AntDesign,
    MaterialIcons,
    Ionicons, FontAwesome,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useState } from 'react';
import { Formik} from "formik";
import { loginSchema } from "../../../Fomik/schema/signIn.js";

import { ChangePasswordAPI, UserLoginApi } from "../../../utils/API_Calls";
import Spinner from 'react-native-loading-spinner-overlay';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../../redux/actions/loginAction.jsx'

import ASO from '../../../utils/AsyncStorage_Calls.js'
import { ToasterSender } from '../../../utils/Toaster.js';
import { ChangePassword } from '../../../Fomik/schema/ChangePassword.js';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Login() {

    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerBool, setSpinnerbool] = useState(false)
    let tokenn = useSelector((state) => state.token);
    const navigation = useNavigation();
    
    const dispatch = useDispatch();

    const LogOutHandle = async () => {
        setSpinnerbool(true)
        try {
          await AsyncStorage.removeItem('AdsReel$:' + 'Token');
          // setSpinnerbool(false)
          setTimeout(() => {
            dispatch(setToken(null));
          }, 2000)
        }
        catch (e) {
          console.log("error", e)
        }
    
    
    
      }

    function onchange(text, field) {
        setValues({ ...values, [field]: text });
    }


    try {
        if (tokenn != null) {
            tokenn = tokenn.replaceAll('"', '');
        }
    }
    catch (err) {
        console.log("Error in token quotes", err)
    }

    const submitHandler = async (user) => {

        seterrorFormAPI()
        try {
            const { old_password, New_Password, } = user;
            setSpinnerbool(true)
            const res = await ChangePasswordAPI(old_password, New_Password, tokenn)
            if (res) {
                console.log(res.data.message)


                Alert.alert(res.data.message)
                navigation.navigate('Profile')
            //   LogOutHandle()
            }

        } catch (error) {
            console.log(error)
            Alert.alert(error.response.data.message)
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

            <AuthComponent NameUnderLogo={"Satya Sadhna"} titleUnder={""} screenName={"Change Password"}>
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
                                initialValues={{ old_password: "", New_Password: "" }}
                                onSubmit={submitHandler}
                                validator={() => ({})}
                                validationSchema={ChangePassword}
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
                                            placeholder={'old Password'}
                                            label={'old Password'}
                                            name='Password'
                                            value={values.old_password}
                                            leftIcon={<Entypo name="lock" size={20} color="black" />}
                                            // bgColor='#e1f3f8'


                                            onChangeText={(e) => { handleChange("old_password")(e); seterrorFormAPI(); }}
                                            onBlur={handleBlur("old_password")}

                                            rightIcon={<Pressable onPress={() => setShow({ ...setShow, old_password: !show?.old_password })}>

                                                {!show?.old_password ? (
                                                    <Entypo name="eye-with-line" size={20} color="black" />) : (
                                                        <Entypo name="eye" size={20} color="black" />)
                                                }

                                            </Pressable>
                                            }

                                            secure={!show?.old_password} //default to true
                                            validate={handleBlur("password")}
                                            borderColor={`${(errors.old_password && touched.old_password) || (errorFormAPI && errorFormAPI.old_passwordForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.old_password && touched.old_password) ? `${errors.old_password}` : (errorFormAPI && errorFormAPI.old_passwordForm) ? `${errorFormAPI.old_passwordForm}` : ``}`}
                                            // errorColor='magenta'
                                            outlined
                                        />





                                        <CustomTextInput
                                            boxWidth={'80%'}
                                            placeholder={'Enter New  Password'}
                                            label={'New Password'}
                                            name='Password'
                                            value={values.New_Password}
                                            leftIcon={<Entypo name="lock" size={20} color="black" />}
                                            // bgColor='#e1f3f8'


                                            onChangeText={(e) => { handleChange("New_Password")(e); seterrorFormAPI(); }}
                                            onBlur={handleBlur("New_Password")}

                                            rightIcon={<Pressable onPress={() => setShow({ ...setShow, New_Password: !show?.New_Password })}>

                                                {!show?.New_Password ? (
                                                      <Entypo name="eye-with-line" size={20} color="black" />) : (
                                                        <Entypo name="eye" size={20} color="black" />)
                                                }

                                            </Pressable>
                                            }

                                            secure={!show?.New_Password} //default to true
                                            validate={handleBlur("New_Password")}
                                            borderColor={`${(errors.New_Password && touched.New_Password) || (errorFormAPI && errorFormAPI.New_PasswordForm) ? "red" : "#ccc"}`}
                                            errorMessage={`${(errors.New_Password && touched.New_Password) ? `${errors.New_Password}` : (errorFormAPI && errorFormAPI.New_PasswordForm) ? `${errorFormAPI.New_PasswordForm}` : ``}`}
                                            // errorColor='magenta'
                                            outlined
                                        />


                                        <CustomButton
                                            onPress={handleSubmit}
                                            // leftIcon={<Entypo style={styles.icon} name={'Save'} size={18} color={'white'} />}
                                            bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}

                                            style={{ marginTop: 50 }}>
                                            Save
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