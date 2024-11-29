import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert } from 'react-native';
import AuthComponent from './AuthComponent.js';
import CustomButton from '../../Components/UI/Button/ButtonC1.js';
import CustomTextInput from '../../Components/UI/Inputs/CustomTextInput.js';
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

import { UserRegisterApi } from "../../utils/API_Calls.js";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions/loginAction.jsx'

import ASO from '../../utils/AsyncStorage_Calls.js'
import { ToasterSender } from '../../utils/Toasters/Toaster.js';
import { signupSchema } from '../../Fomik/schema/signUpSchema.js';


export default function Register() {

    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerBool, setSpinnerbool] = useState(false)
    const [SignUp, setSignUp] = useState(false)

    const navigation = useNavigation();

    const dispatch = useDispatch();


    function onchange(text, field) {
        setValues({ ...values, [field]: text });
    }

    const submitHandler = async (user) => {

        seterrorFormAPI()
        try {
            const { Name, email, Mobile_Number, password } = user;
            setSpinnerbool(true)
            const res = await UserRegisterApi(Name, email, Mobile_Number, password)
            // console.log(res)
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

                else if (error.response.status === 402) {
                    Alert.alert(error.response.data.message)
                    console.log("sxh", error.response.status)
                }
                else if (error.response.status === 403) {
                    seterrorFormAPI({ NameForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 404) {
                    Alert.alert(error.response.data.message)
                    seterrorFormAPI({ EmailForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 408) {
                    // console.log("sxh", error.response.status)
                    seterrorFormAPI({ Mobile_NumberForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 409) {
                    console.log("sdd",error.response.data.message,"fc Code >>",error.response.status)
                    // console.log("sxh", error.response.status)
                    seterrorFormAPI({ EmailForm: `${error.response.data.message}` })
                }

                else if (error.response.status === 500) {
                    Alert.alert(error.response.data.message)
                    console.log("Internal Server Error", error.message)
                }
                else {
                    Alert.alert(error.response.data.message)
                    console.log("An error occurred response.", error, "<><", error.response.status, "ddd", error.response.data.message)
                }
            }
            else if (error.request) {
                Alert.alert(error.request.data.message)

                console.log("No Response Received From the Server.")
            }
            else {
                Alert.alert(error.data.message)

                console.log("Error in Setting up the Request.")
            }



            setSpinnerbool(false)

            if (error) {

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

            <AuthComponent NameUnderLogo={"Satya Sadhna"} titleUnder={""} screenName={"SIGN UP"}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >

                    <TouchableWithoutFeedback>
                        <ScrollView style={{ height: 500, }}>
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                <Formik
                                    // enableReinitialize
                                    validateOnMount={true}
                                    initialValues={{ Name: "", Mobile_Number: "", email: "", password: "" }}
                                    // initialValues={{ Name: "Rohith", Mobile_Number: "9951072005", email: "madipellyrohith143@gmail.com", password: "Rohith@123" }}
                                    onSubmit={submitHandler}
                                    validator={() => ({})}
                                    validationSchema={signupSchema}
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
                                                placeholder={'Enter Your Name'}
                                                label={'Name'}
                                                name='first'
                                                value={values.Name}
                                                leftIcon={<FontAwesome name="user" size={20} color="black" />}
                                                // bgColor='#e1f3f8'
                                                // bgColor="#B1B1B0"
                                                onChangeText={(e) => { handleChange("Name")(e); seterrorFormAPI(); }}
                                                onBlur={handleBlur("Name")}
                                                validate={handleBlur("Name")}
                                                outlined
                                                borderColor={`${(errors.Name && touched.Name) || (errorFormAPI && errorFormAPI.NameForm) ? "red" : "#ccc"}`}
                                                errorMessage={`${(errors.Name && touched.Name) ? `${errors.Name}` : (errorFormAPI && errorFormAPI.NameForm) ? `${errorFormAPI.NameForm}` : ``}`}
                                            // errorColor='magenta'
                                            />

                                            <CustomTextInput
                                                boxWidth={'80%'}
                                                placeholder={'Mobile Number'}
                                                label={'Mobile Number'}
                                                name='Mobile_Number'
                                                value={values.Mobile_Number}
                                                leftIcon={<FontAwesome name="phone" size={20} color="black" />}
                                                onChangeText={(e) => {
                                                    // Remove any non-numeric characters
                                                    const numericValue = e.replace(/[^0-9]/g, '');
                                                    // Update the state with the numeric value
                                                    handleChange("Mobile_Number")(numericValue);
                                                    seterrorFormAPI();
                                                }}
                                                onBlur={handleBlur("Mobile_Number")}
                                                validate={handleBlur("Mobile_Number")}
                                                outlined
                                                borderColor={`${(errors.Mobile_Number && touched.Mobile_Number) || (errorFormAPI && errorFormAPI.Mobile_NumberForm) ? "red" : "#ccc"}`}
                                                errorMessage={`${(errors.Mobile_Number && touched.Mobile_Number) ? `${errors.Mobile_Number}` : (errorFormAPI && errorFormAPI.Mobile_NumberForm) ? `${errorFormAPI.Mobile_NumberForm}` : ``}`}
                                            // errorColor='magenta'
                                            />

                                            <CustomTextInput
                                                boxWidth={'80%'}
                                                placeholder={'Email '}
                                                label={'Email'}
                                                name='Email'
                                                value={values.email}
                                                leftIcon={<FontAwesome name="user" size={20} color="black" />}
                                                onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("email")(eToLowerCaseText); seterrorFormAPI(); }}

                                                onBlur={handleBlur("email")}
                                                validate={handleBlur("email")}
                                                outlined
                                                borderColor={`${(errors.email && touched.email) || (errorFormAPI && errorFormAPI.EmailForm) ? "red" : "#ccc"}`}
                                                errorMessage={`${(errors.email && touched.email) ? `${errors.email}` : (errorFormAPI && errorFormAPI.EmailForm) ? `${errorFormAPI.EmailForm}` : ``}`}
                                            // errorColor='magenta'
                                            />

                                            <CustomTextInput
                                                boxWidth={'80%'}
                                                placeholder={'Enter Password'}
                                                label={'Password'}
                                                name='Password'
                                                value={values.password}
                                                leftIcon={<Entypo name="lock" size={20} color="black" />}
                                                // bgColor='#e1f3f8'
                                               


                                                onChangeText={(e) => {
                                                    
                                                    const trimmedValue = e.trim();
                                                    handleChange("password")(trimmedValue); seterrorFormAPI(); setShow({ ...setShow, password: false }); }}
                                                onBlur={handleBlur("password")}

                                                rightIcon={<Pressable onPress={() => setShow({ ...setShow, password: !show?.password })}>

                                                    {!show?.password ? (
                                                        <Entypo name="eye-with-line" size={20} color="black" />) : (
                                                        <Entypo name="eye" size={20} color="black" />)
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
                                                // leftIcon={<Entypo style={styles.icon} name={'login'} size={18} color={'white'} />}
                                                bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}

                                                style={{ marginTop: 50 }}>
                                                Sign Up
                                            </CustomButton>


                                            {/* <CustomButton
                                            onPress={()=>{ToasterSender({ Message: `Test` })}}
                                            // leftIcon={<Entypo style={styles.icon} name={'login'} size={18} color={'white'} />}
                                            bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}

                                            style={{ marginTop: 50 }}>
                                            Test ToasterSender
                                        </CustomButton> */}

                                            <View style={{ width: '65%', textAlign: 'center', marginTop: 20 }}>
                                                <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                                                    <Text style={[styles.paragraphy, { textAlign: 'center', color: 'white', fontWeight: '400' }]}>Already have an account?
                                                        <Text style={[styles.underline, { color: '#006AFF' }]}> Login</Text>
                                                    </Text>

                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ height: 150 }}>

                                            </View>


                                        </>

                                    )}


                                </Formik>
                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
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